import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import SidebarOwner from "../../../components/owner/SidebarOwner";

const SummaryReport = () => {
  const [activePage, setActivePage] = useState("Rangkuman laporan");
  const { open } = useSelector((state) => state.sidebar);
  const [summaryData, setSummaryData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/histories/summary-report`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSummaryData(response.data);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };

    fetchSummaryData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex">
        <SidebarOwner activePage={activePage} setActivePage={setActivePage} />
        {/* Content */}
        <div className={`${open ? "ml-72" : "ml-20"} container-dashboard`}>
          {/* judul */}
          <div>
            <h1 className="text-sizeTri font-bold text-textSec">Rangkuman Laporan</h1>
            <p className="my-3 text-textFunc">Rangkuman Laporan</p>
          </div>
          {/* judul */}
          {/* content */}
          <div className="flex w-full flex-wrap rounded-md bg-bgTri p-5 shadow-sm shadow-textFunc">
            {summaryData ? (
              <>
                <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
                  <div className="rounded-lg bg-white p-4 shadow">
                    <h2 className="mb-2 text-xl font-semibold">Total Konsultasi</h2>
                    <p className="text-3xl font-bold">{summaryData.totalConsultations}</p>
                  </div>
                  <div className="rounded-lg bg-white p-4 shadow">
                    <h2 className="mb-2 text-xl font-semibold">Klient Unik</h2>
                    <p className="text-3xl font-bold">{summaryData.uniquePatients}</p>
                  </div>
                  <div className="rounded-lg bg-white p-4 shadow">
                    <h2 className="mb-2 text-xl font-semibold">Psikolog Aktif</h2>
                    <p className="text-3xl font-bold">{summaryData.consultationsPerPsychologist.length}</p>
                  </div>
                </div>
                <div className="mt-5 w-full">
                  <h2 className="mb-2 text-xl font-semibold">Konsultasi per Psikolog</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="px-4 py-2 text-left">Name</th>
                          <th className="px-4 py-2 text-right">Consultations</th>
                        </tr>
                      </thead>
                      <tbody>
                        {summaryData.consultationsPerPsychologist.map((psych) => (
                          <tr key={psych._id} className="border-b">
                            <td className="px-4 py-2">{psych.psychologistName}</td>
                            <td className="px-4 py-2 text-right">{psych.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <p>Loading dashboard data...</p>
            )}
          </div>
          {/* content */}
        </div>
        {/* Content */}
      </div>
    </>
  );
};

export default SummaryReport;
