import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

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

      <main style={{ minHeight: "74vh" }}>{props.children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
