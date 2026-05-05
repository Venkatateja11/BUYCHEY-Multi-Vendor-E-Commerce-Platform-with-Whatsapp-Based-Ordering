import { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart, Store } from 'lucide-react';
import { api } from '../utils/api';
import { useCart } from '../context/CartContext';

interface ProductDetailProps {
  productId: number;
  onBack: () => void;
}

export function ProductDetail({ productId, onBack }: ProductDetailProps) {
  const [product, setProduct] = useState<any>(null);
  const [vendor, setVendor] = useState<any>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      const data = await api.getProduct(productId);
      setProduct(data.product);
    } catch (error) {
      console.error('Error loading product:', error);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-green-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </button>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-green-50 to-white">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="space-y-6">
              <div>
                <span className="inline-block px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-full mb-4">
                  {product.category}
                </span>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center space-x-3 text-gray-600 mb-4">
                  <Store className="w-5 h-5" />
                  <span>Sold by Vendor {product.vendor_id}</span>
                </div>
                <div className="text-4xl font-bold text-green-600 mb-6">
                  ₹{product.price}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
