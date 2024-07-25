import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useCart } from '../context/Cart';
import toast from "react-hot-toast";

function SingleProductDetails() {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { cart, setCart } = useCart();
  
  const params = useParams();

  // getProduct
  const getProduct = async() => {
    try {
      const {data} = await axios.get(`http://localhost:8000/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.catagory._id);
        
    } catch (error) {
      console.log("Error Occurred", error);
    }
  }

  // Initial product details
  useEffect(() => {
    if(params?.slug) getProduct();
  }, [params?.slug]);

  // Get similar product
  const getSimilarProduct = async(pid, cid) => {
    try {
      const {data} = await axios.get(`http://localhost:8000/api/v1/product/related-product/${pid}/${cid}`)
      setRelatedProducts(data?.products);
        
    } catch (error) {
      console.log("Error Occurred", error);
    }
  }

  return (
    <Layout title={"Product Details - E-Commerce App"}>
      <div className="row container mt-3 product-details">
        <div className="col-md-6">
          <img src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} height={"400px"} width={"170px"} />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1> <hr />
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: {product.price}/-</h6>
          <h6>Category: {product.catagory?.name}</h6>
          {/* <button class="btn btn-secondary ms-1">ADD TO CART</button> */}
          <button class="btn btn-secondary ms-1" 
            onClick={() => {setCart([...cart, product]); 
            localStorage.setItem("cart", JSON.stringify([...cart, product]));
            toast.success("Item Added to Cart")}}>ADD TO CART
          </button>
        </div>
      </div>
      
      <hr />
      <div className="row container similar-products">
        <h3>Similar product</h3>
        {relatedProducts.length < 1 && (<p className='text-center'>No Similar Products Found</p>)}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{width: '18rem'}}>
              <img src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
            <div className="card-body">
              <h2 className="card-title">{p.name}</h2>
              <h5 className="card-price">Rs: {p.price}/-</h5>
              <p className="card-text">{p.description.substring(0,30)}...</p>
              {/* <button class="btn btn-secondary ms-1">ADD TO CART</button> */}
              <button class="btn btn-secondary ms-1" 
                onClick={() => {setCart([...cart, p]); 
                localStorage.setItem("cart", JSON.stringify([...cart, p]));
                toast.success("Item Added to Cart")}}>ADD TO CART
              </button>
            </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default SingleProductDetails