import React, { useState, useEffect } from "react";
import { Button, Spinner, Container } from "react-bootstrap";
import { FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";
import styles from "./MyAds.module.css";
import ProductForm from "../../components/common/forms/ProductForm/ProductForm";
import { useProduct } from "../../hooks/useProducts";

export default function MyAds() {
    const { loading, error, getMyProducts, removeProduct } = useProduct();
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [myProducts, setMyProducts] = useState([]);

    const fetchProducts = async () => {
        const products = await getMyProducts();
        console.log(products);

        setMyProducts(products?.payload || []);
    };

    useEffect(() => {
        fetchProducts();
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
            if (success) fetchProducts();
        }
    };

    const handleFormClose = () => setShowForm(false);
    const handleFormSuccess = () => {
        setShowForm(false);
        fetchProducts();
    };

    return (
        <Container className="py-5 position-relative text-white">
            <header className="d-flex justify-content-between align-items-center mb-4">
                <h2 className={styles.title}>My Ads Dashboard</h2>
                <Button className={styles.addButton} onClick={handleAdd}>
                    <FaPlusCircle className="me-2" /> Add New Product
                </Button>
            </header>

            {loading ? (
                <div className={styles.center}>
                    <Spinner animation="border" variant="info" />
                </div>
            ) : error ? (
                <p className="text-danger text-center">{error}</p>
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
                            {myProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className={styles.empty}>
                                        No products found.
                                    </td>
                                </tr>
                            ) : (
                                myProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.title}</td>
                                        <td>{product.category?.name || ""}</td>
                                        <td>${product.price}</td>
                                        <td>{product.is_active ? "Active" : "Draft"}</td>
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

            {showForm && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <ProductForm
                            product={editingProduct}
                            onClose={handleFormClose}
                            onSuccess={handleFormSuccess}
                        />
                    </div>
                </div>
            )}
        </Container>
    );
}
