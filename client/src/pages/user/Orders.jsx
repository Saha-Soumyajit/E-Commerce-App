import React, {useState, useEffect} from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import moment from "moment"

function Orders() {
  const [orders, setOrders] = useState([]);

  const {auth, setAuth} = useAuth();

  const getOrders = async() => {
    try {
      const {data} = await axios.get("http://localhost:8000/api/v1/auth/orders");
      setOrders(data);
      
    } catch (error) {
      console.log("Error Occurred", error);
    }
  }

  useEffect(() => {
    if(auth?.token) getOrders();
  },[auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {
              orders?.map((o,i) => {
                return(
                  <div className="border shadow">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createAt).fromNow()}</td>
                          <td>{o?.payment.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                    </tbody>
                    </table>

                    <div className="container">
                      {o?.products?.map((p,i) => (
                        <div key={p._id} className="row mb-3 p-3 card flex-row">
                          <div className="col-md-4">
                            <img src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} width={"80px"} height={"140px"} />
                          </div>

                          <div className="col-md-8">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description.substring(0, 30)}...</p>
                            <p className="card-title">Price: {p.price}/-</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
