import React, { useEffect, useState } from "react";

const images = [
  "https://source.unsplash.com/1900x640?computer&text=Slide+1",
  "https://source.unsplash.com/1900x640?computer&text=Slide+2",
  "https://source.unsplash.com/1900x640?computer&text=Slide+3",
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % images.length);
    }, 3000); // Ganti 3000 dengan interval slide yang diinginkan (dalam milidetik)

    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="flex h-60 lg:h-auto">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`w-full ${index === currentSlide ? "animate-fadeIn block" : "hidden"}`}
          />
        ))}
      </div>
      <div className="absolute bottom-5 left-0 right-0 mt-4 flex justify-center">
        {images.map((image, index) => (
          <button
            key={index}
            className={`mx-1 h-2 w-2 rounded-full ${index === currentSlide ? "bg-blue-500" : "bg-gray-300"}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}
