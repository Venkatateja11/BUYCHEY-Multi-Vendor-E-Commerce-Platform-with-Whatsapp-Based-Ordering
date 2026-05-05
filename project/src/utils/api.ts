const API_BASE_URL = "http://localhost:8000";

async function request(url: string, options?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${url}`, options);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export const api = {

  // PRODUCTS
  getProducts() {
    return request("/products");
  },

  getProductsByCategory(category: string) {
    return request(`/products/category/${category}`);
  },

  getProduct(id: number) {
    return request(`/product/${id}`);
  },

  // CATEGORIES
  getCategories() {
    return request("/categories");
  },

  // VENDOR LOGIN
  vendorLogin(username: string, password: string) {
    return request("/vendor/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });
  },

  // PRODUCT MANAGEMENT
  addProduct(product: any) {
    return request("/product/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });
  },

  updateProduct(productUpdate: any) {
    return request("/product/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productUpdate)
    });
  },

  deleteProduct(id: number) {
    return request(`/product/delete/${id}`, {
      method: "DELETE"
    });
  },

  // ORDERS
  createOrder(order: any) {
    return request("/order/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    });
  },

  getVendorOrders(vendorId: number) {
    return request(`/vendor/orders/${vendorId}`);
  },

  // UPDATE ORDER STATUS
  updateOrderStatus(orderId: string, status: string) {
    return request(`/order/status/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });
  }

};