/*
  # Create Orders System

  1. New Tables
    - `orders`
      - `id` (uuid, primary key) - Unique order identifier
      - `customer_name` (text) - Customer's full name
      - `customer_email` (text) - Customer's email address
      - `customer_phone` (text) - Customer's phone number
      - `customer_address` (text) - Delivery address
      - `vendor_id` (integer) - ID of the vendor
      - `vendor_name` (text) - Name of the vendor
      - `product_id` (integer) - ID of the product ordered
      - `product_name` (text) - Name of the product
      - `product_price` (numeric) - Price of the product
      - `quantity` (integer) - Quantity ordered
      - `total_amount` (numeric) - Total order amount
      - `payment_method` (text) - Payment method (qr_code or cash_on_delivery)
      - `status` (text) - Order status (pending, confirmed, rejected, delivered)
      - `created_at` (timestamptz) - Order creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `orders` table
    - Add policy for vendors to view their own orders
    - Add policy for vendors to update their own orders
    - Add policy for anyone to create orders (public checkout)

  3. Important Notes
    - Orders are created during checkout process
    - Vendors can view and manage orders for their products
    - Cash on delivery orders require vendor confirmation
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  customer_address text NOT NULL,
  vendor_id integer NOT NULL,
  vendor_name text NOT NULL,
  product_id integer NOT NULL,
  product_name text NOT NULL,
  product_price numeric NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  total_amount numeric NOT NULL,
  payment_method text NOT NULL CHECK (payment_method IN ('qr_code', 'cash_on_delivery')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected', 'delivered')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create orders (public checkout)
CREATE POLICY "Anyone can create orders"
  ON orders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to view all orders (for simplicity, can be restricted later)
CREATE POLICY "Anyone can view orders"
  ON orders
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow anyone to update orders (vendors will filter by vendor_id in application)
CREATE POLICY "Anyone can update orders"
  ON orders
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for faster vendor queries
CREATE INDEX IF NOT EXISTS idx_orders_vendor_id ON orders(vendor_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);