import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/AuthProvider";
import { useCart } from "../context/Cart";
import axios from "axios"
import { Button, Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [catagories, setCatagories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { auth, setAuth } = useAuth();
  const { cart, setCart } = useCart();

  const navigate = useNavigate();

  // Get All Catagories
  const getAllCatagory = async() => {
    try {
      const {data} = await axios.get("http://localhost:8000/api/v1/catagory/get-catagory");
      // console.log("DATA", data);
      if(data?.success) {
        setCatagories(data?.catagory);
      }
        
    } catch (error) {
      console.log("Error Occurred", error);
    }
  }

  useEffect(() => {
    getAllCatagory();
    getTotal();
  }, []);

  // Get Products
  const getAllProducts = async() => {
    try {
      setLoading(true);
      const {data} = await axios.get(`http://localhost:8000/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
      
    } catch (error) {
      console.log("Error Occurred", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if(!checked.length || !radio.length) {
      getAllProducts();
    }
  }, []); // checked.length, radio.length

  // Get total count
  const getTotal = async() => {
    try {
      const {data} = await axios.get("http://localhost:8000/api/v1/product/product-count")
      setTotal(data?.total);
        
    } catch (error) {
      console.log("Error Occurred", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if(page === 1) return;
    loadMore();
  }, [page]);

  // Load more
  const loadMore = async() => {
    try {
      setLoading(true);
      const {data} = await axios.get(`http://localhost:8000/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products])
      
    } catch (error) {
      console.log("Error Occurred", error);
    }
  }

  // Filter by catagory
  const handleFilter = (value, id) => {
    let all = [...checked];
    if(value) {
      all.push(id);
    } else {
      all = all.filter(c => c != id)
    }
    setChecked(all);
  };

  // Get filterd product
  const filterProduct = async() => {
    try {
      const {data} = await axios.post("http://localhost:8000/api/v1/product/product-filters", {checked, radio});
      setProducts(data?.products);
      
    } catch (error) {
      console.log("Error Occurred", error);
    }
  }

  useEffect(() => {
    if(checked.length || radio.length) {
      filterProduct();
    }
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best Offers"}>

      <img src="/images/e-commerce-banner3.jpg" className="banner-img" alt="bannerimage" width={"100%"} height={"200px"} />

      <div className="container-fluid row mt-3 home-page">

        <div className="col-md-2 filters">

          {/* Catagory filter */}
          <h4 className="text-center"> Filter by Category</h4>
          <div className="d-flex flex-column m-1">
            {catagories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)} >
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/* Price filter */}
          <h4 className="text-center mt-4"> Filter by Price</h4>
          <div className="d-flex flex-column m-1">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}> {p.name} </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          {/* Reset filter */}
          <div className="d-flex flex-column m-1 mt-4">
            <button className="btn btn-danger" onClick={() => window.location.reload()}>RESET FILTERS</button>
          </div>

        </div>

        <div className="col-md-9">
          {/* {JSON.stringify(radio, null, 4)} */}
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{width: '18rem'}}>
                <img src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
              <div className="card-body">
                <h3 className="card-title">{p.name}</h3>
                <h5 className="card-title price">Rs: {p.price}/-</h5>
                <p className="card-text">{p.description.substring(0,30)}...</p>
                <button class="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                <button class="btn btn-secondary ms-1" 
                  onClick={() => {setCart([...cart, p]); 
                  localStorage.setItem("cart", JSON.stringify([...cart, p]));
                  toast.success("Item Added to Cart")}}>ADD TO CART
                </button>
              </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button className="btn btn-warning loadmore" onClick={(e) => {e.preventDefault(); setPage(page+1);}}>
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;





