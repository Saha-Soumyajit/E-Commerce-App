import React from 'react';
import { NavLink } from 'react-router-dom';

function AdminMenu() {
  return (
    <>
    <div className="text-center admin-dashboard">
      <div className="list-group">
        <h4>Admin Panel</h4>
        <NavLink to="/dashboard/admin/create-catagory" className="list-group-item list-group-item-action"><h6>Create Catagory</h6></NavLink>
        <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action"><h6>Create Product</h6></NavLink>
        <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action"><h6>Products</h6></NavLink>
        <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action"><h6>Orders</h6></NavLink>
        {/* <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink> */}
      </div>
    </div>
    </>
  )
}

export default AdminMenu