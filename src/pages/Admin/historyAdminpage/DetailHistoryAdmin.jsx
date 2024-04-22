import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Sidebar from "../../../components/Admin/Sidebar";
import { useParams, Link } from "react-router-dom";
import Loading from "../../../components/Loading";

function DetailHistoryAdmin() {
  const [activePage, setActivePage] = useState("History");
  const [history, setHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const open = useSelector((state) => state.sidebar.open);
  const { id } = useParams();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/histories/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.request(config);
      setHistory(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className={`${open ? "ml-72" : "ml-20"} container-dashboard`}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div>
              <h1 className="text-sizeTri font-bold text-textSec">Detail Riwayat</h1>
              <p className="my-3 text-textFunc">Dashboard / History / Detail</p>
            </div>
            <div className="mx-auto mt-5 w-full justify-center rounded-md bg-bgTri shadow-sm shadow-textFunc">
              <div className="p-5">
                <div className="mb-4">
                  <label className="mb-2 block font-bold text-gray-700">ID Pasien</label>
                  <p>{history.patientUserId._id}</p>
                </div>
                <div className="mb-4">
                  <label className="mb-2 block font-bold text-gray-700">Catatan</label>
                  <p>{history.notes}</p>
                </div>
                <div className="mb-4">
                  <label className="mb-2 block font-bold text-gray-700">Diagnosis</label>
                  <p>{history.diagnosis}</p>
                </div>
                <div className="mb-4">
                  <label className="mb-2 block font-bold text-gray-700">Resep</label>
                  <p>{history.prescription}</p>
                </div>
                <div className="mb-4">
                  <label className="mb-2 block font-bold text-gray-700">Tanggal Konsultasi</label>
                  <p>{new Date(history.consultationDate).toLocaleDateString()}</p>
                </div>
                <div className="mb-4">
                  <label className="mb-2 block font-bold text-gray-700">Data Pribadi</label>
                  <p>{history.personalData}</p>
                </div>
                <div className="mb-4">
                  <label className="mb-2 block font-bold text-gray-700">Catatan Pribadi</label>
                  <p>{history.privateNotes}</p>
                </div>
                <div className="mt-8">
                  <Link
                    to="/admin/history"
                    className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
                  >
                    Kembali
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DetailHistoryAdmin;
