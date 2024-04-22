import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Sidebar from "../../../components/Admin/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function EditHistoryAdmin() {
  const [activePage, setActivePage] = useState("History");
  const [patientUserId, setPatientUserId] = useState("");
  const [notes, setNotes] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [consultationDate, setConsultationDate] = useState("");
  const [personalData, setPersonalData] = useState("");
  const [privateNotes, setPrivateNotes] = useState("");

  const token = localStorage.getItem("token");
  const open = useSelector((state) => state.sidebar.open);
  const navigate = useNavigate();
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
      const history = response.data;
      setPatientUserId(history.patientUserId);
      setNotes(history.notes);
      setDiagnosis(history.diagnosis);
      setPrescription(history.prescription);
      setConsultationDate(history.consultationDate);
      setPersonalData(history.personalData);
      setPrivateNotes(history.privateNotes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/histories/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        patientUserId,
        notes,
        diagnosis,
        prescription,
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
              {/* Form fields */}
              <div className="mb-4">
                <label htmlFor="patientUserId" className="mb-2 block font-bold text-gray-700">
                  ID Pasien
                </label>
                <input
                  type="text"
                  id="patientUserId"
                  className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  value={patientUserId}
                  onChange={(e) => setPatientUserId(e.target.value)}
                  required
                />
              </div>
              {/* ... form fields lainnya */}
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

export default EditHistoryAdmin;
