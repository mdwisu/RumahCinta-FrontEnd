import React, { useEffect, useState } from "react";
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
// image ketahuilah permasalahanmu
import dudukkiri from "../image-home/duduk-kiri.png";
import dudukkanan from "../image-home/duduk-kanan.png";
import ketahui1 from "../image-home/bersamakami1.png";
import axios from "axios";
// image vido
import imgVideo from "../image-video/default.png";
import FloatingIcons from "../components/FloatingIcons";
import { BsThreeDots } from "react-icons/bs";

function Home() {
  const token = useSelector((state) => state.auth.token);
  const [blogs, setBlogs] = useState([]);
  const [videos, setVideos] = useState([]);
  console.log("ini token di halaman home", token);
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    // window.scrollTo(0, 0);
    makeRequest();
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
  let configLatestBlog = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BASE_URL}/blog/latest`,
    headers: {},
  };
  let configLatestVideo = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:5000/video/latest",
  };

  async function makeRequest() {
    try {
      const responseBlog = await axios.request(configLatestBlog);
      const responseVideo = await axios.request(configLatestVideo);
      setBlogs(responseBlog.data);
      setVideos(responseVideo.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Fungsi untuk memotong teks sesuai panjang maksimal yang diinginkan
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + "...";
  };

  return (
    <>
      <Header />
      <div className="block md:hidden">
        <ContactAndLocation />
      </div>
      <div className="hidden md:block">
        <FloatingIcons />
      </div>
      <div className="overflow-hidden lg:h-auto">
        <Carousel />
      </div>
      {/* konsultasi daring atau langsung */}
      <section id="konsultasi">
        <div className="flex w-full flex-col bg-purple-500 pt-4 lg:min-h-screen">
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
      <section className="flex w-full items-center justify-between overflow-hidden rounded-lg bg-white p-8 shadow-lg lg:min-h-screen">
        <div className="w-1/2 flex-1">
          <h1 className="text-4xl font-bold text-black">Ketahuilah Permasalahanmu</h1>
          <button className="mt-4 rounded bg-[#2A4674] px-4 py-2 text-white hover:bg-blue-600">BERSAMA KAMI</button>
          <p className="mt-4 text-gray-600">www.rumahcinta.com</p>
        </div>
        <div className="relative flex w-1/2 flex-1 flex-row">
          <img src={ketahui1} alt="Gambar 1" className="absolute -left-20 -top-20 h-48 w-48 rounded-lg" />
          <img src={dudukkiri} alt="Gambar 1" className="h-auto w-[400px] rounded-lg" />
          <img src={dudukkanan} alt="Gambar 2" className="mt-4 h-auto w-80 rounded-lg" />
        </div>
      </section>
      {/* end slide 3 ketahuilah permasalahanmu */}
      {/* !layanan */}
      <section id="layanan">
        <div className="relative flex flex-col items-center gap-4 overflow-hidden bg-yellow-500 py-6 lg:min-h-screen lg:flex-row">
          <div className="flex-1">
            <div className="mb-4 pl-16 lg:pb-64">
              <h1 className="text-4xl font-bold lg:text-7xl">Layanan</h1>
              <p className="mt-10 w-3/4 text-base leading-relaxed sm:text-xl lg:text-2xl">
                Tuliskan peraturan sederhana yang harus dipatuhi siswa untuk kelancaran proses belajar di kelas. Panduan
                singkat dan sederhana adalah yang terbaik.
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="grid h-auto w-full grid-cols-1 grid-rows-5 items-center gap-6 px-10 text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
              <a href="/layanan/psiko-edukasi" className="layanan-button bg-orange-400">
                Psiko Edukasi
              </a>
              <a href="/layanan/potensi-akademik" className="layanan-button bg-orange-400">
                Test Potensi Akademik
              </a>
              <a href="/layanan/konsultasi" className="layanan-button bg-green-400">
                Konsultasi
              </a>
              <a href="/layanan/psikotes" className="layanan-button bg-green-400">
                Psikotes
              </a>
              <a href="/layanan/konseling" className="layanan-button bg-gray-400">
                Konseling
              </a>
              <a href="/layanan/asesmen" className="layanan-button bg-gray-400">
                Asesmen
              </a>
              <a href="/layanan/terapi" className="layanan-button bg-blue-400">
                Terapi
              </a>
              <a href="/layanan/seminar-parenting" className="layanan-button bg-blue-400">
                Seminar Parenting
              </a>
              <a href="/layanan/observasi-diagnostik" className="layanan-button bg-red-300">
                Observasi Diagnostik
              </a>
              <a href="/layanan/pengembangan-diri" className="layanan-button bg-red-300">
                Pelatihan Pengembangan Diri
              </a>
            </div>
          </div>
          <div className="absolute -bottom-28 left-8 col-span-2 row-start-5 flex items-end justify-start">
            <img className="w-96 lg:w-[650px] " src={ImgSmile2} alt="Gambar" />
          </div>
        </div>
      </section>
      {/* End Layanan */}
      {/* blogTime */}
      <section className="relative flex flex-col items-center md:w-full lg:min-h-screen lg:pb-20">
        <h1 className="text-3xl font-bold md:mb-0 md:mr-8 lg:my-16 lg:mt-10 lg:text-7xl">BlogTime</h1>
        <div className="flex flex-1 flex-wrap items-center justify-center">
          {blogs.map((blog, index) => (
            <div className="mx-4 mb-8 max-w-xs rounded-2xl bg-yellow-400 shadow-md">
              <div className="p-4">
                <h2 className="line-clamp-3 mb-2 min-h-[5rem] items-center justify-center text-xl font-semibold">
                  {blog.title}
                </h2>
                <p className="line-clamp-6 text-gray-700">{blog.description}</p>
                <img
                  className="h-48 w-full rounded-md rounded-t-lg object-cover"
                  src={
                    blog.thumbnail
                      ? `${process.env.REACT_APP_BASE_URL}${blog.thumbnail}`
                      : "hthttps://via.placeholder.com/400x300.png?text=No+Image"
                  }
                  alt="Blog img"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300.png?text=No+Image";
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <a href="/blog" className="absolute right-9 bottom-3">
          <BsThreeDots className="h-20 w-20" />
        </a>
      </section>
      {/* end BlogTime */}
      {/* VideoTime */}
      <div className="relative min-h-screen bg-green-500 p-8 text-center lg:pb-20">
        <h1 className="mb-8 text-3xl font-bold text-white lg:text-7xl">VideoTime</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {videos.map((video, index) => (
            <Link
              to={`/videos/${video.id}`}
              className="flex max-w-xs flex-col rounded-xl bg-white p-4 sm:w-full sm:max-w-lg sm:flex-row"
              key={index}
            >
              {/* Gambar di sebelah kiri */}
              <div className="mb-4 flex flex-1 items-center sm:mb-0 sm:mr-4">
                <img
                  src={`https://img.youtube.com/vi/${video.videoLink}/maxresdefault.jpg`}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-auto w-[300px] rounded-md lg:w-[600px]"
                />
              </div>
              {/* Tulisan di sebelah kanan */}
              <div className="flex flex-1 flex-col">
                <h2 className="line-clamp-2 text-xl font-bold">{video.title}</h2>
                <p className="line-clamp-3 text-xs text-gray-600">{video.description}</p>
                {/* Tambahkan elemen lainnya sesuai kebutuhan */}
              </div>
            </Link>
          ))}
        </div>
        <a href="/video" className="absolute right-9 bottom-3 z-10">
          <BsThreeDots className="h-20 w-20 text-black" />
        </a>
      </div>
      {/* end VideoTime */}
      {/* anggota tim */}
      <section className="flex flex-col bg-blue-900 text-center lg:min-h-screen">
        <h1 className="mt-24 text-6xl font-bold text-yellow-500">Anggota Tim Rumah Cinta</h1>
        <div className="mt-8 flex flex-1 flex-wrap items-baseline justify-center">
          <div className="flex max-w-xs flex-col items-center">
            <img src={anggota1} alt="Foto Anggota 1" className="mb-4 h-48 w-48 rounded-md bg-yellow-500 object-cover" />
            <h3 className="min-h-[6rem] w-56 text-lg font-semibold">
              Retno Lelyani Dewi, S.Psi, M.Pd., Psikolog Kliniser di Sini
            </h3>
            <p className="text-sm text-white">Deskripsi singkat mengenai Anggota 1</p>
          </div>
          <div className="flex max-w-xs flex-col items-center">
            <img src={anggota2} alt="Foto Anggota 2" className="mb-4 h-48 w-48 rounded-md bg-pink-300 object-cover" />
            <h3 className="min-h-[6rem] w-56 text-lg font-semibold">Herly Novita Sari, M.Psi., Psikolog</h3>
            <p className="text-sm text-white">Deskripsi singkat mengenai Anggota 2</p>
          </div>
          <div className="flex max-w-xs flex-col items-center">
            <img src={anggota1} alt="Foto Anggota 3" className="mb-4 h-48 w-48 rounded-md bg-blue-300 object-cover" />
            <h3 className="min-h-[6rem] w-56 text-lg font-semibold">Dra. Nino Suryani</h3>
            <p className="text-sm text-white">Deskripsi singkat mengenai Anggota 3</p>
          </div>
          <div className="flex max-w-xs flex-col items-center">
            <img src={anggota2} alt="Foto Anggota 4" className="mb-4 h-48 w-48 rounded-md bg-green-400 object-cover" />
            <h3 className="min-h-[6rem] w-56 text-lg font-semibold">Laela Chusnaeni, S.Psi,. Psikolog</h3>
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
