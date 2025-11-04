// Footer.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import styles from "./Footer.module.css";
import { MdSchool } from "react-icons/md";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <Row>
                    <Col lg={4} md={6} className="mb-4">
                        <div className={styles["footer-logo"]}>
                            <MdSchool size={28} className="me-2 text-info" />
                            <span>Eagrely</span>
                        </div>
                        <p>Connecting the future, remotely.</p>
                        <div className={styles["footer-socials"]}>
                            <a href="#"><FaTwitter /></a>
                            <a href="#"><FaLinkedin /></a>
                            <a href="#"><FaFacebook /></a>
                        </div>
                    </Col>

                    <Col lg={2} md={6} className="mb-4">
                        <h6>Products</h6>
                        <ul>
                            <li><a href="#">Virtual Desktops</a></li>
                            <li><a href="#">Cloud Storage</a></li>
                            <li><a href="#">Team Sync</a></li>
                            <li><a href="#">Pricing</a></li>
                        </ul>
                    </Col>

                    <Col lg={2} md={6} className="mb-4">
                        <h6>Resources</h6>
                        <ul>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Case Studies</a></li>
                            <li><a href="#">Documentation</a></li>
                        </ul>
                    </Col>

                    <Col lg={2} md={6} className="mb-4">
                        <h6>Company</h6>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                        </ul>
                    </Col>
                </Row>

                <div className={styles["footer-bottom"]}>
                    © 2024 Remote+ Inc. All rights reserved.
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
