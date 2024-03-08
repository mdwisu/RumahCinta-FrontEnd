import React from "react";
import Header from "../../components/Header";
import psikoedukasi from "../../image/psikoedukasi.png";
import tempeHijau from "../../image-layanan/tempe-hijau.png";
import bulatUngu from "../../image-layanan/bulat-ungu.png";

export default function PsikoEdukasi() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Kolom 1 */}
        <div className="flex flex-1 items-center justify-center">
          <div className="relative h-96 w-96">
            <img src={tempeHijau} alt="" class="absolute -top-[4rem] -left-[6rem] h-auto w-60 overflow-auto" />
            <img src={psikoedukasi} alt="Gambar Utama" className="h-full w-full rounded-full" />
            <img src={bulatUngu} alt="" class="absolute -bottom-12 -right-20 h-auto w-60 overflow-auto" />
          </div>
        </div>

        {/* Kolom 2 */}
        <div className="flex flex-1 flex-col items-start justify-center">
          <h1 className="mb-4 text-right text-6xl font-bold">Psiko Edukasi</h1>
          <p className="w-3/4 text-left text-lg">
            Bentuk intervensi yang sistematik, terstruktur untuk membantu meningkatkan kesadaran diri tentang berbagai
            masalah kehidupan dan meningkatkan pemahaman diri untuk mencegah berbagai gangguan psikologis.
          </p>
        </div>
      </div>
    </div>
  );
}
