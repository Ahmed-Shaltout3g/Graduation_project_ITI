import React from "react";
import styles from "../FeaturedProducts/FeaturedProducts.module.css";
import ButtonPrimary from "@components/common/ButtonPrimary/ButtonPrimary";

export default function ProductCard({ product }) {
    const { title, description, image, buttonText = "Overview", name } = product;

    return (
        <div className={`${styles.card} d-flex flex-column justify-content-between p-3`}>
            <div>
                <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${image})` }}
                ></div>
                <div className="mt-3">
                    <p className="text-white fw-bold">{title}{name}</p>
                    <p className="text-secondary small">{description}</p>
                </div>
            </div>
            <ButtonPrimary text={buttonText} />
        </div>
    );
}
