import React from "react";
import Header from "../../components/Header";
import tempeHijau from "../../image-layanan/tempe-hijau.png";
import bulatUngu from "../../image-layanan/bulat-ungu.png";
import imageUtama from "../../image-layanan/psikoedukasi.png";

export default function Layanan({
  image = imageUtama,
  additionalImage1 = tempeHijau,
  additionalImage2 = bulatUngu,
  additionalImage1Position = "topLeft",
  additionalImage2Position = "bottomRight",
  title = "default",
  description = "default",
}) {
  const getImagePosition = (position) => {
    switch (position) {
      case "topLeft":
        return { top: "-4rem", left: "-4rem" };
      case "topRight":
        return { top: "-4rem", right: "-4rem" };
      case "bottomLeft":
        return { bottom: "-4rem", left: "-4rem" };
      case "bottomRight":
        return { bottom: "-4rem", right: "-4rem" };
      default:
        return { top: 0, left: 0 };
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Kolom 1 */}
        <div className="flex flex-1 items-center justify-center">
          <div className="relative h-96 w-96">
            {/* <img src={tempeHijau} alt="" class="absolute -top-[4rem] -left-[6rem] h-auto w-60 overflow-auto" />
             */}
            {additionalImage1 && (
              <img
                src={additionalImage1}
                alt=""
                style={{
                  position: "absolute",
                  ...getImagePosition(additionalImage1Position),
                }}
                className="h-auto w-60 overflow-auto"
              />
            )}
            <img src={image} alt="Gambar Utama" className="h-full w-full rounded-full" />
            {/* <img src={bulatUngu} alt="" class="absolute -bottom-12 -right-20 h-auto w-60 overflow-auto" /> */}
            {additionalImage2 && (
              <img
                src={additionalImage2}
                alt=""
                style={{
                  position: "absolute",
                  ...getImagePosition(additionalImage2Position),
                }}
                className="h-auto w-60 overflow-auto"
              />
            )}
          </div>
        </div>

        {/* Kolom 2 */}
        <div className="flex flex-1 flex-col items-start justify-center">
          <h1 className="mb-4 text-left text-6xl font-bold">{title}</h1>
          <p className="w-3/4 text-left text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
}
