import React from "react";
import Layout from "../components/Layout/Layout";

const Home = () => {
  return (
    <Layout>
      <h1>Home</h1>
    </Layout>
  );
};

Layout.defaultProps = {
  title: "Ecommerce App",
  description: "Mern Project",
  keywords: "mern,mongodb,react,express",
  author: "SOBY",
};
export default Home;
