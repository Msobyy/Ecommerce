import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us-Ecommerce App"}>
      <div className="row contactus">
        <div className="contact-imageholder col-md-6">
          <img style={{ width: "100%" }} src="images/about.jpeg" />
        </div>
        <div className="contact-content col-md-4">
          <h1
            style={{ backgroundColor: "black", color: "white" }}
            className="text-center"
          >
            ABOUT US
          </h1>
          <p className="mt-5">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
