import React, { useState } from "react";

const PatientBookAppointment = () => {
  const [availableSlots, setAvailableSlots] = useState([
    { time: "10:00 AM - 11:00 AM", doctor: "Dr. John Doe" }
  ]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const bookSlot = (index) => {
    alert(`Appointment booked with ${availableSlots[index].doctor} at ${availableSlots[index].time}`);
  };

  return (
    <div className="dashboard">
      <h2>Book Appointment</h2>
      <ul>
        {availableSlots.map((slot, index) => (
          <li key={index}>
            {slot.time} - {slot.doctor}{" "}
            <button onClick={() => bookSlot(index)}>Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientBookAppointment;
