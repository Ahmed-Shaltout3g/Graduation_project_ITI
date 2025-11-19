import axios from "axios";
import * as jwtDecode from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL + "/products/";

export const productService = {
  getAll: async () => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error) {
      console.error("Error fetching all products:", error);
      return [];
    }
  },

  getMyProducts: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return [];

      const decoded = jwtDecode.jwtDecode(token);
      const userId = decoded.user_id;

      console.log(decoded.user_id);

      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { seller: userId },
      };

      const response = await axios.get(API_URL, config);
      console.log(response.data.results);

      return response.data.results;
    } catch (error) {
      console.error("Error fetching user products:", error);
      return [];
    }
  },
  
  

  // ✅ Create new product
  create: async (data) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer  ${token}` } };
      const response = await axios.post(API_URL, data, config);
      console.log("Product created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error.response?.data || error.message);
      throw error;
    }
  },

  // ✅ Update product
  update: async (id, data) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer  ${token}` } };
      const response = await axios.put(`${API_URL}${id}/`, data, config);
      console.log("Product updated:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },

  // ✅ Delete product
  delete: async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer  ${token}` } };
      await axios.delete(`${API_URL}${id}/`, config);
      console.log(`Product with id ${id} deleted successfully.`);
      return id;
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },
};
