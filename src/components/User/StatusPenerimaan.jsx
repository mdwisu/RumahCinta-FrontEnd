import React, { useState } from "react";
import Sidebar from "./SidebarUser";
import { useSelector } from "react-redux";

function StatusPenerimaan() {
  const [activePage, setActivePage] = useState("Status Penerimaan");
  const authState = useSelector((state) => state.auth);
  const status = authState?.user?.psikologStatus || "Maaf anda tidak mendaftar menjadi psikolog";

  // const token = localStorage.getItem("token");
  // const [status, setStatus] = useState("Maaf anda tidak mendaftar menjadi psikolog");

  // useEffect(() => {
  //   fetchStatus();
  // }, []);

  // const fetchStatus = async () => {
  //   let config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: "http://localhost:5000/psikolog/status",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   try {
  //     const response = await axios.request(config);
  //     setStatus(response.data.status);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      {/* Content */}
      <div className="w-[1000px] mx-auto mt-10 justify-center">
        {/* judul */}
        <div>
          <h1 className="text-sizeTri text-textSec font-bold">Status Penerimaan</h1>
          <p className="my-3 text-textFunc">Dashboard / Status </p>
        </div>
        {/* judul */}
        {/* content */}

        <div className="w-[1000px] bg-bgTri mx-auto my-5 py-5 justify-center rounded-md shadow-sm shadow-textFunc">
          <div className="flex items-center justify-between px-5 text-textFunc">{status}</div>
        </div>
        {/* content */}
      </div>

      {/* Content */}
    </div>
  );
}

export default StatusPenerimaan;
