import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

function Products() {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async() => {
    try {
      const {data} = await axios.get("http://localhost:8000/api/v1/product/get-product");
      // console.log("DATA", data);
      setProducts(data.products);
        
    } catch (error) {
      console.log("Error Occurred", error);
      toast.error("Something went wrong");
    }
  }

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  },[]);

  return (
    <Layout title={"Dashboard - Get All Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mt-3">All products list</h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className="product-link">
                  
                <div className="card m-2" style={{width: '18rem'}}>
                  <img src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                </div>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
