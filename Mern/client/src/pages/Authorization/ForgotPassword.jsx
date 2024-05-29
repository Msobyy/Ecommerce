import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [question, setQuestion] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newPassword: password, question }
      );
      console.log("Hello", res);

      if (res.data.success) {
        toast.success(res.data.message);

        setEmail("");
        setPassword("");
        setQuestion("");
        navigate("/login");
      } 
    } catch (error) {
      if (
        error.response.status === 404 ||
        error.response.status === 400 ||
        error.response.status === 500
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <Layout title={"ForgotPassword-Ecommerce App"}>
      <div className="maincontainer">
        <h1>Reset Password</h1>
        <div className="loginformContainer">
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="loginContainer">
              <div className="col-12">
                <label htmlFor="inputEmail" className="form-label">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  id="inputEmail"
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputPassword" className="form-label">
                  New Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="inputPassword"
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputQuestion" className="form-label">
                  Q: What is your Pet Name?
                </label>
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  type="text"
                  className="form-control"
                  id="inputQuestion"
                />
              </div>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
