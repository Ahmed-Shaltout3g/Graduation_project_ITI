
import axios from "axios";
import * as jwtDecode from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL + "/products/";


export const productService = {
  getAll: async () => {
    const res = await axiosInstance.get(API_URL);
    console.log(res.data.results);
    
    return res.data.results;
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
  
  

  create: async (data) => {
    const res = await axiosInstance.post(API_URL, data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await axiosInstance.put(`${API_URL}${id}/`, data);
    console.log(res);
    
    return res.data;
  },

  delete: async (id) => {
    await axiosInstance.delete(`${API_URL}${id}/`);
    return id;
  },

  getProductDetails: async (id) => {
    const res = await axiosInstance.get(`${API_URL}${id}/`);
    return res.data;
  },
};
