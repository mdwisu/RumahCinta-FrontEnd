import React from "react";
import psikoedukasi from "../../image-layanan/psikoedukasi.png";
import image1 from "../../image-layanan/tempe-hijau.png";
import image2 from "../../image-layanan/kotak-biru.png";
import Layanan from "../../components/Layanan/LayananComponents";

export default function PsikoEdukasi() {
  return (
    <>
      <Layanan
        // image={psikoedukasi}
        additionalImage1={image1}
        additionalImage1Position="topLeft"
        additionalImage2={image1}
        additionalImage2Position="bottomRight"
        title="Psiko Edukasi"
        description="Bentuk intervensi yang sistematik, terstruktur untuk membantu meningkatkan kesadaran diri tentang berbagai masalah kehidupan dan meningkatkan pemahaman diri untuk mencegah berbagai gangguan psikologis."
      />
    </>
  );
}
