import React, { useState } from "react";

const AdminManageDoctors = () => {
  const [doctors, setDoctors] = useState([
    { id: "D001", name: "Dr. John Doe", specialization: "Cardiology" },
    { id: "D002", name: "Dr. Jane Smith", specialization: "Dermatology" }
  ]);

  const [newDoctor, setNewDoctor] = useState({ name: "", specialization: "" });

  const addDoctor = () => {
    if (newDoctor.name && newDoctor.specialization) {
      const newId = `D00${doctors.length + 1}`;
      setDoctors([...doctors, { id: newId, ...newDoctor }]);
      setNewDoctor({ name: "", specialization: "" });
    } else {
      alert("Please enter doctor details");
    }
  };

  const deleteDoctor = (id) => {
    setDoctors(doctors.filter((doc) => doc.id !== id));
  };

  return (
    <div className="dashboard">
      <h2>Manage Doctors</h2>
      <input
        type="text"
        placeholder="Doctor Name"
        value={newDoctor.name}
        onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Specialization"
        value={newDoctor.specialization}
        onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
      />
      <button onClick={addDoctor}>Add Doctor</button>

      <h3>Doctor List</h3>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            {doctor.name} - {doctor.specialization}{" "}
            <button onClick={() => deleteDoctor(doctor.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminManageDoctors;
