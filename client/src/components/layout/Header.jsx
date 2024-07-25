import React from "react";
import {NavLink, Link} from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useCart } from "../../context/Cart";
import { HiMiniShoppingCart } from "react-icons/hi2";
import toast from 'react-hot-toast';
import SearchInput from "../Form/SearchInput";
import useCatagory from "../../hooks/useCatagory"; // Custom Hooks
import {Badge} from "antd"

function Header() {
  const { auth, setAuth } = useAuth();
  const { cart, setCart } = useCart();
  const catagories = useCatagory(); // Custom Hooks

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  }

  return (
  <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">

      <div className="container-fluid">

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

        <Link to= "/" className="navbar-brand"><HiMiniShoppingCart />E-COMMERCE APP</Link>

        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <SearchInput />
          <li className="nav-item">
            <NavLink to= "/" className="nav-link">Home</NavLink>
          </li>

          <li className="nav-item dropdown">
            <NavLink className="nav-link dropdown-toggle" to={"/catagories"} data-bs-toggle="dropdown">Categories</NavLink>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to={"/catagories"}>All Categories</Link>
              </li>
              {catagories?.map((c) => (
                <li>
                  <Link className="dropdown-item" to={`/catagory/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </li>

          {
            !auth.user ? (<>
              <li className="nav-item">
                <NavLink to= "/register" className="nav-link">Register</NavLink>
              </li>

              <li className="nav-item">
                <NavLink to= "/login" className="nav-link">Login</NavLink>
              </li>
            </>) : (
            <>
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" id="design">{auth?.user?.name}</NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">Dashboard</NavLink>
                    </li>

                    <li>
                      <NavLink onClick={handleLogout} to="/login" className="dropdown-item">Logout</NavLink>
                    </li>
                  </ul>
              </li>
            </>)
          }

          <li className="nav-item">
            <Badge count={cart.length} showZero>
              <NavLink to= "/cart" className="nav-link">Cart</NavLink>
            </Badge>
          </li>
        </ul>
      </div>
      </div>
    </nav>
  </>
 );
}

export default Header;
