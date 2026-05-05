import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { VendorProvider, useVendor } from './context/VendorContext';
import { Navbar } from './components/Navbar';
import { Cart } from './components/Cart';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { VendorLogin } from './pages/VendorLogin';
import { VendorDashboard } from './pages/VendorDashboard';
import { VendorOrders } from './pages/VendorOrders';

type Page = 'home' | 'product' | 'checkout' | 'vendor-login' | 'vendor-dashboard' | 'vendor-orders';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { vendor, logout } = useVendor();

  useEffect(() => {
    const storedVendor = localStorage.getItem('vendor');
    if (storedVendor) {
      setCurrentPage('vendor-dashboard');
    }
  }, []);

  const handleProductClick = (id: number) => {
    setSelectedProductId(id);
    setCurrentPage('product');
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  const handleVendorClick = () => {
    if (vendor) {
      setCurrentPage('vendor-dashboard');
    } else {
      setCurrentPage('vendor-login');
    }
  };

  const handleVendorLogout = () => {
    logout();
    setCurrentPage('home');
  };

  return (
    <>
      <Navbar
        onCartClick={() => setIsCartOpen(true)}
        onHomeClick={() => setCurrentPage('home')}
        onVendorClick={handleVendorClick}
      />

      {currentPage === 'home' && <Home onProductClick={handleProductClick} />}

      {currentPage === 'product' && selectedProductId && (
        <ProductDetail
          productId={selectedProductId}
          onBack={() => setCurrentPage('home')}
        />
      )}

      {currentPage === 'checkout' && (
        <Checkout onBack={() => setCurrentPage('home')} />
      )}

      {currentPage === 'vendor-login' && (
        <VendorLogin
          onLoginSuccess={() => setCurrentPage('vendor-dashboard')}
          onBack={() => setCurrentPage('home')}
        />
      )}

      {currentPage === 'vendor-dashboard' && vendor && (
        <VendorDashboard
          onLogout={handleVendorLogout}
          onViewOrders={() => setCurrentPage('vendor-orders')}
        />
      )}

      {currentPage === 'vendor-orders' && vendor && (
        <VendorOrders
          vendorId={vendor.id}
          onBack={() => setCurrentPage('vendor-dashboard')}
        />
      )}

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">Powered by <span className="font-bold text-green-400">SparkGenX</span></p>
        </div>
      </footer>
    </>
  );
}

function App() {
  return (
    <VendorProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </VendorProvider>
  );
}

export default App;
