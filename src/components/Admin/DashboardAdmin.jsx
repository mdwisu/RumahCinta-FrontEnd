import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const DashboardAdmin = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const { open } = useSelector((state) => state.sidebar);

  return (
    <>
      <div className="flex">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        {/* Content */}
        <div className={`${open ? "ml-72" : "ml-20"} container-dashboard`}>
          {/* judul */}
          <div>
            <h1 className="text-sizeTri font-bold text-textSec">Dashboard</h1>
            <p className="my-3 text-textFunc">Dashboard</p>
          </div>
          {/* judul */}
          {/* content */}
          <div className="flex w-full flex-wrap gap-5 rounded-md bg-bgTri p-5 shadow-sm shadow-textFunc">
            Halo admin
          </div>
          {/* content */}
        </div>
        {/* Content */}
      </div>
    </>
  );
};

export default DashboardAdmin;
