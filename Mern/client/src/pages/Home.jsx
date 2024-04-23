import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

const Home = () => {
  const [auth]=useAuth();
  return (
    <Layout>
      <h1>Home</h1>
      <pre>{JSON.stringify(auth,null,4)}</pre>
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
