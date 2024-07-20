import React, { useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaHandHoldingHeart, FaFacebook, FaPaperPlane } from "react-icons/fa";
import Konsultan from "../../image2/32.png";
import Online from "../../image2/35.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import KonsultasiComponent from "../../components/Konsultasi/KonsultasiComponent";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactAndLocation from "../../components/contactAndLocation";
import FloatingIcons from "../../components/FloatingIcons";

function DetailKonsultasiPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const authState = useSelector((state) => state.auth);
  const handleKonsultasi = async () => {
    // if (authState.isLogin === false) {
    if (token === false) {
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
      navigate("/konsultasi/form-konsultasi"); // Navigasi ke halaman konsultasi jika pengguna sudah login
    }
  };
  return (
    <div>
      <Header />
      <div className="block md:hidden">
        <ContactAndLocation />
      </div>
      <div className="hidden md:block">
        <FloatingIcons />
      </div>
      <div className="container mx-auto mt-28 flex flex-col sm:mb-10 lg:px-10">
        <div>
          <div class="w-full bg-white py-8">
            <div class="container mx-auto px-4">
              <h2 class="mb-6 text-3xl font-bold">Biro Psikologi Rumah Cinta</h2>
              <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <h3 class="mb-2 text-lg font-semibold">TELEPON</h3>
                  <p class="mb-4">+62 817-9803-739</p>
                  <h3 class="mb-2 text-lg font-semibold">EMAIL</h3>
                  <p class="mb-4">biropsikologi.rumahcinta@gmail.com</p>
                </div>
                <div>
                  <h3 class="mb-2 text-lg font-semibold">ALAMAT DAN JAM OPERASIONAL</h3>
                  <p class="mb-2">
                    Jalan Raya Pemda-Karadenan No. 25, RT 001/004, Kel. Karadenan, Kec. Cibinong, Kab. Bogor 16913
                  </p>
                  <p class="mb-4">Selasa - Sabtu: 08:00 - 16:00</p>
                </div>
                <div className="flex justify-center">
                  <a href="#" class="mr-4 text-gray-600 transition-colors hover:text-gray-800">
                    <FaFacebook className="h-10 w-10 text-black" />
                  </a>
                  <a href="#" class="mr-4 text-gray-600 transition-colors hover:text-gray-800">
                    <FaInstagram className="h-10 w-10 text-black" />
                  </a>
                  <a href="#" class="text-gray-600 transition-colors hover:text-gray-800">
                    <i class="fab fa-vk fa-2x"></i>
                    <FaPaperPlane className="h-10 w-10 text-black" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-8">
            <h3 class="mb-4 text-lg font-semibold">LOKASI KANTOR</h3>
            <div class="relative h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.0118312500726!2d106.80583881477064!3d-6.5201846952837315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c3dc9c7960bd%3A0xa94a0967ca427e3f!2sBiro%20Psikologi%20Rumah%20Cinta%20(D%26D%20Project%20Bogor)!5e0!3m2!1sen!2sid!4v1632920774131!5m2!1sen!2sid"
                class="absolute inset-0 h-full w-full"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                title="lokasi rumah cinta"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      {/* Why Choose Us */}

      {/* Best Service */}
      {/* Best Service */}
      <Footer />
    </div>
  );
}

export default DetailKonsultasiPage;
