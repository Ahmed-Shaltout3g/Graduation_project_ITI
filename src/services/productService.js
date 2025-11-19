import axiosInstance from "./api";
import { getUserIdFromToken } from "../utils/auth";

const API_URL = "/products/";
const userId = getUserIdFromToken();

export const productService = {
  getAll: async () => {
    const res = await axiosInstance.get(API_URL);
    console.log(res.data.results);
    
    return res.data.results;
  },

  getMyProducts: async () => {
    const res = await axiosInstance.get(API_URL, { params: { seller__id: userId } });
    return res.data.results;
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
