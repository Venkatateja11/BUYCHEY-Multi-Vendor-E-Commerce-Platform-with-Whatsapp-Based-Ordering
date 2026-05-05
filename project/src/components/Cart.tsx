import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function Cart({ isOpen, onClose, onCheckout }: CartProps) {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl animate-slide-in">
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-500 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-6 h-6" />
            <h2 className="text-xl font-bold">Your Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <ShoppingBag className="w-20 h-20 mb-4 opacity-50" />
            <p className="text-lg">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="p-6 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-green-600 font-bold mb-2">₹{item.price}</p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-1 bg-white rounded font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-700">Total:</span>
                <span className="text-2xl font-bold text-green-600">
                  ₹{getTotal().toFixed(2)}
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
