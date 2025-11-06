import React from 'react'
import FeatureProducts from '../FeaturedProducts/FeaturedProducts';
import style from './CategoriesSection.module.css';
export default function CategoriesSection({ categories }) {


    return <div className={`${style.categoriesSection}`}>
        <FeatureProducts title="Shop by Category" products={categories} bgColor='transparent' />
    </div>;
}
