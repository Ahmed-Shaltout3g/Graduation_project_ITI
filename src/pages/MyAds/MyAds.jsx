import React, { useState, useEffect } from "react";
import { Button, Spinner, Container } from "react-bootstrap";
import { FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";
import styles from "./MyAds.module.css";
import ProductForm from "../../components/common/forms/ProductForm/ProductForm";
import { useProduct } from "../../hooks/useProducts";

export default function MyAds() {
    const { loading, error, getMyProducts, removeProduct, } = useProduct();
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [myProducts, setMyProducts] = useState([]);

    // ✅ جلب المنتجات
    const fetchMyProducts = async () => {
        const products = await getMyProducts();
        setMyProducts(products?.payload || products || []);
    };

    useEffect(() => {
        fetchMyProducts();
    }, []);

    const handleAdd = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            const success = await removeProduct(id);
            if (success) fetchMyProducts(); // ✅ تحديث بعد الحذف
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        fetchMyProducts(); // ✅ تحديث بعد الإضافة أو التعديل
    };

    const productList = myProducts || [];

    return (
        <div className={styles.dashboard}>
            <Container className="py-5 position-relative text-white">
                <header className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className={styles.title}>My Ads Dashboard</h2>
                    <Button className={styles.addButton} onClick={handleAdd}>
                        <FaPlusCircle className="me-2" /> Add New Product
                    </Button>
                </header>

                {/* Stats Cards */}
                <div className={styles.stats}>
                    <div className={styles.card}>
                        <h4>Total Ads</h4>
                        <p>{productList.length}</p>
                    </div>
                    <div className={styles.card}>
                        <h4>Active Ads</h4>
                        <p>{productList.filter((p) => p.is_active).length}</p>
                    </div>
                    <div className={styles.card}>
                        <h4>Drafts</h4>
                        <p>{productList.filter((p) => !p.is_active).length}</p>
                    </div>
                </div>

                {/* Table */}
                <div className={styles.tableContainer}>
                    {loading ? (
                        <div className={styles.center}>
                            <Spinner animation="border" variant="info" />
                        </div>
                    ) : error ? (
                        <p className="text-danger text-center">
                            Error loading products: {error}
                        </p>
                    ) : (
                        <div className={styles.responsiveTable}>
                            <table className={styles.customTable}>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productList.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className={styles.empty}>
                                                No products found.
                                            </td>
                                        </tr>
                                    ) : (
                                        productList.map((product) => (
                                            <tr key={product.id} className={styles.tableRow}>
                                                <td>{product.title}</td>
                                                <td>{product.category_name}</td>
                                                <td>${product.price}</td>
                                                <td>
                                                    <span
                                                        className={styles.statusDot}
                                                        style={{
                                                            backgroundColor: product.is_active
                                                                ? "#29E3DA"
                                                                : "#f87171",
                                                        }}
                                                    ></span>
                                                    {product.is_active ? "Active" : "Draft"}
                                                </td>
                                                <td>
                                                    <div className="d-flex gap-3">
                                                        <Button
                                                            variant="link"
                                                            className={styles.editBtn}
                                                            onClick={() => handleEdit(product)}
                                                        >
                                                            <FaEdit />
                                                        </Button>
                                                        <Button
                                                            variant="link"
                                                            className={styles.deleteBtn}
                                                            onClick={() => handleDelete(product.id)}
                                                        >
                                                            <FaTrash />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Modal Form */}
                {showForm && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <ProductForm
                                product={editingProduct}
                                onClose={handleFormClose}
                                onSuccess={handleFormSuccess} // ✅ استدعاء تحديث عند النجاح
                            />
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}
