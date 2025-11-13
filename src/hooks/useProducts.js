// src/hooks/useProduct.js
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchMyProducts,
} from "../store/slices/productSlice";
import { useEffect } from "react";

export const useProduct = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  // ✅ تحميل المنتجات مرة واحدة عند تشغيل الصفحة
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // ✅ عمليات CRUD
   const getMyProducts = () => dispatch(fetchMyProducts());
  const addProduct = (data) => dispatch(createProduct(data));
  const editProduct = (id, data) => dispatch(updateProduct({ id, data }));
  const removeProduct = (id) => dispatch(deleteProduct(id));

  return {
    products,
    loading,
    error,
    addProduct,
    editProduct,
    removeProduct,
    getMyProducts,
    refetch: () => dispatch(fetchProducts()),
    refetchMyProducts: () => dispatch(fetchMyProducts()),

  };
};
