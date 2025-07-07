import React from "react";

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><a href="/admin/add-doctor">Add Doctor</a></li>
        <li><a href="/admin/appointments">Manage Appointments</a></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
