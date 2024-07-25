import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import toast from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { auth, setAuth } = useAuth();

  // Form handle
  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(name, email, password, phone, address);
    // toast.success("Register Successfully");
    try {
      const res = await axios.post("http://localhost:8000/api/v1/auth/login", { email, password });
      if(res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        // For Private Routes
        navigate(location.state || "/")
      } else {
        toast.error(res.data.message);
      }

    } catch (error) {
      console.log("Error Occurred", error);
      toast.error("Invaild Password or Email");
    }
  }

  return (
    <Layout title={"Login - E-Commerce App"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>

        <h4 className="title">LOGIN FORM</h4>

        <div className="mb-3">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' required />
        </div>

        <div className="mb-3">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password' required />
        </div>

        <div className="mb-3">
        <button type="button" className="btn btn-primary" onClick={() => {navigate("/forgot-password")}}>Forgot Password</button>
        </div>

        <button type="submit" className="btn btn-primary" id="stars">Login</button>

        </form>
      </div>
    </Layout>
  )
}

export default Login
