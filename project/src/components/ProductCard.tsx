import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: any;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
      style={{
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        transform: 'perspective(1000px) rotateX(0deg)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(2deg) scale(1.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) scale(1)';
      }}
    >
      <div className="relative overflow-hidden h-48 bg-gradient-to-br from-green-50 to-white">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-4">
        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mb-2">
          {product.category}
        </span>
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-green-600">
            ₹{product.price}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm font-semibold">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
