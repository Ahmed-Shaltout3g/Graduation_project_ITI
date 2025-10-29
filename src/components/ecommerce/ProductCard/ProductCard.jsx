import React from "react";
import styles from "../FeaturedProducts/FeaturedProducts.module.css";
import ButtonPrimary from "@components/common/ButtonPrimary/ButtonPrimary";

export default function ProductCard({ product }) {
    const { title, desc, image, buttonText = "Overview" } = product;

    return (
        <div className={`${styles.card} d-flex flex-column justify-content-between p-3`}>
            <div>
                <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${image})` }}
                ></div>
                <div className="mt-3">
                    <p className="text-white fw-bold">{title}</p>
                    <p className="text-secondary small">{desc}</p>
                </div>
            </div>
            <ButtonPrimary text={buttonText} />
        </div>
    );
}
