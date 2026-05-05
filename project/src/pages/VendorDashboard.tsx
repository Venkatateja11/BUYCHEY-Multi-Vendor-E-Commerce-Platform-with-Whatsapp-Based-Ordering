import { useState, useEffect } from 'react';
import { useVendor } from '../context/VendorContext';
import { api } from '../utils/api';
import { Package, CheckCircle, Clock, Plus, CreditCard as Edit, Trash2 } from 'lucide-react';
import { ProductFormModal } from '../components/ProductFormModal';

interface VendorDashboardProps {
  onLogout: () => void;
  onViewOrders: () => void;
}

export function VendorDashboard({ onLogout, onViewOrders }: VendorDashboardProps) {
  const { vendor } = useVendor();
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [vendorQrCode, setVendorQrCode] = useState('');
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    if (vendor) {
      loadData();
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=UPI://pay?pa=vendor${vendor.id}@upi`;
      setVendorQrCode(qrUrl);
    }
  }, [vendor]);

  const loadData = async () => {
    try {
      const [allProducts, vendorOrders] = await Promise.all([
        api.getProducts(),
        api.getVendorOrders(vendor!.id)
      ]);

      const myProducts = allProducts.products.filter((p: any) => p.vendor_id === vendor!.id);
      setProducts(myProducts);
      setOrders(Array.isArray(vendorOrders) ? vendorOrders : []);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };


  const handleDeleteProduct = async (productId: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await api.deleteProduct(productId);
        loadData();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleAddProduct = async (productData: any) => {
    try {
      await api.addProduct(productData);
      setShowAddProduct(false);
      loadData();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  const handleUpdateProduct = async (productData: any) => {
    try {
      await api.updateProduct(productData);
      setEditingProduct(null);
      loadData();
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const confirmedOrders = orders.filter(o => o.status === 'confirmed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Vendor Dashboard</h1>
              <p className="text-gray-600">Welcome, {vendor?.name}</p>
            </div>
            <button
              onClick={onLogout}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-6">
            <Package className="w-12 h-12 mb-4 opacity-80" />
            <div className="text-3xl font-bold mb-2">{products.length}</div>
            <div className="text-green-100">Total Products</div>
          </div>
          <div
            className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={onViewOrders}
          >
            <Clock className="w-12 h-12 mb-4 opacity-80" />
            <div className="text-3xl font-bold mb-2">{pendingOrders.length}</div>
            <div className="text-yellow-100">Pending Orders</div>
          </div>
          <div
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={onViewOrders}
          >
            <CheckCircle className="w-12 h-12 mb-4 opacity-80" />
            <div className="text-3xl font-bold mb-2">{confirmedOrders.length}</div>
            <div className="text-blue-100">Confirmed Orders</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('products')}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'products'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                My Products
              </button>
              <button
                onClick={onViewOrders}
                className="flex-1 px-6 py-4 font-semibold text-gray-600 hover:text-green-600 transition-colors"
              >
                Manage Orders
              </button>
            </div>
          </div>

          <div className="p-6">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Products</h2>
                <button
                  onClick={() => setShowAddProduct(true)}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Product</span>
                </button>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No products yet. Add your first product!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                      <p className="text-green-600 font-bold mb-3">₹{product.price}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm flex items-center justify-center space-x-1"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm flex items-center justify-center space-x-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ProductFormModal
        isOpen={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onSave={handleAddProduct}
        vendorId={vendor!.id}
        vendorQrCode={vendorQrCode}
      />

      <ProductFormModal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={handleUpdateProduct}
        product={editingProduct}
        vendorId={vendor!.id}
        vendorQrCode={vendorQrCode}
      />
    </div>
  );
}
