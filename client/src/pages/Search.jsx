import React from 'react';
import Layout from '../components/layout/Layout';
import { useSearch } from '../context/Search';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import toast from "react-hot-toast";

function Search() {
  const { search, setSearch } = useSearch();
  const { cart, setCart } = useCart();

  const navigate = useNavigate();

  return (
    <Layout title={"Search Results - E-Commerce App"}>
      <div className="container mt-3 category">
        <h3 className='text-center'>Search Results</h3>
        <h6 className='text-center'>{search?.results?.length < 1 ? "No Product Found" : `${search?.results?.length} Results Found`}</h6>

        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {search?.results.map((p) => (
                <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                  <img src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <div className="card-name-price">
                    <h2 className="card-title">{p.name}</h2>
                    <h5 className="card-title card-price">Rs: {p.price}/-</h5>
                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                    <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                    {/* <button className="btn btn-secondary ms-1">ADD TO CART</button> */}
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
  );
}

export default Search;