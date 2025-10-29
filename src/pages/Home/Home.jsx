import React from 'react'
import HeroSection from './HeroSection'
import FeaturedProducts from '@components/ecommerce/FeaturedProducts/FeaturedProducts'
import CategoriesSection from '@components/ecommerce/Categories/CategoriesSection';
import Reviews from '@components/ecommerce/ReviewsSection/Reviews';
const featuredProducts = [
    {
        title: "Quantum Laptop X",
        desc: "Experience next-generation performance.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhOWrS3RVXkJyQy8KMj8NdvbfaDFISiYfv6MMsmslE0Ki56wvQuFqTA525kv-sfUqpBBKcMiMzHjL9ZHL6X5Lid7Z8rVU6290zosiIKZ5yB4B3HBaCBSlPK40LPVx1XL5WdPfTzvGXY-EDh1oon1rjsNbz9GE-pay_hO4EwU1s5mCKlx_GggSZmBJM1mCLtCTBqhW71vq9pOx_mMARGePAnHxu4xriO08TEv7qmwNuoPnaQWpdGp1BNMyavbXAPXj1TLdYPCdU7mHC",
    },
    {
        title: "Aura Buds Pro",
        desc: "Immersive sound with ANC for focus.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxgeTZCoHetloL8NBGYbLevZuBjnz5lSM_oRK3gYW5gpD-V_8kGFHEeyU7L-jxf29EGD_xg2c7T2b1tM5du7cQanKA1zKoryds81937Gtc5aBeiJnRohuCRjYND42yX_7MQ3OtYThJTz1-z5Q_Xc-FfoAHirIsglWldlBA59W8Wnw-t85-dMeT6vIa0VxZBEaH-7aEkz8zrA-7iyu2V6cl6vI_x6n_LMheGUA3iQmtr3khK2kEiC8lYt7TAqfh-q8qWV5fdi3Kd9dh",
    },
    {
        title: "Quantum Laptop X",
        desc: "Experience next-generation performance.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhOWrS3RVXkJyQy8KMj8NdvbfaDFISiYfv6MMsmslE0Ki56wvQuFqTA525kv-sfUqpBBKcMiMzHjL9ZHL6X5Lid7Z8rVU6290zosiIKZ5yB4B3HBaCBSlPK40LPVx1XL5WdPfTzvGXY-EDh1oon1rjsNbz9GE-pay_hO4EwU1s5mCKlx_GggSZmBJM1mCLtCTBqhW71vq9pOx_mMARGePAnHxu4xriO08TEv7qmwNuoPnaQWpdGp1BNMyavbXAPXj1TLdYPCdU7mHC",
    },
    {
        title: "Aura Buds Pro",
        desc: "Immersive sound with ANC for focus.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxgeTZCoHetloL8NBGYbLevZuBjnz5lSM_oRK3gYW5gpD-V_8kGFHEeyU7L-jxf29EGD_xg2c7T2b1tM5du7cQanKA1zKoryds81937Gtc5aBeiJnRohuCRjYND42yX_7MQ3OtYThJTz1-z5Q_Xc-FfoAHirIsglWldlBA59W8Wnw-t85-dMeT6vIa0VxZBEaH-7aEkz8zrA-7iyu2V6cl6vI_x6n_LMheGUA3iQmtr3khK2kEiC8lYt7TAqfh-q8qWV5fdi3Kd9dh",
    },
    {
        title: "Quantum Laptop X",
        desc: "Experience next-generation performance.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhOWrS3RVXkJyQy8KMj8NdvbfaDFISiYfv6MMsmslE0Ki56wvQuFqTA525kv-sfUqpBBKcMiMzHjL9ZHL6X5Lid7Z8rVU6290zosiIKZ5yB4B3HBaCBSlPK40LPVx1XL5WdPfTzvGXY-EDh1oon1rjsNbz9GE-pay_hO4EwU1s5mCKlx_GggSZmBJM1mCLtCTBqhW71vq9pOx_mMARGePAnHxu4xriO08TEv7qmwNuoPnaQWpdGp1BNMyavbXAPXj1TLdYPCdU7mHC",
    },
    {
        title: "Aura Buds Pro",
        desc: "Immersive sound with ANC for focus.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxgeTZCoHetloL8NBGYbLevZuBjnz5lSM_oRK3gYW5gpD-V_8kGFHEeyU7L-jxf29EGD_xg2c7T2b1tM5du7cQanKA1zKoryds81937Gtc5aBeiJnRohuCRjYND42yX_7MQ3OtYThJTz1-z5Q_Xc-FfoAHirIsglWldlBA59W8Wnw-t85-dMeT6vIa0VxZBEaH-7aEkz8zrA-7iyu2V6cl6vI_x6n_LMheGUA3iQmtr3khK2kEiC8lYt7TAqfh-q8qWV5fdi3Kd9dh",
    },
];
export default function Home() {
    return <>
        <HeroSection />
        <FeaturedProducts title="Featured Products" products={featuredProducts} />
        <CategoriesSection />
        <Reviews />
    </>
}
