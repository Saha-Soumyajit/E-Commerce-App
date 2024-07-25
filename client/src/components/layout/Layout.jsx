import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet"; // For SEO

function Layout({ children, title, description, keywords, author }) {
  return (
    <div>
      {/* For Search Engine Optimization */}
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      {/* In the layout we wrapped the header main and footer */}
      <Header />
      <main style={{ minHeight: "72vh" }}>{children}</main>
      <Footer />
    </div>
  );
}

// SEO Default Props
Layout.defaultProps = {
  title: "Ecommerce App - shop now",
  description: "mern stack project",
  keywords: "mern, react, node, mongodb",
  author: "Soumyajit Saha"
}

export default Layout;
