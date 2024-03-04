import React, { useEffect } from "react";
import Foto7 from "../image2/7.png";
import CloudDown from "../image/cloud-red-down-Copy.svg";
import CloudUp from "../image/cloud-red-up.png";
import Chairs from "../image/8.png";
import StarYellow from "../image/star-yellow.png";
import Principal from "../image/7(1).png";
import Child from "../image2/25.png";
import Train from "../image2/24.png";
import RegisPsikolog from "../image/daftarpsikolog.png";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ContactAndLocation from "../components/contactAndLocation";
import Carousel from "../components/Carousel";
import LogoRumahCinta2 from "../image/logo-hori2.png";
import ImgSmile from "../image/smile.png";
import ImgSmile2 from "../image/image1.svg";

function Home() {
  const token = useSelector((state) => state.auth.token);
  console.log("ini token di halaman home", token);
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRegisPsikolog = async () => {
    if (authState.isLogin === false) {
      try {
        // Tampilkan pesan kesalahan menggunakan SweetAlert atau cara lain sesuai preferensi Anda
        const result = await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You need to login first!",
          showCancelButton: true,
          cancelButtonText: "Cancel",
          confirmButtonText: "Go to login",
        });

        if (result.isConfirmed) {
          navigate("/login"); // Navigasi ke halaman login jika pengguna memilih "Go to login"
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/register/psikolog");
    }
  };
  return (
    <>
      <ContactAndLocation />
      <div className="mb-5 overflow-hidden lg:mb-0 lg:h-screen">
        <Header />
        <Carousel />
      </div>
      <div className="flex flex-col flex-wrap items-center px-4 lg:flex-row lg:p-10">
        {/* Kolom Pertama */}
        <div className="flex w-full flex-col items-center justify-center lg:w-1/2">
          <img src={LogoRumahCinta2} alt="Logo Rumah Cinta" className="mb-4 h-auto w-1/2 lg:mb-0 lg:w-full" />{" "}
          {/* Menggunakan w-full untuk memenuhi lebar kolom di perangkat kecil */}
          <p className="text-center text-lg">
            Selamat datang di Rumah Cinta Solusi Psikologi Klinis dan Terapi Mental
          </p>{" "}
          {/* Menambahkan ukuran teks yang lebih besar */}
        </div>
        {/* Kolom Kedua */}
        <div className="-right-20 items-center justify-center sm:absolute sm:w-56 lg:flex lg:w-1/2">
          <img src={ImgSmile} alt="Gambar Smile" className="h-auto w-auto lg:h-96" /> {/* Menyesuaikan tinggi gambar */}
        </div>
      </div>
      <div class="relative flex h-screen flex-col items-center gap-4 lg:flex-row lg:px-8">
        <div class="flex-1">
          <div class="mb-4">
            <h1 class="text-7xl font-bold">Layanan</h1>
            <p className="mt-3 w-3/4">
              Tuliskan peraturan sederhana yang harus dipatuhi siswa untuk kelancaran proses belajar di kelas. Panduan
              singkat dan sederhana adalah yang terbaik.
            </p>
          </div>
        </div>
        <div class="flex-1">
          <div class="grid grid-cols-2 grid-rows-5 items-center gap-3 text-center">
            <a href="#" class="w-5/6 rounded-3xl bg-blue-500 py-6 font-bold text-white hover:bg-blue-700">
              Psiko Edukasi
            </a>
            <a href="#" class="w-5/6 rounded bg-blue-500 py-6 font-bold text-white hover:bg-blue-700">
              Psiko Edukasi
            </a>
            <a href="#" class="w-5/6 rounded bg-blue-500 py-6 font-bold text-white hover:bg-blue-700">
              Psiko Edukasi
            </a>
            <a href="#" class="w-5/6 rounded bg-blue-500 py-6 font-bold text-white hover:bg-blue-700">
              Psiko Edukasi
            </a>
            <a href="#" class="w-5/6 rounded bg-blue-500 py-6 font-bold text-white hover:bg-blue-700">
              Psiko Edukasi
            </a>
            <a href="#" class="w-5/6 rounded bg-blue-500 py-6 font-bold text-white hover:bg-blue-700">
              Psiko Edukasi
            </a>
            <a href="#" class="w-5/6 rounded bg-blue-500 py-6 font-bold text-white hover:bg-blue-700">
              Psiko Edukasi
            </a>
            <a href="#" class="w-5/6 rounded bg-blue-500 py-6 font-bold text-white hover:bg-blue-700">
              Psiko Edukasi
            </a>
            <a href="#" class="w-5/6 rounded bg-blue-500 py-6 font-bold text-white hover:bg-blue-700">
              Psiko Edukasi
            </a>
            <a href="#" class="w-5/6 rounded bg-blue-500 py-6 font-bold text-white hover:bg-blue-700">
              Psiko Edukasi
            </a>
          </div>
        </div>
        <div class="absolute left-8 bottom-3 col-span-2 row-start-5 flex items-end justify-start">
          <img class="w-72" src={ImgSmile2} alt="Gambar" />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
