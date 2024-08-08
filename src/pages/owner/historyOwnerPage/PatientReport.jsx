import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarOwner from "../../../components/owner/SidebarOwner";
import { useSelector } from "react-redux";

const PatientReport = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { open } = useSelector((state) => state.sidebar);
  const [activePage, setActivePage] = useState("Laporan Klient");

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const token = localStorage.getItem("token"); // Replace with actual token retrieval logic
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/histories/patient-report`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatientData(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  return (
    <div className="flex">
      <SidebarOwner activePage={activePage} setActivePage={setActivePage} />
      <div className={`${open ? "ml-72" : "ml-20"} container-dashboard`}>
        <div className="flex-1 p-4">
          <h2 className="mb-2 text-xl font-semibold">Top Patients by Consultation Frequency</h2>
          <div className="overflow-x-auto">
            {loading ? (
              <p>Loading patient data...</p>
            ) : (
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-bgTri">
                    <th className="px-4 py-2 text-left">Patient Name</th>
                    <th className="px-4 py-2 text-right">Consultation Count</th>
                  </tr>
                </thead>
                <tbody>
                  {patientData.topPatients.map((patient, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{patient.name}</td>
                      <td className="px-4 py-2 text-right">{patient.consultationCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientReport;
