import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productService } from "../../services/productService";
import { Container, Row, Col, Button, ProgressBar } from "react-bootstrap";
import { BsStarFill, BsStarHalf, BsArrowLeft } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./ProductDetails.module.css";
import ButtonPrimary from "@components/common/ButtonPrimary/ButtonPrimary";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/chat`); // navigate to product details page
    };
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productService.getProductDetails(id);
                setProduct(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <p className="text-white">Loading...</p>;
    if (!product) return <p className="text-white">Product not found.</p>;

    // Ratings stars
    const ratingStars = [];
    const fullStars = Math.floor(product.rating || 4);
    const halfStar = product.rating % 1 >= 0.5;
    for (let i = 0; i < fullStars; i++) ratingStars.push(<BsStarFill key={i} className={styles.star} />);
    if (halfStar) ratingStars.push(<BsStarHalf key="half" className={styles.star} />);

    const reviewBars = [
        { rate: 5, percent: 72 },
        { rate: 4, percent: 18 },
        { rate: 3, percent: 5 },
        { rate: 2, percent: 3 },
        { rate: 1, percent: 2 },
    ];

    return (
        <Container className={styles.page}>


            <Row className="gap-5">
                {/* Left: Images */}
                <Col lg={4} className="d-flex flex-column gap-3">
                    <div
                        className={styles.mainImage}
                        style={{ backgroundImage: `url(${product.image || product.images?.[0]})` }}
                    ></div>
                    {product.images && (
                        <div className="d-flex gap-2">
                            {product.images.map((img, i) => (
                                <div key={i} className={styles.thumbnail} style={{ backgroundImage: `url(${img})` }}></div>
                            ))}
                        </div>
                    )}
                </Col>

                {/* Right: Details */}
                <Col lg={6} className="d-flex flex-column ">
                    <h1 className={styles.title}>{product.title}</h1>
                    <p className={styles.subtitle}>{product.category_name}</p>
                    <p className={styles.description}>{product.description}</p>
                    <hr className={styles.star} />
                    <p className={styles.description}>condition: {product.condition}</p>
                    <p className={styles.description}>university: {product.university}</p>
                    <p className={styles.description}>faculty: {product.faculty}</p>




                    <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mt-3">
                        <h2 className={styles.price}>${product.price}</h2>
                        {/* <Button className={styles.cartButton}>
                            <FaShoppingCart className="me-2" />
                            Add to Cart
                        </Button>
                         */}
                        <ButtonPrimary text="chat with owner" onClick={handleClick} />

                    </div>
                </Col>
            </Row>


            <div className="mt-5" id="reviews">
                <h3 className="text-white mb-3">OWNER CONTACT </h3>
                <div className={`${styles.reviewsCard} p-3`}>
                    <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                        <div>
                            <p className="text-white fs-5  ">Name : {product.seller.first_name || "Owner Name"}</p>
                            <p className="text-white fs-5  ">Phone : {product.seller.phone || "01000000000"}</p>
                            <p className="text-white fs-5  ">Email : {product.seller.email || "owner@example.com"}</p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Reviews */}
            <div className="mt-5" id="reviews">
                <h3 className="text-white mb-3">Customer Reviews</h3>
                <div className={`${styles.reviewsCard} p-3`}>
                    <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                        <div>
                            <p className={styles.reviewScore}>{product.rating || 4.5}</p>
                            <div className="d-flex gap-1">{ratingStars}</div>
                            <p className="text-white">Based on {product.reviewsCount || 128} reviews</p>
                        </div>

                        <div className="flex-grow-1 d-grid gap-2">
                            {reviewBars.map((bar) => (
                                <div className="d-flex align-items-center gap-2" key={bar.rate}>
                                    <span className="text-white">{bar.rate}</span>
                                    <ProgressBar now={bar.percent} className={styles.progress} />
                                    <span className="text-secondary">{bar.percent}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
