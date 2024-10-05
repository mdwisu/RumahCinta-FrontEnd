import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarOwner from "../../../components/owner/SidebarOwner";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Daftarkan elemen Chart.js yang diperlukan
ChartJS.register(ArcElement, Tooltip, Legend);

const PatientReportPie = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const { open } = useSelector((state) => state.sidebar);
  const [activePage, setActivePage] = useState("Laporan Diagram Klient");

  useEffect(() => {
    const fetchConsultationData = async () => {
      try {
        const token = localStorage.getItem("token"); // Replace with actual token retrieval logic
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/histories/patient-consultation-data`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        const labels = data.map((item) => item.patientName);
        const consultationCounts = data.map((item) => item.consultationCount);

        setChartData({
          labels,
          datasets: [
            {
              label: "Consultation Count",
              data: consultationCounts,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultationData();
  }, []);

  return (
    <div className="flex">
      <SidebarOwner activePage={activePage} setActivePage={setActivePage} />
      <div className={`${open ? "ml-72" : "ml-20"} container-dashboard`}>
        <div className="flex-1 p-4">
          <h2 className="mb-2 text-xl font-semibold">Top Patients by Consultation Frequency</h2>
          <div style={{ width: "600px", margin: "auto" }}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Pie
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Patient Consultation Data",
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientReportPie;
