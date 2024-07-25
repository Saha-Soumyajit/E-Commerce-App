import React from 'react';
import { NavLink } from 'react-router-dom';

function UserMenu() {
  return (
    <>
      <div className="text-center admin-dashboard">
        <div className="list-group">
          <h4>Dashboard</h4>
          <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action"><h6>Profile</h6></NavLink>
          <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action"><h6>Orders</h6></NavLink>
        </div>
      </div>
    </>
  )
}

export default UserMenu