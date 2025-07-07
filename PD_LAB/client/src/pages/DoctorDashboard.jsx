import React from "react";

const DoctorDashboard = () => {
  return (
    <div className="dashboard">
      <h2>Doctor Dashboard</h2>
      <ul>
        <li><a href="/doctor/patients">View Patients</a></li>
        <li><a href="/doctor/prescriptions">Manage Prescriptions</a></li>
      </ul>
    </div>
  );
};

export default DoctorDashboard;
