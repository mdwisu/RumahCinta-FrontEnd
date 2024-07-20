import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const CreateUserAdmin = () => {
  const [activePage, setActivePage] = useState("User");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("L");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const open = useSelector((state) => state.sidebar.open);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = JSON.stringify({
      name: name,
      email: email,
      password: password,
      role: role,
      date_birth: dateOfBirth,
      gender: gender,
      is_verified: true,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/user`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      Swal.fire({
        title: "Berhasil!",
        text: "Data user berhasil disimpan.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/admin/user");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className={`${open ? "ml-72" : "ml-20"} container-dashboard`}>
        {/* judul */}
        <div>
          <h1 className="text-sizeTri font-bold text-textSec">Tambah User</h1>
          <p className="my-3 text-textFunc">Dashboard / User / Tambah</p>
        </div>
        {/* judul */}
        {/* content */}
        <div className="mx-auto mt-5 w-full justify-center rounded-md bg-bgTri shadow-sm shadow-textFunc">
          <div className="p-5">
            <div className="flex-1">
              <div className="w-full">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <table className="w-full">
                    <tr>
                      <td className="py-3">
                        <label htmlFor="name" className="mb-1 block text-textSec">
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
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <label htmlFor="email" className="mb-1 block text-textSec">
                          Email
                        </label>
                      </td>
                      <td>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-md border py-2 px-2 focus:outline-none focus:ring focus:ring-blue-300"
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <label htmlFor="password" className="mb-1 block text-textSec">
                          Password
                        </label>
                      </td>
                      <td>
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full rounded-md border py-2 px-2 focus:outline-none focus:ring focus:ring-blue-300"
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <label htmlFor="role" className="mb-1 block text-textSec">
                          Role
                        </label>
                      </td>
                      <td>
                        <select
                          id="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full rounded-md border py-2 px-2 focus:outline-none focus:ring focus:ring-blue-300"
                          required
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                  
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <label htmlFor="dateOfBirth" className="mb-1 block text-textSec">
                          Tanggal Lahir
                        </label>
                      </td>
                      <td>
                        <input
                          type="date"
                          id="dateOfBirth"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          className="w-full rounded-md border py-2 px-2 focus:outline-none focus:ring focus:ring-blue-300"
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <label htmlFor="gender" className="mb-1 block text-textSec">
                          Jenis Kelamin
                        </label>
                      </td>
                      <td>
                        <select
                          id="gender"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full rounded-md border py-2 px-2 focus:outline-none focus:ring focus:ring-blue-300"
                          required
                        >
                          <option value="L">Laki-laki</option>
                          <option value="P">Perempuan</option>
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
                      type="button"
                      className="mt-2 w-[100px] rounded-md bg-bgFunc px-4 py-2 text-white hover:bg-bgFunc3 focus:outline-none focus:ring focus:ring-gray-300"
                      onClick={handleGoBack}
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

export default CreateUserAdmin;
