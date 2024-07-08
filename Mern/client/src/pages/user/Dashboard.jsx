import React from "react";
import Layout from "../../components/Layout/Layout";
import UserLayout from "./UserLayout";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth]=useAuth();
  return (
  <UserLayout title={"Dashboard-User"}>
     <div className="card w-75 p-3">
        <h3>User Name: {auth?.user?.name}</h3>
        <h3>User Email: {auth?.user?.email}</h3>
        <h3>User Contact: {auth?.user?.phone}</h3>
      </div>
  </UserLayout>
  );
};

export default Dashboard;
