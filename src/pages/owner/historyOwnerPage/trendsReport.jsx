import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import SidebarOwner from "../../../components/owner/SidebarOwner";
import { useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TrendsReport = () => {
  const [trendsData, setTrendsData] = useState(null);
  const { open } = useSelector((state) => state.sidebar);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    setLoading(true); // Set loading state to true when period changes
  };

  useEffect(() => {
    const fetchTrendsData = async () => {
      try {
        const token = localStorage.getItem("token");
        let url = `${process.env.REACT_APP_BASE_URL}/histories/trends-report`;
        if (selectedPeriod !== "all") {
          url += `?period=${selectedPeriod}`;
        }
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrendsData(response.data);
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error("Error fetching trends data:", error);
        setLoading(false); // Set loading state to false in case of error
      }
    };

    fetchTrendsData();
  }, [selectedPeriod]);

  const data = trendsData
    ? {
        labels: trendsData.map((item) => item.period),
        datasets: [
          {
            label: "Consultations",
            data: trendsData.map((item) => item.count),
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      }
    : {};

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Consultation Trends",
      },
    },
  };

  return (
    <div className="flex">
      <SidebarOwner />
      <div className="flex w-full flex-wrap gap-5 rounded-md p-5 shadow-sm">
        <div className={`${open ? "ml-72" : "ml-20"} container-dashboard`}>
          <div className="mb-5 flex gap-5">
            <button onClick={() => handlePeriodChange("daily")}>Daily</button>
            <button onClick={() => handlePeriodChange("weekly")}>Weekly</button>
            <button onClick={() => handlePeriodChange("monthly")}>Monthly</button>
            <button onClick={() => handlePeriodChange("all")}>All Time</button>
          </div>
          {loading ? (
            <p>Loading trends data...</p>
          ) : (
            <div>
              <h2 className="mb-2 text-xl font-semibold">Consultation Trends</h2>
              <Line data={data} options={options} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendsReport;
