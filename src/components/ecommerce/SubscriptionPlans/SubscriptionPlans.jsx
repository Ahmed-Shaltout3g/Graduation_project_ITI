// src/components/ecommerce/SubscriptionPlans/SubscriptionPlans.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { AiOutlineCheckCircle } from "react-icons/ai";
import styles from "./SubscriptionPlans.module.css";
import { packageService } from "../../../services/package";

export default function SubscriptionPlans() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await packageService.getAll();
                setPackages(data);
            } catch (error) {
                console.error(error); // toast يظهر تلقائي من axios
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    if (loading) return <p className="text-center">Loading...</p>;
    if (!packages.length) return <p className="text-center">No packages found</p>;

    return (
        <Container className={styles.plansContainer}>
            <div className="text-center mb-5">
                <h1 className="fw-bold text-white">Choose Your Plan</h1>
                <p className="text-secondary">
                    Join our community with a plan that suits your needs. Upgrade, downgrade, or cancel anytime.
                </p>
            </div>

            <Row className="g-4">
                {packages.map((pkg) => {
                    const isPopular = pkg.popular; // استخدم property من الباك لتحديد الباكج الشهير

                    return (
                        <Col md={4} key={pkg.id}>
                            <div
                                className={`${styles.planCard} ${isPopular ? styles.planCardPopular : ""} d-flex flex-column h-100 p-4`}
                            >
                                <div>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h2 className={styles.planTitle}>{pkg.name}</h2>
                                        {isPopular && (
                                            <span className="badge bg-primary text-dark">Most Popular</span>
                                        )}
                                    </div>
                                    <div className={styles.planPrice}>
                                        <span className={styles.priceValue}>${pkg.price}</span>
                                        <span className={styles.pricePeriod}> / {pkg.duration_in_days} days</span>
                                    </div>
                                </div>

                                <ul className={styles.featuresList}>
                                    <li className={styles.featureItem}>
                                        <AiOutlineCheckCircle color="#29E3DA" /> Ad Limit: {pkg.ad_limit}
                                    </li>
                                    {pkg.featured_ad_limit !== null && (
                                        <li className={styles.featureItem}>
                                            <AiOutlineCheckCircle color="#29E3DA" /> Featured Ads: {pkg.featured_ad_limit}
                                        </li>
                                    )}
                                    {pkg.description && (
                                        <li className={styles.featureItem}>
                                            <AiOutlineCheckCircle color="#29E3DA" /> {pkg.description}
                                        </li>
                                    )}
                                </ul>

                                <Button
                                    variant={isPopular ? "primary" : "outline-primary"}
                                    className={`mt-auto ${styles.chooseButton}`}
                                    size="lg"
                                >
                                    Choose Plan
                                </Button>
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}
