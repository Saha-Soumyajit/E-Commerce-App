import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.jsx";
import SearchProvider from "./context/Search.jsx";
import CartProvider from "./context/Cart.jsx";
import "antd/dist/reset.css";
// import "antd/dist/antd.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);
