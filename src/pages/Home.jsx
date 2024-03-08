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
import ImgSmile2 from "../image/smile2.png";
import anggota1 from "../image/anggota1.png";
import anggota2 from "../image/anggota2.png";
import konsultasi1 from "../image/konsultasi1.png";
import konsultasi2 from "../image/konsultasi2.png";
import konsultasi3 from "../image/konsultasi3.png";
import konsultasi4 from "../image/konsultasi4.png";
import konsultasi5 from "../image/konsultasi5.png";

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
      <div className="overflow-hidden lg:h-auto">
        <Header />
        <Carousel />
      </div>
      {/* konsultasi daring atau langsung */}
      <section id="konsultasi">
        <div className="flex h-screen w-full flex-col bg-purple-500 pt-4">
          <h1 className="mt-10 self-center text-4xl font-bold text-white lg:text-5xl">konsultasi</h1>
          <h1 className="self-center rounded-lg bg-yellow-400 p-4 text-3xl font-bold text-primary lg:text-5xl">
            Daring / Langsung
          </h1>
          <p className="center self-center">Bimbingan Langsung Dari Ahli di Bidangnya dimana pun dan kapan pun</p>
          <div className="mt-32 flex justify-center bg-yellow-400">
            <div className="flex w-full flex-wrap justify-evenly">
              <img src={konsultasi1} alt="Gambar 1" className="mt-10 h-44 w-60 rounded-md lg:mb-10" />
              <img src={konsultasi2} alt="Gambar 2" className="mt-10 h-44 w-60 rounded-md" />
              <img src={konsultasi3} alt="Gambar 3" className="mt-10 h-44 w-60 rounded-md" />
              <img src={konsultasi4} alt="Gambar 4" className="mt-10 h-44 w-60 rounded-md" />
              <img src={konsultasi5} alt="Gambar 5" className="mt-10 h-44 w-60 rounded-md" />
            </div>
          </div>
        </div>
      </section>
      {/* end konsultasi daring atau langsung */}
      {/* slide 3 ketahuilah permasalahanmu */}
      <section class="flex h-screen w-full items-center justify-between rounded-lg bg-white p-8 shadow-lg">
        <div class="w-1/2 flex-1">
          <h1 class="text-4xl font-bold text-black">Ketahuilah Permasalahanmu</h1>
          <button class="mt-4 rounded bg-[#2A4674] px-4 py-2 text-white hover:bg-blue-600">BERSAMA KAMI</button>
          <p class="mt-4 text-gray-600">www.rumahcinta.com</p>
        </div>
        <div class="w-1/2 flex-1">
          <img src="gambar1.jpg" alt="Gambar 1" class="h-auto w-full rounded-lg" />
          <img src="gambar2.jpg" alt="Gambar 2" class="mt-4 h-auto w-full rounded-lg" />
        </div>
      </section>
      {/* end slide 3 ketahuilah permasalahanmu */}
      {/* !layanan */}
      <section id="layanan">
        <div class="relative flex min-h-screen flex-col items-center gap-4 overflow-hidden bg-yellow-500 lg:flex-row">
          <div class="flex-1">
            <div class="mb-4 pl-16 lg:pb-64">
              <h1 class="text-3xl font-bold lg:text-7xl">Layanan</h1>
              <p className="mt-10 w-3/4 text-2xl leading-relaxed">
                Tuliskan peraturan sederhana yang harus dipatuhi siswa untuk kelancaran proses belajar di kelas. Panduan
                singkat dan sederhana adalah yang terbaik.
              </p>
            </div>
          </div>
          <div class="flex-1">
            <div class="grid h-auto w-full grid-cols-1 grid-rows-5 items-center gap-6 px-10 text-center lg:grid-cols-2">
              <a href="/layanan/psikoedukasi" class="layanan-button bg-orange-400">
                Psiko Edukasi
              </a>
              <a href="#p" class="layanan-button bg-orange-400">
                Test Potensi Akademik
              </a>
              <a href="#p" class="layanan-button bg-green-400">
                Konsultasi
              </a>
              <a href="#p" class="layanan-button bg-green-400">
                Psikotes
              </a>
              <a href="#p" class="layanan-button bg-gray-400">
                Konseling
              </a>
              <a href="#p" class="layanan-button bg-gray-400">
                Asesmen
              </a>
              <a href="#p" class="layanan-button bg-blue-400">
                Terapi
              </a>
              <a href="#p" class="layanan-button bg-blue-400">
                Seminar Parenting
              </a>
              <a href="#p" class="layanan-button bg-red-300">
                Observasi Diagnostik
              </a>
              <a href="#p" class="layanan-button bg-red-300">
                Pelatihan Pengembangan Diri
              </a>
            </div>
          </div>
          <div class="absolute -bottom-28 left-8 col-span-2 row-start-5 flex items-end justify-start">
            <img width={650} src={ImgSmile2} alt="Gambar" />
          </div>
        </div>
      </section>
      {/* End Layanan */}
      {/* anggota tim */}
      <section className="flex min-h-screen flex-col bg-blue-900 text-center">
        <h1 className="mt-24 text-6xl font-bold text-yellow-500">Anggota Tim Rumah Cinta</h1>
        <div className="mt-8 flex flex-1 items-baseline justify-center">
          <div className="flex max-w-xs flex-col items-center">
            <img src={anggota1} alt="Foto Anggota 1" className="mb-4 h-48 w-48 rounded-md bg-yellow-500 object-cover" />
            <h3 className="w-56 text-lg font-semibold">
              Judul SumbRetno Lelyani Dewi, S.Psi, M.Pd., Psikolog Kliniser di Sini
            </h3>
            <p className="text-sm text-white">Deskripsi singkat mengenai Anggota 1</p>
          </div>
          <div className="flex max-w-xs flex-col items-center">
            <img src={anggota2} alt="Foto Anggota 2" className="mb-4 h-48 w-48 rounded-md bg-pink-300 object-cover" />
            <h3 className="w-56 text-lg font-semibold">Herly Novita Sari, M.Psi., Psikolog</h3>
            <p className="text-sm text-white">Deskripsi singkat mengenai Anggota 2</p>
          </div>
          <div className="flex max-w-xs flex-col items-center">
            <img src={anggota1} alt="Foto Anggota 3" className="mb-4 h-48 w-48 rounded-md bg-blue-300 object-cover" />
            <h3 className="w-56 text-lg font-semibold">Dra. Nino Suryani</h3>
            <p className="text-sm text-white">Deskripsi singkat mengenai Anggota 3</p>
          </div>
          <div className="flex max-w-xs flex-col items-center">
            <img src={anggota2} alt="Foto Anggota 4" className="mb-4 h-48 w-48 rounded-md bg-green-400 object-cover" />
            <h3 className="w-56 text-lg font-semibold">Laela Chusnaeni, S.Psi,. Psikolog</h3>
            <p className="text-sm text-white">Deskripsi singkat mengenai Anggota 4</p>
          </div>
        </div>
      </section>

      {/* end anggota tim */}
      <Footer />
    </>
  );
}

export default Home;
