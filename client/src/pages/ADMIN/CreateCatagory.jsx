import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import CatagoryForm from "../../components/Form/CatagoryForm";
import { Modal } from "antd"
import toast from 'react-hot-toast';

function CreateCatagory() {
  const [catagories, setCatagories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("")

  // Handle Form(CatagoryForm)
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("http://localhost:8000/api/v1/catagory/create-catagory", {name});
      if(data?.success) {
        toast.success(`${name} is Created`);
        getAllCatagory();
      } else {
        toast.error(data.message);
      }
      
    } catch (error) {
      console.log("Error Occurred", error);
      toast.error("Something went wrong");
    }
  }

  // Update Catagory
  const handleUpdate = async(e) => {
    e.preventDefault();
    try {
      // console.log(e);
      const {data} = await axios.put(`http://localhost:8000/api/v1/catagory/update-catagory/${selected._id}`, {name: updatedName});
      if(data?.success) {
        toast.success(`${updatedName} is Updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCatagory();
      } else {
        toast.error(data.message);
      }
      
    } catch (error) {
      console.log("Error Occurred", error);
      toast.error("Something went wrong");
    }
  }

  // Delete Catagory
  const handleDelete = async(pId) => {
    try {
      const {data} = await axios.delete(`http://localhost:8000/api/v1/catagory/delete-catagory/${pId}`);
      if(data?.success) {
        toast.success("Category is Deleted");
        getAllCatagory();
      } else {
        toast.error(data.message);
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
    <Layout title={"Dashboard - Create Catagory"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Catagory</h1>
            <div className="p-3 w-50">
              <CatagoryForm handleSubmit= {handleSubmit} value= {name} setValue= {setName} />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {catagories?.map((e) => (
                    <>
                      <tr>
                        <td key={e._id}>{e.name}</td>
                        <td>
                          <button className="btn btn-primary ms-2" onClick={() => {setVisible(true); setUpdatedName(e.name); setSelected(e)}}>Edit</button>
                          <button className="btn btn-danger ms-2" onClick={() => {handleDelete(e._id)}}>Delete</button>
                        </td>
                      </tr>  
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setVisible(false)} footer= {null} visible= {visible}> <CatagoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} /> </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCatagory;
