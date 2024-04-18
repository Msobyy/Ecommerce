import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = (props) => {
  return (
    <div>
      <Helmet>
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
        <meta name="author" content={props.author} />

        <title>{props.title}</title>
      </Helmet>
      <Header />

      <main style={{ minHeight: "74vh" }}>
        <ToastContainer />
        {props.children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
