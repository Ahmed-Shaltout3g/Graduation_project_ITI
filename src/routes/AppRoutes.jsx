import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "@pages/Home/Home";
import AboutUs from "@pages/AboutUs/AboutUs";
import Login from "@pages/Login/Login";
import Register from "@pages/Register/Register";
import UserLayout from "../layout/UserLayout";
import ProductsPage from "@pages/MarketPlace/ProductsPage";
import NotFound from "@pages/NotFound";
import MyAds from "@pages/MyAds/MyAds";


export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/marketplace" element={<ProductsPage />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route path="/dashboard" element={<UserLayout />}>
                    <Route index element={<MyAds />} />
                    {/* <Route path="add-ad" element={<AddAdPage />} />
                    <Route path="profile" element={<ProfilePage />} /> */}
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}
