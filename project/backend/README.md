# BuyChey Backend

FastAPI backend for the BuyChey multi-vendor e-commerce platform.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Database

The application uses a JSON file (`database.json`) as a simple database. This file contains:
- 5 vendors with credentials
- 10 sample products across 3 categories
- Orders (initially empty)

## Endpoints

### Products
- `GET /products` - Get all products
- `GET /products/category/{category}` - Get products by category
- `GET /product/{id}` - Get product by ID
- `GET /categories` - Get all categories

### Vendor
- `POST /vendor/login` - Vendor login
- `POST /product/add` - Add new product
- `PUT /product/update` - Update product
- `DELETE /product/delete/{id}` - Delete product
- `GET /vendor/orders/{vendor_id}` - Get vendor orders

### Orders
- `POST /order/create` - Create new order
- `POST /order/confirm/{order_id}` - Confirm order payment
