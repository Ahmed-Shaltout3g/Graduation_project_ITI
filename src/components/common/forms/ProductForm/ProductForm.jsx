import React, { useEffect, useState } from "react";
import styles from "./ProductForm.module.css";
import { useForm } from "react-hook-form";
import { useCategories } from "../../../../hooks/useCategories";
import { useProduct } from "../../../../hooks/useProducts";

export default function ProductForm({ product, onClose, onSuccess }) {
    const { refetchMyProducts } = useProduct();

    const { categories, loading } = useCategories();
    const { addProduct, editProduct } = useProduct();
    const [preview, setPreview] = useState(product?.image || "");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            category: "",
            university: "",
            faculty: "",
            status: "",
            image: null,
            condition: "",
        },
    });

    // ✅ عند تعديل منتج، نحط القيم القديمة
    useEffect(() => {
        if (product) {
            setValue("title", product.title || "");
            setValue("description", product.description || "");
            setValue("price", product.price || 0);
            setValue("category", product.category?.id || "");
            setValue("university", product.university || "");
            setValue("faculty", product.faculty || "");
            setValue("status", product.status || "");
            setValue("condition", product.condition || "");
            if (product.image) setPreview(product.image);
        }
    }, [product, setValue]);

    // ✅ عند حفظ المنتج
    const onSubmit = async (data) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (key === "image" && value && typeof value !== "string") {
                formData.append("image", value[0]); // رفع الصورة
            } else {
                formData.append(key, value);
            }
        });

        try {
            if (product) {
                await editProduct(product.id, formData, true);
            } else {
                await addProduct(formData, true);
            }
            onClose(); // ✅ إغلاق الفورم
            refetchMyProducts(); // ✅ تحديث المنتجات في MyAds
            if (onSuccess) onSuccess(); // ✅ استدعاء التحديث في MyAds
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    // ✅ معاينة الصورة
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue("image", e.target.files);
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h3 className={styles.formTitle}>
                {product ? "Edit Product" : "Add New Product"}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                {/* Title */}
                <div className={styles.formGroup}>
                    <label>Title</label>
                    <input
                        type="text"
                        {...register("title", { required: "Title is required" })}
                        className={styles.input}
                    />
                    {errors.title && <p className={styles.error}>{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div className={styles.formGroup}>
                    <label>Description</label>
                    <textarea
                        rows="3"
                        {...register("description", { required: "Description is required" })}
                        className={styles.textarea}
                    ></textarea>
                    {errors.description && (
                        <p className={styles.error}>{errors.description.message}</p>
                    )}
                </div>

                {/* Price */}
                <div className={styles.formGroup}>
                    <label>Price</label>
                    <input
                        type="number"
                        {...register("price", {
                            required: "Price is required",
                            min: { value: 0, message: "Price must be positive" },
                        })}
                        className={styles.input}
                    />
                    {errors.price && <p className={styles.error}>{errors.price.message}</p>}
                </div>

                {/* Category */}
                <div className={styles.formGroup}>
                    <label>Category</label>
                    <select
                        {...register("category", { required: "Please select a category" })}
                        className={styles.select}
                    >
                        <option value="">Select Category</option>
                        {loading ? (
                            <option>Loading...</option>
                        ) : (
                            categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))
                        )}
                    </select>
                    {errors.category && (
                        <p className={styles.error}>{errors.category.message}</p>
                    )}
                </div>

                {/* Condition */}
                <div className={styles.formGroup}>
                    <label>Condition</label>
                    <select
                        {...register("condition", { required: "Please select condition" })}
                        className={styles.select}
                    >
                        <option value="">Select Condition</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                    </select>
                    {errors.condition && (
                        <p className={styles.error}>{errors.condition.message}</p>
                    )}
                </div>

                {/* University */}
                <div className={styles.formGroup}>
                    <label>University</label>
                    <input
                        type="text"
                        {...register("university", { required: "University is required" })}
                        className={styles.input}
                    />
                    {errors.university && (
                        <p className={styles.error}>{errors.university.message}</p>
                    )}
                </div>

                {/* Faculty */}
                <div className={styles.formGroup}>
                    <label>Faculty</label>
                    <input
                        type="text"
                        {...register("faculty", { required: "Faculty is required" })}
                        className={styles.input}
                    />
                    {errors.faculty && (
                        <p className={styles.error}>{errors.faculty.message}</p>
                    )}
                </div>

                {/* Status */}
                <div className={styles.formGroup}>
                    <label>Status</label>
                    <input
                        type="text"
                        {...register("status", { required: "Status is required" })}
                        className={styles.input}
                    />
                    {errors.status && (
                        <p className={styles.error}>{errors.status.message}</p>
                    )}
                </div>

                {/* Image Upload */}
                <div className={styles.formGroup}>
                    <label>Product Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={styles.input}
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className={styles.previewImage}
                        />
                    )}
                </div>

                {/* Buttons */}
                <div className={styles.actions}>
                    <button type="button" className={styles.cancelBtn} onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className={styles.saveBtn}>
                        {product ? "Update" : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
}
