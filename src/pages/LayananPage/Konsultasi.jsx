import React from "react";
import Header from "../../components/Header";
import konsultasi from "../../image-layanan/konsultasi.png";
import kuning from "../../image-layanan/bulat-kuning.png";
import biru from "../../image-layanan/kotak-biru.png";

export default function Konsultasi() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Kolom 1 */}
        <div className="flex flex-1 items-center justify-center">
          <div className="relative h-96 w-96">
            <img src={kuning} alt="" class="absolute -top-[4rem] -left-[6rem] h-auto w-60 overflow-auto" />
            <img src={konsultasi} alt="Gambar Utama" className="h-full w-full rounded-full object-cover object-left" />
            <img src={biru} alt="" class="absolute -bottom-12 -right-20 h-auto w-60 overflow-auto" />
          </div>
        </div>

        {/* Kolom 2 */}
        <div className="flex flex-1 flex-col items-start justify-center">
          <h1 className="mb-4 text-left text-6xl font-bold">Konsultasi</h1>
          <p className="w-3/4 text-left text-lg">
            Pemberian bantuan, bisa berupa nasehat pada seseorang dari seseorang yang memiliki pengetahuan,
            keterampilan, dan kualifikasi profesional yang memadai sebagai upaya untuk mendapatkan arahan dan bimbingan
            dalam penyelesaian masalah.
          </p>
        </div>
      </div>
    </div>
  );
}
