import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarOwner from "../../../components/owner/SidebarOwner";
import { useSelector } from "react-redux";

const PsychologistPerformance = () => {
  const [activePage, setActivePage] = useState("Kinerja Psikologi");
  const { open } = useSelector((state) => state.sidebar);
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/histories/performance-psychologist`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPerformanceData(response.data);
      } catch (error) {
        console.error("Error fetching psychologist performance data:", error);
      }
    };

    fetchPerformanceData();
  }, []);

  return (
    <>
      <div className="flex">
        <SidebarOwner activePage={activePage} setActivePage={setActivePage} />
        <div className={`${open ? "ml-72" : "ml-20"} container-dashboard`}>
          {/* judul */}
          <div>
            <h1 className="text-sizeTri font-bold text-textSec">Dashboard</h1>
            <p className="my-3 text-textFunc">Dashboard</p>
          </div>
          {/* judul */}
          {/* content */}
          <div className="flex w-full flex-wrap gap-5 rounded-md bg-bgTri p-5 shadow-sm shadow-textFunc">
            {performanceData ? (
              <div className="w-full overflow-x-auto">
                <h2 className="mb-2 text-xl font-semibold">Psychologist Performance</h2>
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-right">Total Consultations</th>
                      <th className="px-4 py-2 text-right">Unique Patients</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceData.map((psych) => (
                      <tr key={psych._id} className="border-b">
                        <td className="px-4 py-2">{psych.psychologistName}</td>
                        <td className="px-4 py-2 text-right">{psych.totalConsultations}</td>
                        <td className="px-4 py-2 text-right">{psych.uniquePatientsCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Loading psychologist performance data...</p>
            )}
          </div>
          {/* content */}
        </div>
      </div>
    </>
  );
};

export default PsychologistPerformance;
