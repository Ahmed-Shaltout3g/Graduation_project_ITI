// src/routes/AppRoutes.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
// import Register from "@pages/Register";
// import Profile from "@pages/Profile";
import NotFound from "./../pages/NotFound";
import Layout from "../layout/Layout";
import AboutUs from "@pages/AboutUs/AboutUs";
import Home from "@pages/Home/Home";
import Register from "@pages/Register/Register";





export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/aboutus" element={<AboutUs />} />

                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
