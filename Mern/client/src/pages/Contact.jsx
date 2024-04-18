import React from "react";
import Layout from "../components/Layout/Layout";
import { FaCcDiscover } from "react-icons/fa6";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaHeadphonesAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <Layout title={"Contact- Ecommerce App"}>
      <div className="row contactus">
        <div className="contact-imageholder col-md-6">
          <img style={{ width: "100%" }} src="images/contactus.jpeg" />
        </div>
        <div className="contact-content col-md-4">
          <h1
            style={{ backgroundColor: "black", color: "white" }}
            className="text-center"
          >
            CONTACT US
          </h1>
          <p>Feel free to contact us anytime</p>

          <p className="mt-3">
            <MdOutlineMarkEmailUnread />: www.help.ecommerceapp.com
          </p>
          <p className="mt-3">
            <FaPhoneVolume />: 03054859259
          </p>
          <p className="mt-3">
            <FaHeadphonesAlt />: 1800-0000-000
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
