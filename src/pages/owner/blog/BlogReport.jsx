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
import { useSelector } from "react-redux";
import SidebarOwner from "../../../components/owner/SidebarOwner";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BlogReport = () => {
  const [summary, setSummary] = useState(null);
  const [topAuthors, setTopAuthors] = useState([]);
  const [trends, setTrends] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("Laporan Blog");
  const { open } = useSelector((state) => state.sidebar);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const baseUrl = process.env.REACT_APP_BASE_URL;

        const [summaryRes, authorsRes, trendsRes, recentRes] = await Promise.all([
          axios.get(`${baseUrl}/blog/summary`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${baseUrl}/blog/top-authors`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${baseUrl}/blog/trends`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${baseUrl}/blog/recent`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setSummary(summaryRes.data);
        setTopAuthors(authorsRes.data);
        setTrends(trendsRes.data);
        setRecentBlogs(recentRes.data);
      } catch (error) {
        console.error("Error fetching blog report data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="py-4 text-center">Loading blog report data...</div>;
  }

  const trendData = {
    labels: trends.map((item) => item._id),
    datasets: [
      {
        label: "Blog Posts",
        data: trends.map((item) => item.count),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="flex">
      <SidebarOwner activePage={activePage} setActivePage={setActivePage} />
      <div className={`${open ? "ml-72" : "ml-20"} container-dashboard`}>
        <h2 className="mb-4 text-xl font-semibold">Blog Report</h2>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded bg-white p-4 shadow">
            <h3 className="mb-2 font-semibold">Summary</h3>
            <p>Total Blogs: {summary.blogCount}</p>
            <p>Total Authors: {summary.authorCount}</p>
          </div>

          <div className="rounded bg-white p-4 shadow">
            <h3 className="mb-2 font-semibold">Top Authors</h3>
            <ul>
              {topAuthors.map((author, index) => (
                <li key={index}>
                  {author._id}: {author.count} posts
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-4 rounded bg-white p-4 shadow">
          <h3 className="mb-2 font-semibold">Blog Trends</h3>
          <Line data={trendData} />
        </div>

        <div className="rounded bg-white p-4 shadow">
          <h3 className="mb-2 font-semibold">Recent Blogs</h3>
          <ul>
            {recentBlogs.map((blog, index) => (
              <li key={index}>
                {blog.title} by {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogReport;
