import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./FeaturedProducts.module.css";

// export default function FeaturedProducts() {
//     const products = [
//         {
//             image:
//                 "https://lh3.googleusercontent.com/aida-public/AB6AXuBhOWrS3RVXkJyQy8KMj8NdvbfaDFISiYfv6MMsmslE0Ki56wvQuFqTA525kv-sfUqpBBKcMiMzHjL9ZHL6X5Lid7Z8rVU6290zosiIKZ5yB4B3HBaCBSlPK40LPVx1XL5WdPfTzvGXY-EDh1oon1rjsNbz9GE-pay_hO4EwU1s5mCKlx_GggSZmBJM1mCLtCTBqhW71vq9pOx_mMARGePAnHxu4xriO08TEv7qmwNuoPnaQWpdGp1BNMyavbXAPXj1TLdYPCdU7mHC",
//             title: "Quantum Laptop X",
//             description:
//                 "Experience next-generation performance with our flagship ultra-thin laptop.",
//         },
//         {
//             image:
//                 "https://lh3.googleusercontent.com/aida-public/AB6AXuDxgeTZCoHetloL8NBGYbLevZuBjnz5lSM_oRK3gYW5gpD-V_8kGFHEeyU7L-jxf29EGD_xg2c7T2b1tM5du7cQanKA1zKoryds81937Gtc5aBeiJnRohuCRjYND42yX_7MQ3OtYThJTz1-z5Q_Xc-FfoAHirIsglWldlBA59W8Wnw-t85-dMeT6vIa0VxZBEaH-7aEkz8zrA-7iyu2V6cl6vI_x6n_LMheGUA3iQmtr3khK2kEiC8lYt7TAqfh-q8qWV5fdi3Kd9dh",
//             title: "Aura Buds Pro",
//             description:
//                 "Immersive sound quality with active noise cancellation for ultimate focus.",
//         },
//         {
//             image:
//                 "https://lh3.googleusercontent.com/aida-public/AB6AXuC5PcqNgxqJPNujp_i4fwwOyR-NqDaZBEPNw1sSQSPjqhXgPHRaEHmbaj8JZSltoO3c7qs5-utE9V2sQOX4gwtOZDV7TFCxcqK_EQWhNBtDqjKJWCZ2RaO9qCdWGTYDJixJe-cApsbQCpemTDUWhHWR6OZPtADXhUi9_SfS0MH5utPJwOBbm4GJRbYRjzKh8qYUn8E5Sz-eNeQ6eYB0p5bRPKEZeeeD9GgRo--t0dAT0QIPV3D55rxJ8J77hfaaAf-SJSu7KAkVbbcd",
//             title: "Galactic Smartwatch",
//             description:
//                 "Stay connected on the go with our sleek and powerful smartwatch.",
//         },
//         {
//             image:
//                 "https://lh3.googleusercontent.com/aida-public/AB6AXuBhOWrS3RVXkJyQy8KMj8NdvbfaDFISiYfv6MMsmslE0Ki56wvQuFqTA525kv-sfUqpBBKcMiMzHjL9ZHL6X5Lid7Z8rVU6290zosiIKZ5yB4B3HBaCBSlPK40LPVx1XL5WdPfTzvGXY-EDh1oon1rjsNbz9GE-pay_hO4EwU1s5mCKlx_GggSZmBJM1mCLtCTBqhW71vq9pOx_mMARGePAnHxu4xriO08TEv7qmwNuoPnaQWpdGp1BNMyavbXAPXj1TLdYPCdU7mHC",
//             title: "Quantum Laptop X",
//             description:
//                 "Experience next-generation performance with our flagship ultra-thin laptop.",
//         },
//         {
//             image:
//                 "https://lh3.googleusercontent.com/aida-public/AB6AXuDxgeTZCoHetloL8NBGYbLevZuBjnz5lSM_oRK3gYW5gpD-V_8kGFHEeyU7L-jxf29EGD_xg2c7T2b1tM5du7cQanKA1zKoryds81937Gtc5aBeiJnRohuCRjYND42yX_7MQ3OtYThJTz1-z5Q_Xc-FfoAHirIsglWldlBA59W8Wnw-t85-dMeT6vIa0VxZBEaH-7aEkz8zrA-7iyu2V6cl6vI_x6n_LMheGUA3iQmtr3khK2kEiC8lYt7TAqfh-q8qWV5fdi3Kd9dh",
//             title: "Aura Buds Pro",
//             description:
//                 "Immersive sound quality with active noise cancellation for ultimate focus.",
//         },
//         {
//             image:
//                 "https://lh3.googleusercontent.com/aida-public/AB6AXuC5PcqNgxqJPNujp_i4fwwOyR-NqDaZBEPNw1sSQSPjqhXgPHRaEHmbaj8JZSltoO3c7qs5-utE9V2sQOX4gwtOZDV7TFCxcqK_EQWhNBtDqjKJWCZ2RaO9qCdWGTYDJixJe-cApsbQCpemTDUWhHWR6OZPtADXhUi9_SfS0MH5utPJwOBbm4GJRbYRjzKh8qYUn8E5Sz-eNeQ6eYB0p5bRPKEZeeeD9GgRo--t0dAT0QIPV3D55rxJ8J77hfaaAf-SJSu7KAkVbbcd",
//             title: "Galactic Smartwatch",
//             description:
//                 "Stay connected on the go with our sleek and powerful smartwatch.",
//         },
//     ];

//     return (
//         <section className={styles.wrapper}>
//             <div className={styles.bgDecor}>
//                 <div className={styles.grid}></div>
//                 <div className={styles.glow1}></div>
//                 <div className={styles.glow2}></div>
//             </div>

//             <div className="position-relative z-1 container py-5">
//                 <h2 className="text-center text-white mb-5 fw-bold">Featured Products</h2>
//                 <div className="row g-4">
//                     {products.map((p, i) => (
//                         <div key={i} className="col-12 col-sm-6 col-lg-4">
//                             <ProductCard {...p} />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }



export default function FeatureProduct({ title = "Featured Products", products = [], bgColor = "#0a192f" }) {
    return (
        <section className={`${styles.section} py-5`} style={{ backgroundColor: bgColor }}>
            <div className="container">
                <h2 className="text-center text-white fw-bold mb-4">{title}</h2>

                <div className="row g-4 justify-content-center">
                    {products.map((product, index) => (
                        <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-4">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
