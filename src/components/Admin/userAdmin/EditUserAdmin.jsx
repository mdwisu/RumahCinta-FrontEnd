import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { formatDate, formatDate2, splitDate } from "../../../util/Helper";
import { useSelector } from "react-redux";

const EditUserAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [isPsikolog, setIsPsikolog] = useState("");
  const [activePage, setActivePage] = useState("User");
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const open = useSelector((state) => state.sidebar.open);

  const handleGoBack = () => {
    navigate(-1);
  };
  console.log(dateOfBirth);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      dateOfBirth,
      gender,
      isPsikolog,
      role,
    };

    try {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/user/${id}`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response);
          navigate(`/admin/user`);
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
        setRole(userData.role);
        setProfileUrl(userData.profileUrl);
        setDateOfBirth(formatDate2(userData.date_birth));
        setGender(userData.gender);
        setIsPsikolog(userData.isPsikolog);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [id, token]);

  return (
    <div className="flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className={`${open ? "ml-72" : "ml-20"} container-dashboard`}>
        {/* judul */}
        <div>
          <h1 className="text-sizeTri font-bold text-textSec">Edit User</h1>
          <p className="my-3 text-textFunc">Dashboard / User / Edit</p>
        </div>
        {/* judul */}
        {/* content */}
        <div className="mx-auto mt-5 w-full justify-center rounded-md bg-bgTri shadow-sm shadow-textFunc">
          <div className="p-5">
            <div className="flex-1">
              <div className="w-full ">
                <form onSubmit={handleUpdate} className="space-y-4">
                  <table className="w-full">
                    <tr>
                      <td className="py-3">
                        <label htmlFor="title" className="mb-1 block text-textSec">
                          Nama
                        </label>
                      </td>
                      <td className="">
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded-md border py-2 px-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <label htmlFor="author" className="mb-1 block text-textSec">
                          Email
                        </label>
                      </td>
                      <td className="">
                        <input
                          type="text"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-md border py-2 px-2 focus:outline-none focus:ring focus:ring-blue-300"
                          disabled
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <label htmlFor="videoLink" className="mb-1 block text-textSec">
                          Tanggal Lahir
                        </label>
                      </td>
                      <td className="">
                        <input
                          type="date"
                          id="dateOfBirth"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          className="w-full rounded-md border px-2 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <label htmlFor="gender" className="mb-1 block text-textSec">
                          Jenis Kelamin
                        </label>
                      </td>
                      <td className="">
                        <select
                          id="gender"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full rounded-md border px-2 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                          <option value="Laki-laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </select>
                      </td>
                    </tr>
                  </table>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      position: "relative",
                    }}
                    className="flex flex-wrap gap-2 p-5"
                  >
                    <button
                      onClick={handleGoBack}
                      type="button"
                      className="mt-2 w-[100px] rounded-md bg-bgFunc px-4 py-2 text-white hover:bg-bgFunc3 focus:outline-none focus:ring focus:ring-gray-300"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="mt-2 w-[100px] rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* content */}
      </div>
    </div>
  );
};

export default EditUserAdmin;
