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

const VideoReport = () => {
  const [summary, setSummary] = useState(null);
  const [topAuthors, setTopAuthors] = useState([]);
  const [trends, setTrends] = useState([]);
  const [recentVideos, setRecentVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("Laporan Video");
  const { open } = useSelector((state) => state.sidebar);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const baseUrl = process.env.REACT_APP_BASE_URL;

        const [summaryRes, authorsRes, trendsRes, recentRes] = await Promise.all([
          axios.get(`${baseUrl}/video/summary`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${baseUrl}/video/top-authors`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${baseUrl}/video/trends`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${baseUrl}/video/recent`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setSummary(summaryRes.data);
        setTopAuthors(authorsRes.data);
        setTrends(trendsRes.data);
        setRecentVideos(recentRes.data);
      } catch (error) {
        console.error("Error fetching video report data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="py-4 text-center">Loading video report data...</div>;
  }

  const trendData = {
    labels: trends.map((item) => item._id),
    datasets: [
      {
        label: "Video Posts",
        data: trends.map((item) => item.count),
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="flex">
      <SidebarOwner activePage={activePage} setActivePage={setActivePage} />
      <div className={`${open ? "ml-72" : "ml-20"} container-dashboard`}>
        <h2 className="mb-4 text-xl font-semibold">Video Report</h2>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded bg-white p-4 shadow">
            <h3 className="mb-2 font-semibold">Summary</h3>
            <p>Total Videos: {summary.videoCount}</p>
            <p>Total Authors: {summary.authorCount}</p>
          </div>

          <div className="rounded bg-white p-4 shadow">
            <h3 className="mb-2 font-semibold">Top Authors</h3>
            <ul>
              {topAuthors.map((author, index) => (
                <li key={index}>
                  {author._id}: {author.count} videos
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-4 rounded bg-white p-4 shadow">
          <h3 className="mb-2 font-semibold">Video Trends</h3>
          <Line data={trendData} />
        </div>

        <div className="rounded bg-white p-4 shadow">
          <h3 className="mb-2 font-semibold">Recent Videos</h3>
          <ul>
            {recentVideos.map((video, index) => (
              <li key={index}>
                {video.title} by {video.author} on {new Date(video.createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VideoReport;
