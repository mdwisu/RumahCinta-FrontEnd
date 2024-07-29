import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Sidebar from "../../../components/Admin/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function EditHistoryAdmin() {
  const [activePage, setActivePage] = useState("History");
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [consultationDate, setConsultationDate] = useState("");
  const [consultationTime, setConsultationTime] = useState("");
  const [personalData, setPersonalData] = useState("");
  const [privateNotes, setPrivateNotes] = useState("");

  const token = localStorage.getItem("token");
  const open = useSelector((state) => state.sidebar.open);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleGoBack = () => {
    navigate(-1);
  };

  // Helper function to format date to YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    const year = d.getFullYear();
    return [year, month, day].join("-");
  };

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/histories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const historyData = response.data;
        setPatientName(historyData.patientUserId.name);
        setPatientEmail(historyData.patientUserId.email);
        setNotes(historyData.notes);
        setDiagnosis(historyData.diagnosis);
        setTreatment(historyData.treatment);
        setConsultationTime(historyData.consultationTime);
        setConsultationDate(
          historyData.consultationDate ? formatDate(historyData.consultationDate) : formatDate(new Date()),
        );
        setPersonalData(historyData.personalData);
        setPrivateNotes(historyData.privateNotes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistoryData();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      method: "patch",
      url: `${process.env.REACT_APP_BASE_URL}/histories/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        notes,
        diagnosis,
        treatment,
        consultationTime,
        consultationDate,
        personalData,
        privateNotes,
      },
    };

    try {
      await axios.request(config);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data riwayat berhasil diperbarui!",
      });
      navigate("/admin/history");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat memperbarui data riwayat.",
      });
    }
  };

  return (
    <div className="flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className={`${open ? "ml-72" : "ml-20"} container-dashboard`}>
        <div>
          <h1 className="text-sizeTri font-bold text-textSec">Edit Riwayat</h1>
          <p className="my-3 text-textFunc">Dashboard / History / Edit</p>
        </div>
        <div className="mx-auto mt-5 w-full justify-center rounded-md bg-bgTri shadow-sm shadow-textFunc">
          <div className="p-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-2 block font-bold text-gray-700">
                  Pasien <span className="text-red-500">*</span>
                </label>
                <p>{patientName} - {patientEmail}</p>
              </div>
              <div className="mb-4">
                <label htmlFor="notes" className="mb-2 block font-bold text-gray-700">
                  Catatan <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="notes"
                  className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="diagnosis" className="mb-2 block font-bold text-gray-700">
                  Diagnosis <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="diagnosis"
                  className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  rows="3"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="treatment" className="mb-2 block font-bold text-gray-700">
                  Treatment <span className="text-red-500">*</span>
                </label>
                <select
                  id="treatment"
                  className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                >
                  <option value="">Pilih Treatment</option>
                  <option value="psikoedukasi">Psiko edukasi</option>
                  <option value="tespotensiakademik">Tes Potensi Akademik</option>
                  <option value="konsultasi">Konsultasi</option>
                  <option value="psikotes">Psikotes</option>
                  <option value="konseling">Konseling</option>
                  <option value="asesment">Asesment</option>
                  <option value="terapi">Terapi</option>
                  <option value="seminarparenting">Seminar Parenting</option>
                  <option value="observasidijagnostik">Observasi Diagnostik</option>
                  <option value="pelatihanpengembangandiri">Pelatihan Pengembangan Diri</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="consultationTime" className="mb-2 block font-bold text-gray-700">
                  Jam Konsultasi (optional)
                </label>
                <input
                  type="time"
                  id="consultationTime"
                  className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  value={consultationTime}
                  onChange={(e) => setConsultationTime(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="consultationDate" className="mb-2 block font-bold text-gray-700">
                  Tanggal Konsultasi (optional)
                </label>
                <input
                  type="date"
                  id="consultationDate"
                  className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  value={consultationDate}
                  onChange={(e) => setConsultationDate(e.target.value)}
                  placeholder={formatDate(new Date())} // Set placeholder with current date
                />
              </div>
              <div className="mb-4">
                <label htmlFor="personalData" className="mb-2 block font-bold text-gray-700">
                  Data Pribadi (Optional)
                </label>
                <textarea
                  id="personalData"
                  className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  rows="3"
                  value={personalData}
                  onChange={(e) => setPersonalData(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="privateNotes" className="mb-2 block font-bold text-gray-700">
                  Catatan Pribadi (optional)
                </label>
                <textarea
                  id="privateNotes"
                  className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  rows="3"
                  value={privateNotes}
                  onChange={(e) => setPrivateNotes(e.target.value)}
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="mt-2 w-[100px] rounded-md bg-bgFunc px-4 py-2 text-white hover:bg-bgFunc3 focus:outline-none focus:ring focus:ring-gray-300"
                  onClick={handleGoBack}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditHistoryAdmin;
