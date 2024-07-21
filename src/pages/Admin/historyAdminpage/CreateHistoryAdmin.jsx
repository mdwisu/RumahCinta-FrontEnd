import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Sidebar from "../../../components/Admin/Sidebar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AutoCompletePatient from "../../../components/Admin/AutoCompletePatient";

function CreateHistoryAdmin() {
  const [activePage, setActivePage] = useState("History");
  const [patientUserId, setPatientUserId] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/histories`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        patientUserId,
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
        text: "Data riwayat berhasil ditambahkan!",
      });
      navigate("/admin/history");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat menambahkan data riwayat.",
      });
    }
  };

  const handlePatientSelect = (patientId) => {
    setPatientUserId(patientId);
  };

  return (
    <div className="flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className={`${open ? "ml-72" : "ml-20"} container-dashboard`}>
        <div>
          <h1 className="text-sizeTri font-bold text-textSec">Tambah Riwayat</h1>
          <p className="my-3 text-textFunc">Dashboard / History / Tambah</p>
        </div>
        <div className="mx-auto mt-5 w-full justify-center rounded-md bg-bgTri shadow-sm shadow-textFunc">
          <div className="p-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="patientUserId" className="mb-2 block font-bold text-gray-700">
                  Pasien
                </label>
                <AutoCompletePatient onSelect={handlePatientSelect} />
              </div>
              <div className="mb-4">
                <label htmlFor="notes" className="mb-2 block font-bold text-gray-700">
                  Catatan
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
                  Diagnosis
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
                  Treatment
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

export default CreateHistoryAdmin;
