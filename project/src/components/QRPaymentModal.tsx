import { X, CheckCircle } from 'lucide-react';

interface QRPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeUrl: string;
  vendorName: string;
  amount: number;
  onConfirmPayment: () => void;
}

export function QRPaymentModal({
  isOpen,
  onClose,
  qrCodeUrl,
  vendorName,
  amount,
  onConfirmPayment
}: QRPaymentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-scale-in">
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-xl font-bold">Payment QR Code</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Scan to pay</p>
            <p className="text-xl font-bold text-gray-800">{vendorName}</p>
            <p className="text-3xl font-bold text-green-600 mt-2">₹{amount.toFixed(2)}</p>
          </div>

          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <img
                src={qrCodeUrl}
                alt="Payment QR Code"
                className="w-64 h-64 object-contain"
              />
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm text-gray-700 text-center">
              Scan this QR code with any UPI app to make payment
            </p>
          </div>

          <button
            onClick={onConfirmPayment}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>I have paid</span>
          </button>
        </div>
      </div>
    </div>
  );
}
