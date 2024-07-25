import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import axios from 'axios';
import toast from "react-hot-toast";


function CatagoryProduct() {
  const [products, setProducts] = useState([]);
  const [catagory, setCatagory] = useState([]);

  const { cart, setCart } = useCart();

  const params = useParams();
  const navigate = useNavigate();

  // Get product by catagory
  const getProductsByCat = async() => {
    try {
      const {data} = await axios.get(`http://localhost:8000/api/v1/product/product-catagory/${params.slug}`);
      setProducts(data?.products);
      setCatagory(data?.catagory);
      
    } catch (error) {
      console.log("Error Occurred", error);
    }
  }

  useEffect(() => {
    if(params?.slug) getProductsByCat();
  }, [params?.slug])

  return (
    <Layout title={"Categories - E-Commerce App"}>
      <div className="container mt-3 category">
        <h4 className='text-center'>Category- {catagory?.name}</h4>
        <h6 className='text-center'>{products?.length} Results Found</h6>

        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" style={{width: '18rem'}}>
                  <img src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <div className="card-name-price">
                    <h2 className="card-title">{p.name}</h2>
                    <h5 className="card-title card-price">Rs: {p.price}/-</h5>
                    <p className="card-text">{p.description.substring(0,30)}...</p>
                    <button class="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                    {/* <button class="btn btn-secondary ms-1">ADD TO CART</button> */}
                    <button class="btn btn-secondary ms-1" 
                      onClick={() => {setCart([...cart, p]); 
                      localStorage.setItem("cart", JSON.stringify([...cart, p]));
                      toast.success("Item Added to Cart")}}>ADD TO CART
                    </button>
                  </div>
                </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CatagoryProduct









