# Quick Start Guide - BuyChey

Get BuyChey running in 5 minutes!

## Step 1: Start the Backend

Open a terminal and run:

```bash
cd backend
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies and start
pip install -r requirements.txt
python main.py
```

Backend will run on: `http://localhost:8000`

## Step 2: Start the Frontend

Open a NEW terminal (keep backend running) and run:

```bash
npm install
npm run dev
```

Frontend will run on: `http://localhost:5173`

## Step 3: Use the Application

### As a Customer:
1. Open `http://localhost:5173` in your browser
2. Browse products, add to cart
3. Checkout and see the QR payment modal

### As a Vendor:
1. Click "Vendor" button in navbar
2. Login with:
   - Username: `vendor1`
   - Password: `password1`
3. Manage products and orders from dashboard

## Demo Data Included

- 5 Vendors (vendor1-5, all passwords: password1-5)
- 10 Products across 3 categories
- Categories: Snacks, Dresses, Shoes

## Troubleshooting

**Backend won't start?**
- Make sure Python 3.8+ is installed
- Check if port 8000 is available

**Frontend won't start?**
- Make sure Node.js 16+ is installed
- Delete `node_modules` and run `npm install` again

**CORS errors?**
- Make sure backend is running on port 8000
- Frontend should be on port 5173

## Key Features to Test

1. Add products to cart from home page
2. Filter by category
3. View product details
4. Place an order and see QR code
5. Login as vendor and confirm orders
6. Add/Edit/Delete products as vendor

Enjoy BuyChey!
