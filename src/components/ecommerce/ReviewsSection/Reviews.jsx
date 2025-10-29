import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Reviews.module.css";

import { MdStar, MdStarBorder } from "react-icons/md";

const reviews = [
    { name: "Jane D.", text: "The best remote productivity tool I've ever used! It has completely transformed how our team collaborates.", stars: 5 },
    { name: "Mike R.", text: "A game-changer for our distributed team. The intuitive interface and powerful features are unmatched.", stars: 5 },
    { name: "Samantha K.", text: "Incredibly intuitive and powerful. Remote+ has become an indispensable part of our daily workflow.", stars: 4 },
    { name: "David L.", text: "Customer support is top-notch and the features are amazing. Highly recommend to any remote team.", stars: 5 },
    { name: "Emily C.", text: "We saw an immediate boost in productivity after switching to Remote+. It's simply the best.", stars: 5 },
];

const Reviews = () => {




    return <div className={styles.reviewsSection}>
        <div className="container  position-relative" style={{ zIndex: 1 }}>
            <h1 className={styles.textLight + " mb-4 text-center"}>What Our Customers Say</h1>

            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {reviews.map((r, idx) => (
                    <SwiperSlide key={idx}>
                        <div className={styles.reviewCard}>
                            <div className={styles.stars}>
                                {Array.from({ length: r.stars }).map((_, i) => (
                                    <MdStar key={i} color="#64FFDA" size={24} />
                                ))}
                                {r.stars < 5 && Array.from({ length: 5 - r.stars }).map((_, i) => (
                                    <MdStarBorder key={i} color="#8892B0" size={24} />
                                ))}
                            </div>
                            <blockquote className={styles.textSecondary + " mb-2"}>
                                <p>{r.text}</p>
                            </blockquote>
                            <cite className={styles.textLight + " fw-bold"}>{r.name}</cite>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </div>
}
export default Reviews;
