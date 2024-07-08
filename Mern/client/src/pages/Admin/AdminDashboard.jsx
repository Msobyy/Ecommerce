import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth.js";
import AdminLayout from "./AdminLayout.jsx";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <AdminLayout title={"Dashboard-Admin"}>
      <div className="card w-75 p-3">
        <h3>Admin Name: {auth?.user?.name}</h3>
        <h3>Admin Email: {auth?.user?.email}</h3>
        <h3>Admin Contact: {auth?.user?.phone}</h3>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
