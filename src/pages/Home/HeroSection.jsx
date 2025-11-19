import React from "react";
import "./HeroSection.css";
import { Link } from 'react-router-dom';

export default function HeroSection() {
    return (
        <section className="hero-section text-center text-white position-relative overflow-hidden py-5">
            <div className="background-container">
                <div className="glow-lines"></div>
                <div className="grid-pattern"></div>
            </div>

            <div className="container position-relative z-1 mt-5 pt-5">
                <div className="d-inline-flex align-items-center justify-content-center gap-2 rounded-pill bg-opacity-10 bg-primary border border-info px-4 py-2 mb-4">
                    <p className="text-info mb-0 fw-medium small">
                        🚀 New Products → Check out our Products
                    </p>
                </div>

                <h1 className="display-5 fw-bold mx-auto mb-3" style={{ maxWidth: "800px" }}>
                    WE PICKED SOME
                    <br /> COOL THINGS FOR YOU.
                </h1>

                <p className="text-light mx-auto lead mb-4" style={{ maxWidth: "700px" }}>
                    Providing university students with quality study tools and supplies for a smarter learning experience.
                </p>


                <Link to="/marketplace">
                    <div className="d-inline-flex align-items-center justify-content-center gap-2 rounded-pill bg-opacity-10 bg-primary border border-info px-4 py-2 mb-4">
                        <p className="text-info mb-0 fw-medium small">
                            <i className="bi bi-stars me-2"></i> Shopping Now
                        </p>
                    </div>
                </Link>
            </div>
        </section>
    );
}
