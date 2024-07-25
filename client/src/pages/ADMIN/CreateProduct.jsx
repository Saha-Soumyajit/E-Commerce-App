import React, { useState,useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select } from "antd"
const { Option } = Select;
import toast from 'react-hot-toast';

function CreateProduct() {
  const [catagories, setCatagories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [catagory, setCatagory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhpto] = useState("");
  const [shipping, setShipping] = useState("");

  const navigate = useNavigate();

  // Create product 
  const handleCreate = async(e) => {
    e.preventDefault();
    try {
      const productData = new FormData(); // Data contains photo thats why we use FormData(Browser default property)
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("catagory", catagory);
      productData.append("shipping", shipping);

      const {data} = await axios.post("http://localhost:8000/api/v1/product/create-product", productData);
      // console.log("DATA", data);
      if(data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
      
    } catch (error) {
      console.log("Error Occurred", error);
      toast.error("Something went wrong");
    }
  }

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
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    getAllCatagory();
  }, []);

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              {/* Select a catagory */}
              <Select bordered={false} placeholder="Select a category" size="large" showSearch className="form-select mb-3" onChange={(value) => {setCatagory(value)}}>
                {catagories?.map((c) => (
                  <Option key={c._id} value={c._id}>{c.name}</Option>
                ))}
              </Select>

              {/* Upload image   */}
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo? photo.name : "Upload photo"} 
                  <input type="file" name="photo" accept="image/*" onChange={(e) => setPhpto(e.target.files[0])} hidden />
                </label>
              </div>
              
              {/* Create a div that will show the Upload Image */}
              <div className="md-3">
                {photo && (
                  <div className="text-center">
                    <img src={URL.createObjectURL(photo)} alt="product-photo" height={"200px"} className="img img-responsive" /> {/* here we access image using browser property */}
                  </div>
                )}
              </div>

              {/* Write a name */}
              <div className="mb-3">
                <input type="text" value={name} placeholder="Write a name" className="form-control" onChange={(e) => setName(e.target.value)} />
              </div>
                
              {/* Write a description */}
              <div className="mb-3">
                <textarea type="text" value={description} placeholder="Write a description" className="form-control" onChange={(e) => setDescription(e.target.value)} />
              </div>

              {/* Write a price */}
              <div className="mb-3">
                <input type="number" value={price} placeholder="Write a price" className="form-control" onChange={(e) => setPrice(e.target.value)} />
              </div>

              {/* Write a quantity */}
              <div className="mb-3">
                <input type="number" value={quantity} placeholder="Write a quantity" className="form-control" onChange={(e) => setQuantity(e.target.value)} />
              </div>

              {/* Select shipping */}
              <div className="mb-3">
                <Select bordered={false} placeholder="Select shipping" size="large" showSearch className="form-select mb-3" onChange={(value) => {setShipping(value)}}>
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary col-md-12" onClick={handleCreate}>CREATE PRODUCT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProduct;
