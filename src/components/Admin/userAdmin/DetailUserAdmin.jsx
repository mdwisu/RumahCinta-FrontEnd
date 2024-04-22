import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { formatDate } from "../../../util/Helper";
import { useSelector } from "react-redux";

const DetailUserAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [work, setWork] = useState("");
  const [isVerified, setIsVerified] = useState("");
  const [isPsikolog, setIsPsikolog] = useState("");

  const [activePage, setActivePage] = useState("User");
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const open = useSelector((state) => state.sidebar.open);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchUser = async () => {
      console.log("fetch is running");
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
        setProfileUrl(userData.profile);
        setDateOfBirth(userData.date_birth);
        setGender(userData.gender);
        setAge(userData.age);
        setWork(userData.work);
        setIsVerified(userData.is_verified);
        setIsPsikolog(userData.isPsikolog);
        console.log(userData);
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
          <h1 className="text-sizeTri font-bold text-textSec">Detail User</h1>
          <p className="my-3 text-textFunc">Dashboard / User / Detail</p>
        </div>
        {/* judul */}
        {/* content */}
        <div className="mx-auto mt-5 w-full justify-center rounded-md bg-bgTri shadow-sm shadow-textFunc">
          <div className="p-5">
            <div className="flex-1">
              <div className="w-full ">
                <form className="space-y-4">
                  <table className="w-full">
                    <tr>
                      <td className="py-3">
                        <label htmlFor="name" className="mb-1 block text-textSec">
                          Nama
                        </label>
                      </td>
                      <td className="">
                        <p
                          type="text"
                          id="name"
                          className="w-full rounded-md border py-2 px-2 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                          : {name}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <label htmlFor="email" className="mb-1 block text-textSec">
                          Email
                        </label>
                      </td>
                      <td className="">
                        <p
                          type="text"
                          id="email"
                          className="w-full rounded-md border py-2 px-2 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                          : {email}{" "}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <label htmlFor="profileUrl" className="mb-1 block text-textSec">
                          Profile Url
                        </label>
                      </td>
                      <td className="">
                        <p
                          type="text"
                          id="profileUrl"
                          className="w-full rounded-md border px-2 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                          : {profileUrl}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <label htmlFor="videoLink" className="mb-1 block text-textSec">
                          Tanggal Lahir
                        </label>
                      </td>
                      <td className="">
                        <p
                          type="date"
                          id="dateOfBirth"
                          className="w-full rounded-md border px-2 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                          : {formatDate(dateOfBirth)}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <label htmlFor="gender" className="mb-1 block text-textSec">
                          Jenis Kelamin
                        </label>
                      </td>
                      <td className="">
                        <p
                          type="text"
                          id="gender"
                          className="w-full rounded-md border px-2 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                          : {gender}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <label htmlFor="role" className="mb-1 block text-textSec">
                          Role
                        </label>
                      </td>
                      <td className="">
                        <p
                          type="text"
                          id="role"
                          className="w-full rounded-md border px-2 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                          : {role}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <label htmlFor="isVerified" className="mb-1 block text-textSec">
                          isVerified
                        </label>
                      </td>
                      <td>
                        <p
                          type="isVerified"
                          id="isVerified"
                          className="w-full  rounded-md border px-2 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                          {isVerified ? (
                            <FaCheckCircle className="text-green-500" />
                          ) : (
                            <FaTimesCircle className="text-red-500" />
                          )}
                        </p>
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
                      className="mt-2 w-[100px] rounded-md bg-bgOpt2 px-4 py-2 text-white hover:bg-bgOpt focus:outline-none focus:ring focus:ring-gray-300"
                    >
                      Kembali
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

export default DetailUserAdmin;
