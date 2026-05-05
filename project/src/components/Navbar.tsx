import { ShoppingCart, Store, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useVendor } from '../context/VendorContext';

interface NavbarProps {
  onCartClick: () => void;
  onHomeClick: () => void;
  onVendorClick: () => void;
}

export function Navbar({ onCartClick, onHomeClick, onVendorClick }: NavbarProps) {
  const { cart } = useCart();
  const { vendor } = useVendor();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button onClick={onHomeClick} className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <Store className="w-8 h-8 text-white" />
            <div className="text-white">
              <div className="text-xl font-bold">BuyChey</div>
              <div className="text-xs opacity-90">by SparkGenX</div>
            </div>
          </button>

          <div className="flex items-center space-x-6">
            {vendor && (
              <div className="text-white text-sm">
                Welcome, {vendor.name}
              </div>
            )}
            <button
              onClick={onVendorClick}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all hover:scale-105 text-white"
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">Vendor</span>
            </button>
            <button
              onClick={onCartClick}
              className="relative flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all hover:scale-105 text-white"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                  {itemCount}
                </span>
              )}
              <span className="hidden sm:inline">Cart</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
