import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import useCatagory from '../hooks/useCatagory';
import { Link } from 'react-router-dom';

function Catagories() {
  const catagories = useCatagory();

  return (
    <Layout title={"All Categories - E-Commerce App"}>
      <div className="container" style={{width: '18rem'}}>
        <div className="row">
          {catagories?.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <Link to={`/catagory/${c.slug}`} className='btn btn-primary' style={{width: '8rem'}}>{c.name}</Link>
            </div> 
          ))}   
        </div>
      </div>
    </Layout>
  )
}

export default Catagories;


