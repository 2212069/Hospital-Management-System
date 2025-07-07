import React, { useState } from "react";

const DoctorPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [newPrescription, setNewPrescription] = useState({ patientID: "", details: "" });

  const addPrescription = () => {
    if (newPrescription.patientID && newPrescription.details) {
      setPrescriptions([...prescriptions, newPrescription]);
      setNewPrescription({ patientID: "", details: "" });
    } else {
      alert("Please enter details");
    }
  };

  return (
    <div className="dashboard">
      <h2>Prescriptions</h2>
      <input
        type="text"
        placeholder="Patient ID"
        value={newPrescription.patientID}
        onChange={(e) => setNewPrescription({ ...newPrescription, patientID: e.target.value })}
      />
      <textarea
        placeholder="Prescription Details"
        value={newPrescription.details}
        onChange={(e) => setNewPrescription({ ...newPrescription, details: e.target.value })}
      ></textarea>
      <button onClick={addPrescription}>Add Prescription</button>

      <h3>Prescriptions</h3>
      <ul>
        {prescriptions.map((pres, index) => (
          <li key={index}>
            Patient {pres.patientID}: {pres.details}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorPrescriptions;
