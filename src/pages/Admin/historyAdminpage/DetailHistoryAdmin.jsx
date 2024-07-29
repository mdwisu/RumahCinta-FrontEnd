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
  // Function to format time from "HH:mm:ss" to "HH:mm"
  const formatTime = (timeString) => {
    if (!timeString) return "Jam konsultasi tidak tersedia";
    const [hours, minutes] = timeString.split(":");
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  };

  // Function to format date to include day
  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal konsultasi tidak tersedia";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const treatmentMap = {
    psikoedukasi: "Psiko edukasi",
    tespotensiakademik: "Tes Potensi Akademik",
    konsultasi: "Konsultasi",
    psikotes: "Psikotes",
    konseling: "Konseling",
    asesment: "Asesment",
    terapi: "Terapi",
    seminarparenting: "Seminar Parenting",
    observasidijagnostik: "Observasi Dijagnostik",
    pelatihanpengembangandiri: "Pelatihan Pengembangan Diri",
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
                {/* <div className="mb-4">
                  <label className="mb-2 block font-bold text-gray-700">ID Klient</label>
                  <p>{history.patientUserId ? history.patientUserId._id : "User telah dihapus"}</p>
                </div> */}
                <div className="mb-4">
                  <label className="mb-2 block font-bold text-gray-700">Klient</label>
                  <p>
                    {history.patientUserId ? (
                      <>
                        {history.patientUserId.name} - {history.patientUserId.email}
                      </>
                    ) : (
                      "User tidak ditemukan"
                    )}
                  </p>
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
                  <label className="mb-2 block font-bold text-gray-700">Treatment</label>
                  <p>{treatmentMap[history.treatment] || "-"}</p>
                </div>
                <div className="mb-4">
                  <label className="mb-2 block font-bold text-gray-700">Jam Konsultasi</label>
                  <p>{formatTime(history.consultationTime)}</p>
                </div>
                <div className="mb-4">
                  <label className="mb-2 block font-bold text-gray-700">Tanggal Konsultasi</label>
                  <p>{formatDate(history.consultationDate)}</p>
                </div>
                <div className="mb-4">
                  <label className="mb-2 block font-bold text-gray-700">Data Pribadi</label>
                  <p>{history.personalData ? history.personalData : "Tidak ada data pribadi"}</p>
                </div>
                <div className="mb-4">
                  <label className="mb-2 block font-bold text-gray-700">Catatan Pribadi</label>
                  <p>{history.privateNotes ? history.privateNotes : "Tidak ada catatan pribadi"}</p>
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
