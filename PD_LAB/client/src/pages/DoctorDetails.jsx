import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DoctorDetails = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetch(`/patient/doctors/${doctorId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setDoctor(data))
      .catch((error) => console.error("Error fetching doctor details:", error));

    fetch(`/patient/doctor/${doctorId}/slots`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setSlots(data))
      .catch((error) => console.error("Error fetching slots:", error));
  }, [doctorId]);

  const bookAppointment = (slotId) => {
    fetch(`/patient/book-appointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ doctorId, slotId }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((error) => console.error("Error booking appointment:", error));
  };

  return (
    <div className="doctor-details-container">
      {doctor ? (
        <>
          <h2>Dr. {doctor.name}</h2>
          <p><strong>Specialty:</strong> {doctor.speciality}</p>
          <p><strong>Email:</strong> {doctor.emailID}</p>
          <p><strong>Phone:</strong> {doctor.phoneNumber}</p>

          <h3>Available Slots</h3>
          {slots.length === 0 ? (
            <p>No available slots</p>
          ) : (
            <ul className="slots-list">
              {slots.map((slot) => (
                <li key={slot.slotId}>
                  <span>{slot.date} - {slot.time}</span>
                  <button onClick={() => bookAppointment(slot.slotId)}>Book</button>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>Loading doctor details...</p>
      )}
    </div>
  );
};

export default DoctorDetails;
