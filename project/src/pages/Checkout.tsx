import { useState } from 'react';
import { ArrowLeft, CheckCircle, CreditCard, Banknote } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { QRPaymentModal } from '../components/QRPaymentModal';
import { api } from '../utils/api';

interface CheckoutProps {
  onBack: () => void;
}

export function Checkout({ onBack }: CheckoutProps) {
  const { cart, getTotal, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'qr_code' | 'cash_on_delivery'>('qr_code');
  const [showQR, setShowQR] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [vendorId, setVendorId] = useState(0);

  const handlePlaceOrder = async () => {
    if (!customerName || !customerEmail || !customerPhone || !customerAddress) {
      alert('Please fill all fields');
      return;
    }

    const vendorId = cart[0]?.vendor_id;
    setVendorId(vendorId);

    if (paymentMethod === 'qr_code') {
      setQrCodeUrl(cart[0]?.qr_code_url);
      setVendorName(`Vendor ${vendorId}`);
      setShowQR(true);
    } else {
      await handleConfirmPayment();
    }
  };

  const handleConfirmPayment = async () => {
    try {
      for (const item of cart) {
        const order = {
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          customer_address: customerAddress,
          vendor_id: item.vendor_id,
          vendor_name: `Vendor ${item.vendor_id}`,
          product_id: item.id,
          product_name: item.name,
          product_price: item.price,
          quantity: item.quantity,
          total_amount: item.price * item.quantity,
          payment_method: paymentMethod,
          status: 'pending'
        };

        await api.createOrder(order);
      }

      setShowQR(false);
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error placing order');
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Placed!</h2>
          <p className="text-gray-600 mb-8">
            {paymentMethod === 'cash_on_delivery'
              ? 'Your order is pending vendor confirmation. Payment will be collected on delivery.'
              : 'Your order is pending vendor confirmation. You will be notified once the vendor confirms your payment.'}
          </p>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-green-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Details</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your phone"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Delivery Address
              </label>
              <textarea
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={4}
                placeholder="Enter your address"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Payment Method
              </label>
              <div className="space-y-3">
                <label
                  className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'qr_code'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="qr_code"
                    checked={paymentMethod === 'qr_code'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'qr_code')}
                    className="w-5 h-5 text-green-600"
                  />
                  <CreditCard className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-semibold text-gray-800">QR Code Payment</div>
                    <div className="text-sm text-gray-500">Pay using UPI/QR Code</div>
                  </div>
                </label>

                <label
                  className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'cash_on_delivery'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cash_on_delivery"
                    checked={paymentMethod === 'cash_on_delivery'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'cash_on_delivery')}
                    className="w-5 h-5 text-green-600"
                  />
                  <Banknote className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-semibold text-gray-800">Cash on Delivery</div>
                    <div className="text-sm text-gray-500">Pay when you receive</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-600">
                  <span>{item.name} x {item.quantity}</span>
                  <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-700">Total:</span>
                <span className="text-3xl font-bold text-green-600">
                  ₹{getTotal().toFixed(2)}
                </span>
              </div>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {paymentMethod === 'cash_on_delivery' ? 'Place Order (COD)' : 'Proceed to Payment'}
            </button>
          </div>
        </div>
      </div>

      <QRPaymentModal
        isOpen={showQR}
        onClose={() => setShowQR(false)}
        qrCodeUrl={qrCodeUrl}
        vendorName={vendorName}
        amount={getTotal()}
        onConfirmPayment={handleConfirmPayment}
      />
    </div>
  );
}
