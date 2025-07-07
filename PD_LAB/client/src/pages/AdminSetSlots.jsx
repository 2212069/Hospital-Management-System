import React, { useState } from "react";

const AdminSetSlots = () => {
  const [slots, setSlots] = useState([
    { time: "10:00 AM - 11:00 AM", doctor: "Dr. John Doe" }
  ]);
  const [newSlot, setNewSlot] = useState({ time: "", doctor: "" });

  const addSlot = () => {
    if (newSlot.time && newSlot.doctor) {
      setSlots([...slots, newSlot]);
      setNewSlot({ time: "", doctor: "" });
    } else {
      alert("Please fill all fields");
    }
  };

  const deleteSlot = (index) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  return (
    <div className="dashboard">
      <h2>Set Appointment Slots</h2>
      <input
        type="text"
        placeholder="Time Slot (e.g., 10:00 AM - 11:00 AM)"
        value={newSlot.time}
        onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
      />
      <input
        type="text"
        placeholder="Doctor Name"
        value={newSlot.doctor}
        onChange={(e) => setNewSlot({ ...newSlot, doctor: e.target.value })}
      />
      <button onClick={addSlot}>Add Slot</button>

      <h3>Available Slots</h3>
      <ul>
        {slots.map((slot, index) => (
          <li key={index}>
            {slot.time} - {slot.doctor}{" "}
            <button onClick={() => deleteSlot(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSetSlots;
