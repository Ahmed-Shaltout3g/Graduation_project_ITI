import Footer from "@components/common/layout/Footer/Footer";
import Header from "@components/common/layout/Header/Header";
import React from "react";
// import Footer from "./Footer/Footer";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main style={{ margin: "auto" }}>
                {children}
            </main>
            <Footer />

        </>
    );
}
