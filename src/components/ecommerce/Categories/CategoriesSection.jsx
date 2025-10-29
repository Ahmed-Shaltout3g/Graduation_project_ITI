import React from 'react'
import FeatureProducts from '../FeaturedProducts/FeaturedProducts';
import style from './CategoriesSection.module.css';
export default function CategoriesSection() {
    const categories = [
        { title: "Notebooks", desc: "Find all your stationery needs.", image: "/assets/categories/notebooks.jpg", buttonText: "Explore" },
        { title: "Electronics", desc: "Top gadgets for students.", image: "/assets/categories/electronics.jpg", buttonText: "Shop Now" },
        { title: "Backpacks", desc: "Stylish and durable backpacks.", image: "/assets/categories/backpacks.jpg", buttonText: "See More" },
    ];

    return <div className={`${style.categoriesSection}`}>
        <FeatureProducts title="Shop by Category" products={categories} bgColor='transparent' />
    </div>;
}
