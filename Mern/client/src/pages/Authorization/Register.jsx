import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import {toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import '../../styles/AuthStyles.css'

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(1);
  const navigate=useNavigate();


  const handleSubmit= async (e)=>{
    e.preventDefault();
    console.log(name,email,password,phone,address);
try {
    const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address,role});
    if(res.data.success){
      toast.success(res.data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAddress("");
      navigate('/login');
    }else{
      toast.error(res.data.message);
    }
} catch (error) {
  console.log(error);
  toast.error("Something went wrong");
}
  
    

  }
  return (
    <Layout title={"Register-Ecommerce App"}>
      <div className="maincontainer">
        <h1>Registration</h1>
        <div className="formContainer">
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-12">
              <label htmlFor="inputName" className="form-label">
                Name
              </label>
              <input
                value={name}
                onChange={(e)=>setName(e.target.value)}
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Jhon Doe"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                type="email"
                className="form-control"
                id="inputEmail"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="inputPassword"
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputPhone" className="form-label">
                Phone
              </label>
              <input
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                type="text"
                className="form-control"
                id="inputPhone"
                placeholder="+923054859259"
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputAddress" className="form-label">
                Address
              </label>
              <input
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
              />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
