import React from "react";
import { useParams } from "react-router-dom";
import psikoedukasi from "../../image-layanan/psikoedukasi.png";
import imageKonsultasi from "../../image-layanan/konsultasi.png";
import imageKonseling from "../../image-layanan/konseling.png";
import TempeHijau from "../../image-layanan/tempe-hijau.png";
import KotakBiru from "../../image-layanan/kotak-biru.png";
import BulatUngu from "../../image-layanan/bulat-ungu.png";
import BulatKuning from "../../image-layanan/bulat-kuning.png";
import BulatPink from "../../image-layanan/bulat-pink.png";
import KotakHijau from "../../image-layanan/kotak-hijau.png";
import Layanan from "../../components/Layanan/LayananComponents";

const layananData = [
  {
    id: "psiko-edukasi",
    image: psikoedukasi,
    additionalImage1: TempeHijau,
    additionalImage1Position: "topLeft",
    additionalImage2: BulatUngu,
    additionalImage2Position: "bottomRight",
    title: "Psiko Edukasi",
    description:
      "Bentuk intervensi yang sistematik, terstruktur untuk membantu meningkatkan kesadaran diri tentang berbagai masalah kehidupan dan meningkatkan pemahaman diri untuk mencegah berbagai gangguan psikologis.",
  },
  {
    id: "konsultasi",
    image: imageKonsultasi,
    additionalImage1: BulatKuning,
    additionalImage1Position: "topLeft",
    additionalImage2: KotakBiru,
    additionalImage2Position: "bottomRight",
    title: "Konsultasi",
    description:
      "Pemberian bantuan, bisa berupa nasehat pada seseorang dari seseorang yang memiliki pengetahuan, keterampilan, dan kualifikasi profesional yang memadai sebagai upaya untuk mendapatkan arahan dan bimbingan dalam penyelesaian masalah.",
  },
  {
    id: "konseling",
    image: imageKonseling,
    additionalImage1: KotakHijau,
    additionalImage1Position: "bottomLeft",
    additionalImage2: BulatKuning,
    additionalImage2Position: "topRight",
    title: "Konseling",
    description:
      "Proses pemberian bantuan yang dilakukan melalui wawancara konseling (face to face) dari konselor kepada individu yang sedang mengalami masalah (disebut konseli) dengan tujuan konseli dapat mengatasi masalah yang dihadapi dengan memanfaatkan berbagai potensi dan sarana yang dimiliki sehingga konseli dapat memahami dirinya sendiri untuk mencapai kesejahteraan hidup.",
  },
  {
    id: "terapi",
    image: imageKonseling,
    additionalImage1: TempeHijau,
    additionalImage1Position: "bottomLeft",
    additionalImage2: BulatPink,
    additionalImage2Position: "topRight",
    title: "Terapi",
    description:
      "Treatmen terhadap masalah penyesuaian diri atau masalah psikologis lain yang dialami seseorang dengan menerapkan teknik khusus yang bertujuan pada penyembuhan diri.",
  },
  {
    id: "observasi-diagnostik",
    image: imageKonseling,
    additionalImage1: TempeHijau,
    additionalImage1Position: "bottomLeft",
    additionalImage2: BulatKuning,
    additionalImage2Position: "topRight",
    title: "Observasi Diagnostik",
    description:
      "Kegiatan mengamati, memperhatikan, mengontrol, mengendalikan sesuatu yang dilakukan dalam kurun waktu tertentu untuk tujuan menetapkan diagnosis.",
  },
  {
    id: "tes-potensi-akademik",
    image: imageKonseling,
    additionalImage1: TempeHijau,
    additionalImage1Position: "bottomLeft",
    additionalImage2: BulatKuning,
    additionalImage2Position: "topRight",
    title: "Tes Potensi Akademik",
    description:
      "Merupakan salah satu bentuk tes psikologi yang banyak digunakan dalam proses rekrutmen kerja, baik di instansi pemerintahan, perusahaan swasta dan Perguruan Tinggi Negeri. TPA bertujuan pengukuran kecerdasan yang berbeda. Ada empat jenis utama soal tes TPA: Tes verbal, Tes angka, Tes logika dan Tes spasial atau gambar.",
  },
  {
    id: "asesmen",
    image: imageKonseling,
    additionalImage1: TempeHijau,
    additionalImage1Position: "bottomLeft",
    additionalImage2: BulatKuning,
    additionalImage2Position: "topRight",
    title: "Asesmen",
    description:
      "Asesmen (termasuk Anak berkebutuhan Khusus) adalah proses pemeriksaan untuk mendapatkan data/informasi untuk mengetahui kondisi individu termasuk anak berkebutuhan khusus agar dapat diberikan treatmen yang tepat.",
  },
  {
    id: "psikotes",
    image: imageKonseling,
    additionalImage1: TempeHijau,
    additionalImage1Position: "bottomLeft",
    additionalImage2: BulatKuning,
    additionalImage2Position: "topRight",
    title: "Psikotes",
    description:
      "Pemeriksaan psikologis untuk mengetahui kemampuan psikologis dengan menggunakan alat-alat tes. Psikotes dapat dilakukan individual atau klasikal sesuai dengan kebutuhan klien. Psikotes membantu klien memetakan (mapping) potensi dirinya. Misalnya tes minat bakat, tes evaluasi diri, tes IQ.",
  },
  {
    id: "seminar-parenting",
    image: imageKonseling,
    additionalImage1: TempeHijau,
    additionalImage1Position: "bottomLeft",
    additionalImage2: BulatKuning,
    additionalImage2Position: "topRight",
    title: "Seminar Parenting",
    description:
      "Kagiatan atau pertemuan yang dilakukan untuk membahas topik tertentu terkait pengasuhan dalam keluarga, masalah-masalah perkembangan anak dap permasalahan lain dalam kehidupan berkeluarga dengan cara interaksi tanya-jawab. Seminar parenting ditujukan agar kualitas pengasuhan dalam keluarga meningkat, menjadi lebih baik.",
  },
  {
    id: "pelatihan-pengembangan-diri",
    image: imageKonseling,
    additionalImage1: TempeHijau,
    additionalImage1Position: "bottomLeft",
    additionalImage2: BulatKuning,
    additionalImage2Position: "topRight",
    title: "Pelatihan Pengembangan Diri",
    description:
      "Merupakan kegiatan yang dirancang untuk mengembangkan diri melalui kegiatan identifikasi, pengkajian serta proses belajar yang terencana.",
  },
  // Tambahkan objek lain untuk layanan lainnya
];

const LayananDetail = () => {
  const { id } = useParams();
  const layanan = layananData.find((item) => item.id === id);

  return (
    <div className="mt-20">
      {layanan && (
        <Layanan
          image={layanan.image}
          additionalImage1={layanan.additionalImage1}
          additionalImage1Position={layanan.additionalImage1Position}
          additionalImage2={layanan.additionalImage2}
          additionalImage2Position={layanan.additionalImage2Position}
          title={layanan.title}
          description={layanan.description}
        />
      )}
    </div>
  );
};

export default LayananDetail;
