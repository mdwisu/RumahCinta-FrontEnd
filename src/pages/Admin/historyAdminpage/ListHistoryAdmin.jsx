import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Sidebar from "../../../components/Admin/Sidebar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function ListHistoryAdmin() {
  const [activePage, setActivePage] = useState("Riwayat Kunjungan");
  const [histories, setHistories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const token = localStorage.getItem("token");
  const open = useSelector((state) => state.sidebar.open);

  useEffect(() => {
    fetchHistories();
  }, []);

  const fetchHistories = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/histories`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.request(config);
      setHistories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHistory = async (id) => {
    try {
      const config = {
        method: "delete",
        url: `${process.env.REACT_APP_BASE_URL}/histories/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Anda tidak dapat mengembalikan data yang telah dihapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.request(config);
          setHistories((prevHistories) => prevHistories.filter((history) => history._id !== id));
          Swal.fire("Dihapus!", "Data riwayat telah dihapus.", "success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const formatDate = (date) => {
    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

  const filteredHistories = histories
    .filter((history) => {
      if (history.patientUserId) {
        const patientName = history.patientUserId.name.toLowerCase();
        const patientEmail = history.patientUserId.email.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();
        return patientName.includes(searchTermLower) || patientEmail.includes(searchTermLower);
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.consultationDate) - new Date(b.consultationDate);
      } else {
        return new Date(b.consultationDate) - new Date(a.consultationDate);
      }
    });

  return (
    <div className="flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      {/* Content */}
      <div className={`${open ? "ml-72" : "ml-20"} container-dashboard`}>
        {/* judul */}
        <div>
          <h1 className="text-sizeTri font-bold text-textSec">History</h1>
          <p className="my-3 text-textFunc">Dashboard / History</p>
        </div>
        {/* judul */}
        {/* content */}
        <div className="mx-auto mt-5 w-full justify-center rounded-md bg-bgTri shadow-sm shadow-textFunc">
          <div className="flex items-center justify-between px-5 pt-5">
            <div className="flex items-center space-x-4">
              <Link
                id="addHistory"
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
                type="button"
                to={"/admin/history/create-history"}
              >
                Tambah
              </Link>
              <input
                type="text"
                placeholder="Cari nama atau email pasien"
                value={searchTerm}
                onChange={handleSearch}
                className="w-64 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="">
            <div className="relative overflow-x-auto p-5">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-bgFunc3 text-center text-textOpt">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Pasien
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Psikolog
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tanggal
                      <button onClick={toggleSortOrder}>{sortOrder === "asc" ? "▲" : "▼"}</button>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistories.map((history, index) => (
                    <tr key={history._id} className="border-b bg-white">
                      <th scope="row" className="px-6 py-4 text-center">
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">
                        {history.patientUserId ? (
                          <>
                            {history.patientUserId.name} - {history.patientUserId.email}
                          </>
                        ) : (
                          "User tidak ditemukan"
                        )}
                      </td>
                      <td className="px-6 py-4">{history.psikologId.name}</td>
                      <td className="px-6 py-4">{formatDate(history.consultationDate)}</td>
                      <td className="flex gap-3 px-6 py-4">
                        <Link to={`/admin/history/${history._id}`} className="text-blue-500 hover:underline">
                          Detail
                        </Link>
                        <Link to={`/admin/history/${history._id}/edit`} className="text-yellow-500 hover:underline">
                          Edit
                        </Link>
                        <button onClick={() => deleteHistory(history._id)} className="text-red-500 hover:underline">
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* content */}
      </div>
      {/* Content */}
    </div>
  );
}

export default ListHistoryAdmin;
