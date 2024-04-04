import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { FaUserCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile() {
  const authState = useSelector((state) => state.auth);
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  // // Cek apakah authState atau authState.user ada sebelum mengakses propertinya
  // const userName = authState?.user?.name || "Guest";
  // const dateOfBirth = authState?.user?.date_birth || "N/A";
  // const gender = authState?.user?.gender || "N/A";
  // const email = authState?.user?.email || "N/A";
  // const role = authState?.user?.role || "N/A";
  // const isVerified = authState?.user?.is_verified || false;
  // Cek apakah authState atau authState.user ada sebelum mengakses propertinya
  const userName = user?.name || "Guest";
  const dateOfBirth = user?.date_birth || "N/A";
  const gender = user?.gender || "N/A";
  const email = user?.email || "N/A";
  const role = user?.role || "N/A";
  const isVerified = user?.is_verified || false;

  return (
    <div>
      <Header />
      <div className="mx-10 mt-32 mb-10">
        <div className="flex items-center justify-center gap-10">
          {/* Isi Card Pertama */}
          <div className="bg-lightgray ml-10  w-1/3 rounded-lg border border-textFunc">
            <div className="w-full  ">
              <div className="rounded-lg bg-bgFunc3">
                <h1 className="py-2.5 px-4 text-[20px] font-bold text-textOpt">Photo</h1>
              </div>
              <div className="my-[63px] flex w-full justify-center text-[100px] text-textSec">
                <FaUserCircle />
              </div>
            </div>
          </div>
          {/* Isi Card PertamaclassName="px-3" */}
          {/* Isi Card Kedua */}
          <div className="bg-lightgray mr-10  w-2/3 rounded-lg border  border-textFunc">
            <div className="w-full  ">
              <div className="rounded-lg bg-bgFunc3">
                <h1 className="py-2.5 px-4 text-[20px] font-bold text-textOpt">Identitas</h1>
              </div>
              <div className="my-5 mx-5 w-full text-textSec">
                <form>
                  <table>
                    <thead>
                      <tr>
                        <td className="p-3">Nama Lengkap</td>
                        <td className="p-3">:</td>
                        <td className="p-3">{userName}</td>
                      </tr>
                      <tr>
                        <td className="p-3">Tanggal Lahir</td>
                        <td className="p-3">:</td>
                        <td className="p-3">{dateOfBirth}</td>
                      </tr>
                      <tr>
                        <td className="p-3">Jenis Kelamin</td>
                        <td className="p-3">:</td>
                        <td className="p-3">{gender}</td>
                      </tr>
                    </thead>
                  </table>
                </form>
              </div>
            </div>
          </div>
          {/* Isi Card Kedua */}
        </div>
        <div className="flex justify-center gap-10 ">
          {/* Isi Card Pertama */}
          <div className="bg-lightgray ml-10  w-1/3 rounded-lg border  border-textFunc">
            <div className="w-full  ">
              <div className="rounded-lg bg-bgFunc3">
                <h1 className="py-2.5 px-4 text-[20px] font-bold text-textOpt">Motivasi</h1>
              </div>
              <div className="my-[40px] w-full flex-wrap items-center justify-center text-center text-textSec">
                <p>
                  Hello, {userName} <br /> Welcome to your profile page
                </p>
                <div>
                  <Link type="button" className="mt-3 rounded-md bg-bgOpt px-5 py-2 text-white hover:bg-bgOpt2">
                    Edit Profil
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Isi Card Pertama*/}
          {/* Isi Card Kedua */}
          <div className="bg-lightgray mr-10  w-2/3 rounded-lg border  border-textFunc">
            <div className="w-full  ">
              <div className="rounded-lg bg-bgFunc3">
                <h1 className="py-2.5 px-4 text-[20px] font-bold text-textOpt">Akun</h1>
              </div>
              <div className="my-5 mx-5 w-full text-textSec">
                <form>
                  <table>
                    <thead>
                      <tr>
                        <td className="p-3">Email</td>
                        <td className="p-3">:</td>
                        <td className="p-3">{email}</td>
                      </tr>
                      <tr>
                        <td className="p-3">Role</td>
                        <td className="p-3">:</td>
                        <td className="p-3">{role}</td>
                      </tr>
                      <tr>
                        <td className="p-3">Verified</td>
                        <td className="p-3">:</td>
                        <td className="p-3">
                          {isVerified ? (
                            <FaCheckCircle className="text-green-500" />
                          ) : (
                            <FaTimesCircle className="text-red-500" />
                          )}
                        </td>
                      </tr>
                    </thead>
                  </table>
                </form>
              </div>
            </div>
          </div>
          {/* Isi Card Kedua */}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
