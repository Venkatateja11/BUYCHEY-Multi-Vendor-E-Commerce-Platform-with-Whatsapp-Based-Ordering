import { useState, useEffect } from 'react';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import { api } from '../utils/api';

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  product_name: string;
  product_price: number;
  quantity: number;
  total_amount: number;
  payment_method: string;
  status: string;
  created_at: string;
}

interface VendorOrdersProps {
  vendorId: number;
  onBack: () => void;
}

export function VendorOrders({ vendorId, onBack }: VendorOrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'rejected' | 'delivered'>('all');

  useEffect(() => {
    loadOrders();
  }, [vendorId]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await api.getVendorOrders(vendorId);
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      await api.updateOrderStatus(orderId, status);
      await loadOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order status');
    }
  };

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter(order => order.status === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'delivered':
        return <Truck className="w-5 h-5 text-blue-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'delivered':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-green-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Orders Management</h1>
            <p className="text-gray-600">Manage and track all your orders</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap gap-3">
            {['all', 'pending', 'confirmed', 'rejected', 'delivered'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  filter === status
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status === 'all' && ` (${orders.length})`}
                {status !== 'all' && ` (${orders.filter(o => o.status === status).length})`}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders found</h3>
            <p className="text-gray-500">
              {filter === 'all' ? 'You have no orders yet.' : `No ${filter} orders.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {getStatusIcon(order.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.payment_method === 'cash_on_delivery'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.payment_method === 'cash_on_delivery' ? 'COD' : 'QR Payment'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2">{order.product_name}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                      <div>
                        <span className="font-semibold">Customer:</span> {order.customer_name}
                      </div>
                      <div>
                        <span className="font-semibold">Phone:</span> {order.customer_phone}
                      </div>
                      <div>
                        <span className="font-semibold">Email:</span> {order.customer_email}
                      </div>
                      <div>
                        <span className="font-semibold">Quantity:</span> {order.quantity}
                      </div>
                      <div className="md:col-span-2">
                        <span className="font-semibold">Address:</span> {order.customer_address}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-4">
                      <span className="text-2xl font-bold text-green-600">
                        ₹{order.total_amount.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {order.status === 'pending' && (
                    <div className="flex flex-col gap-3 md:min-w-[200px]">
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'confirmed')}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Confirm
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'rejected')}
                        className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-5 h-5" />
                        Reject
                      </button>
                    </div>
                  )}

                  {order.status === 'confirmed' && (
                    <div className="flex flex-col gap-3 md:min-w-[200px]">
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'delivered')}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                      >
                        <Truck className="w-5 h-5" />
                        Mark Delivered
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
