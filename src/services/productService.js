
import axiosInstance from "./api.js";

const API_URL = "products/";


export const productService = {
  getAll: async () => {
    const res = await axiosInstance.get(API_URL);
    console.log(res.data.results);
    
    return res.data.results;
  },

  getMyProducts: async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}my_products/`);
      console.log(response.data);
      return response.data;
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
