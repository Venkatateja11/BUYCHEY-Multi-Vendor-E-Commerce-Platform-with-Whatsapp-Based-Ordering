# BuyChey - Multi-Vendor E-Commerce Platform

**By SparkGenX**

A complete full-stack multi-vendor e-commerce marketplace where vendors can list products and customers can browse and order them with QR code-based payment system.

## Features

### Customer Features
- Browse all products across multiple vendors
- Filter products by categories (Snacks, Dresses, Shoes)
- View detailed product information
- Add products to cart
- Manage cart (add, remove, update quantities)
- Place orders with QR code payment
- No authentication required

### Vendor Features
- Secure vendor login
- Dashboard with order and product statistics
- Add, edit, and delete products
- View and manage orders
- Confirm customer payments
- Track pending and confirmed orders

## Tech Stack

### Frontend
- React (Vite)
- TypeScript
- TailwindCSS
- Lucide React (Icons)
- Modern responsive UI with 3D card designs

### Backend
- FastAPI (Python)
- JSON-based database (database.json)
- RESTful API

### Design
- Primary Colors: Green & White
- Modern, clean, minimal design
- 3D styled components with soft shadows
- Animated hover effects
- Fully responsive

## Project Structure

```
project/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── database.json        # JSON database
│   └── requirements.txt     # Python dependencies
├── src/
│   ├── components/          # React components
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── Cart.tsx
│   │   └── QRPaymentModal.tsx
│   ├── pages/               # Application pages
│   │   ├── Home.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Checkout.tsx
│   │   ├── VendorLogin.tsx
│   │   └── VendorDashboard.tsx
│   ├── context/             # React context
│   │   ├── CartContext.tsx
│   │   └── VendorContext.tsx
│   ├── utils/
│   │   └── api.ts           # API client
│   ├── App.tsx              # Main app component
│   └── index.css            # Global styles
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On Mac/Linux
source venv/bin/activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Start the FastAPI server:
```bash
python main.py
```

The backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to the project root directory:
```bash
cd ..
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Usage

### For Customers

1. Open the application in your browser
2. Browse products on the home page
3. Filter by categories (Snacks, Dresses, Shoes)
4. Click on a product to view details
5. Add products to cart
6. Click on the cart icon to view your cart
7. Proceed to checkout
8. Fill in your details (name, phone, address)
9. Click "Place Order"
10. Scan the QR code with your UPI app
11. Pay the vendor
12. Click "I have paid"
13. Wait for vendor confirmation

### For Vendors

1. Click on "Vendor" button in the navbar
2. Login with vendor credentials:
   - Username: `vendor1` to `vendor5`
   - Password: `password1` to `password5`
3. View your dashboard with statistics
4. Manage your products (Add, Edit, Delete)
5. View orders
6. Confirm payments when customers pay

## Demo Vendor Credentials

```
Vendor 1:
- Username: vendor1
- Password: password1

Vendor 2:
- Username: vendor2
- Password: password2

Vendor 3:
- Username: vendor3
- Password: password3

Vendor 4:
- Username: vendor4
- Password: password4

Vendor 5:
- Username: vendor5
- Password: password5
```

## API Endpoints

### Products
- `GET /products` - Get all products
- `GET /products/category/{category}` - Get products by category
- `GET /product/{id}` - Get product by ID

### Vendor
- `POST /vendor/login` - Vendor login
- `POST /product/add` - Add new product
- `PUT /product/update` - Update product
- `DELETE /product/delete/{id}` - Delete product
- `GET /vendor/orders/{vendor_id}` - Get vendor orders

### Orders
- `POST /order/create` - Create new order
- `POST /order/confirm/{order_id}` - Confirm order payment

### Categories
- `GET /categories` - Get all categories

## Features in Detail

### Payment System
- QR code-based payment
- External payment (UPI)
- Manual vendor confirmation
- Order status tracking (pending/confirmed)

### Product Categories
1. **Snacks**
   - Chips, Samosa, Mixture

2. **Dresses**
   - Kurti, T-Shirt, Lehenga, Summer Dress

3. **Shoes**
   - Sneakers, Formal Shoes, Sandals

## Design Highlights

- 3D product cards with hover animations
- Green gradient buttons and accents
- Smooth transitions and animations
- Modern marketplace layout
- Mobile-responsive design
- Clean and minimal interface
- Soft shadows and rounded components

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **FastAPI** - Backend framework
- **Lucide React** - Icon library

## Development

### Build for Production

```bash
npm run build
```

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

## Future Enhancements

- Real database integration (PostgreSQL/MongoDB)
- User authentication for customers
- Order tracking system
- Email notifications
- Product reviews and ratings
- Search functionality
- Wishlist feature
- Multiple payment gateways
- Admin panel
- Analytics dashboard

## License

Created by **SparkGenX**

## Support

For any issues or questions, please contact SparkGenX support.

---

**Powered by SparkGenX**
