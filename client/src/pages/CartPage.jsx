import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useCart } from '../context/Cart';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import toast from "react-hot-toast";

function CartPage() {
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);

  const { auth, setAuth } = useAuth();
  const { cart, setCart } = useCart();

  const navigate = useNavigate();

  // Delete Item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex(item => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));

    } catch (error) {
      console.log("Error Occurred", error);
    }
  };

  // Total Price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach(item => { total += item.price; });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });

    } catch (error) {
      console.log("Error Occurred", error);
    }
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v1/product/braintree/token");
      // console.log(data);
      setClientToken(data?.clientToken); // clientToken available from the API
    } catch (error) {
      console.log("Error Occurred", error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle Payments
  const handlePayment = async () => {
    if (!instance) {
      toast.error("Braintree instance not available");
      return;
    }
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("http://localhost:8000/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      toast.success("Payment Successful");
      setCart([]);
      localStorage.removeItem("cart");
      navigate("/dashboard/user/orders");
      
    } catch (error) {
      setLoading(false);
      toast.error("Payment Failed");
      console.error("Payment error:", error);
    }
  };

  return (
    <Layout title={"Cart Page - E-Commerce App"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className='text-center bg-light p-2'>
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className='text-center'>
              {cart?.length ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"}` : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div key={p._id} className="row mb-3 p-3 card flex-row">
                <div className="col-md-4">
                  <img src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} width={"80px"} height={"140px"} />
                </div>

                <div className="col-md-8">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <p className="card-title">Price: {p.price}/-</p>
                  <button className='btn btn-danger' onClick={() => { removeCartItem(p._id); toast.success("Item Deleted from Cart") }}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h5>Current Address: {auth?.user?.address}</h5>
                  <button className="btn btn-outline-warning" onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button className='btn btn-outline-warning' onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                ) : (
                  <button className='btn btn-outline-warning' onClick={() => navigate("/login", { state: "/cart" })}>Please Login to Checkout</button>
                )}
              </div>
            )}
            <br /><hr />
            <div className="mt-2 mb-2">
              {clientToken ? (
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault"
                    }
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
              ) : (
                <div>Loading payment options...</div>
              )}
              <button className='btn btn-primary' onClick={handlePayment} disabled={!auth?.user?.address || !instance || loading}>
                {loading ? "Processing..." : "Make Payment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;



