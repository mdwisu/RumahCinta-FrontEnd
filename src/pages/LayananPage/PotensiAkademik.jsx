import React from "react";
import Header from "../../components/Header";
import potensiAkademik from "../../image-layanan/potensi-akademik.png";
import kuning from "../../image-layanan/bulat-kuning.png";
import biru from "../../image-layanan/kotak-biru.png";

export default function PotensiAkademik() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Kolom 1 */}
        <div className="flex flex-1 items-center justify-center">
          <div className="relative h-96 w-96">
            <img src={kuning} alt="" class="absolute -top-[4rem] -left-[6rem] h-auto w-60 overflow-auto" />
            <img
              src={potensiAkademik}
              alt="Gambar Utama"
              className="h-full w-full rounded-full object-cover object-left"
            />
            <img src={biru} alt="" class="absolute -bottom-12 -right-20 h-auto w-60 overflow-auto" />
          </div>
        </div>

        {/* Kolom 2 */}
        <div className="flex flex-1 flex-col items-start justify-center">
          <h1 className="mb-4 text-left text-6xl font-bold">Tes Potensi Akademik</h1>
          <p className="w-3/4 text-left text-lg">
            Merupakan salah satu bentuk tes psikologi yang banyak digunakan dalam proses rekrutmen kerja, baik di
            instansi pemerintahan, perusahaan swasta dan Perguruan Tinggi Negeri. TPA bertujuan pengukuran kecerdasan
            yang berbeda. Ada empat jenis utama soal tes TPA: Tes verbal, Tes angka, Tes logika dan Tes spasial atau
            gambar
          </p>
        </div>
      </div>
    </div>
  );
}
