import React from "react";
import Header from "@components/common/layout/Header/Header";
import Footer from "@components/common/layout/Footer/Footer";
import ChatbotWidget from "@components/ecommerce/chatbot/ChatbotWidget";
import { Outlet } from "react-router-dom";

const dashboardLinks = [
    { label: "My Ads", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
];

export default function UserLayout() {
    return (
        <>
            <Header links={dashboardLinks} />
            <main style={{ marginTop: "80px", padding: "20px" }}>
                <Outlet />
            </main>
            <Footer />
            <ChatbotWidget />
        </>
    );
}
