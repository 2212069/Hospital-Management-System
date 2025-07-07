import React, { useEffect, useState } from "react";

const ViewPrescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await fetch("http://localhost:5000/patient/prescriptions", {
                    method: "GET",
                    credentials: "include", // If using cookies for auth
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch prescriptions");
                }
                
                setPrescriptions(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPrescriptions();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>My Prescriptions</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Doctor</th>
                        <th>Diagnosis</th>
                        <th>Instructions</th>
                        <th>Medications</th>
                    </tr>
                </thead>
                <tbody>
                    {prescriptions.length === 0 ? (
                        <tr>
                            <td colSpan="5">No prescriptions found</td>
                        </tr>
                    ) : (
                        prescriptions.map((prescription) => (
                            <tr key={prescription.prescriptionID}>
                                <td>{new Date(prescription.createdAt).toLocaleDateString()}</td>
                                <td>{prescription.doctorName}</td>
                                <td>{prescription.diagnosis}</td>
                                <td>{prescription.instructions}</td>
                                <td>
                                    {prescription.medicationName} - {prescription.dosage} <br />
                                    {prescription.before_food ? "Before Food" : ""}
                                    {prescription.after_food ? "After Food" : ""}
                                    <br />
                                    {prescription.morning ? "Morning " : ""}
                                    {prescription.afternoon ? "Afternoon " : ""}
                                    {prescription.evening ? "Evening " : ""}
                                    {prescription.night ? "Night " : ""}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewPrescriptions;
