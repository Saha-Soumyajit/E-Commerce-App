import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import { Toaster } from 'react-hot-toast';
import PrivateRoutes from "./components/routes/PrivateRoutes";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoutes from "./components/routes/AdminRoutes";
import AdminDashboard from "./pages/ADMIN/AdminDashboard";
import CreateCatagory from "./pages/ADMIN/CreateCatagory";
import CreateProduct from "./pages/ADMIN/CreateProduct";
import Users from "./pages/ADMIN/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/ADMIN/Products";
import UpdateProduct from "./pages/ADMIN/UpdateProduct";
import Search from "./pages/Search";
import SingleProductDetails from "./pages/SingleProductDetails";
import Catagories from "./pages/Catagories";
import CatagoryProduct from "./pages/CatagoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/ADMIN/AdminOrders";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<SingleProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/catagories" element={<Catagories />} />
        <Route path="/catagory/:slug" element={<CatagoryProduct />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/dashboard" element= {<PrivateRoutes />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        <Route path="/dashboard" element= {<AdminRoutes />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-catagory" element={<CreateCatagory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>        
    
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
