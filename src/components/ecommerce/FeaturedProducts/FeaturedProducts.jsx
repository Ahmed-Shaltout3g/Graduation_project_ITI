// components/ecommerce/FeaturedProducts/FeaturedProducts.jsx
import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./FeaturedProducts.module.css";

export default function FeaturedProducts({ title = "Featured Products", products = [], bgColor = "#0a192f" }) {
    
    // Transform API products to match ProductCard expected format
    const transformedProducts = products.map(product => ({
        title: product.title,
        desc: product.description ? `${product.description.substring(0, 100)}...` : 'No description available',
        image: product.image,
        buttonText: "View Details",
        // Add any other fields your ProductCard expects
        ...product
    }));

    return (
        <section className={`${styles.section} py-5`} style={{ backgroundColor: bgColor }}>
            <div className="container">
                <h2 className="text-center text-white fw-bold mb-4">{title}</h2>

                <div className="row g-4 justify-content-center">
                    {transformedProducts.map((product, index) => (
                        <div key={product.id || index} className="col-12 col-sm-6 col-md-4 col-lg-4">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}