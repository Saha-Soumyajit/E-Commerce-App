import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const {auth, setAuth} = useAuth();
  const navigate = useNavigate();

  // Get user data
  useEffect(() => {
    const {name, email, phone, address} = auth?.user;
      setName(name);
      setEmail(email);
      setPhone(phone);
      setAddress(address);
  }, [auth?.user]);

  // Form handle
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put("http://localhost:8000/api/v1/auth/profile", {name, email, password, phone, address});
      if(data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({...auth, user: data?.updateUser});
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updateUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully")
        navigate("/dashboard/user");
      }

    } catch (error) {
      console.log("Error Occurred", error);
      toast.error("Something went wrong");
    }
  }

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3 mb-0 pb-0">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <form onSubmit={handleSubmit}>

                <h4 className="title">USER PROFILE</h4>

                <div className="mb-3">
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Name' />
                </div>

                <div className="mb-3">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' disabled />
                </div>

                <div className="mb-3">
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password' />
                </div>

                <div className="mb-3">
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Phone NO' />
                </div>

                <div className="mb-3">
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Address' />
                </div>

                <button type="submit" className="btn btn-primary">Update</button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
