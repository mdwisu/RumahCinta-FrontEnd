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
        return {
          "top-[-3rem] left-[-3rem]": true,
          "lg:top-[-4rem] lg:left-[-4rem]": true,
        };
      case "topRight":
        return {
          "top-[-3rem] right-[-3rem]": true,
          "lg:top-[-4rem] lg:right-[-4rem]": true,
        };
      case "bottomLeft":
        return {
          "bottom-[-3rem] left-[-3rem]": true,
          "lg:bottom-[-4rem] lg:left-[-4rem]": true,
        };
      case "bottomRight":
        return {
          "bottom-[-3rem] right-[-3rem]": true,
          "lg:bottom-[-4rem] lg:right-[-4rem]": true,
        };
      default:
        return {};
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mt-10 flex flex-1 flex-col py-20 lg:flex-row">
        {/* Kolom 1 */}
        <div className="flex flex-1 items-center justify-center">
          <div className="relative h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96">
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
                className={`h-auto w-40 overflow-auto md:w-48 lg:w-60 ${Object.entries(
                  getImagePosition(additionalImage1Position),
                )
                  .map(([key, value]) => (value ? key : ""))
                  .join(" ")}`}
              />
            )}
            <img src={image} alt="Gambar Utama" className="h-full w-full rounded-full object-cover" />
            {/* <img src={bulatUngu} alt="" class="absolute -bottom-12 -right-20 h-auto w-60 overflow-auto" /> */}
            {additionalImage2 && (
              <img
                src={additionalImage2}
                alt=""
                style={{
                  position: "absolute",
                  ...getImagePosition(additionalImage2Position),
                }}
                className={`h-auto w-40 overflow-auto md:w-48 lg:w-60 ${Object.entries(
                  getImagePosition(additionalImage2Position),
                )
                  .map(([key, value]) => (value ? key : ""))
                  .join(" ")}`}
              />
            )}
          </div>
        </div>
        {/* Kolom 2 */}
        <div className="mx-10 flex flex-1 flex-col items-start justify-center text-justify">
          <h1 className="mb-4 text-left font-bold sm:text-3xl md:text-4xl lg:text-6xl">{title}</h1>
          <p className="w-full text-left text-lg lg:w-3/4">{description}</p>
        </div>
      </div>
    </div>
  );
}
