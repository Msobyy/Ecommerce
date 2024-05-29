import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res.data.success) {
        toast.success(res.data.message);

        setEmail("");
        setPassword("");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));

        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
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
    <Layout title={"Register-Ecommerce App"}>
      <div className="maincontainer">
        <h1>Login</h1>
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
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="inputPassword"
                />
              </div>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <div className="col-12 forgotPassword">
              <button
                className="forgotPasswordButton"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot Password...?
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
