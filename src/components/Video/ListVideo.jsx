import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/id";
import piknik from "../../image/piknik.png";
import VideoSearchBar from "../SearchBar/OnSubmitSearchBar";
import OnChangeSearchBar from "../SearchBar/OnChangeSearchBar";
import OnSubmitSearchBar from "../SearchBar/OnSubmitSearchBar";

function ListVideo() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const getVideos = async () => {
    try {
      let endpoint = `${process.env.REACT_APP_BASE_URL}/video`;

      if (searchQuery) {
        endpoint = `${process.env.REACT_APP_BASE_URL}/video?title=${searchQuery}`;
      }
      const response = await axios.get(endpoint);
      setVideos(response.data.video);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(videos);

  const handleClick = (id) => {
    navigate(`/video/${id}`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  console.log("ini vedeo", videos);

  return (
    <div className="bg-bgSec">
      <section className="flex flex-col items-center justify-center bg-green-700 py-16 px-16 sm:flex-row">
        <div className="md:mr-8">
          <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl lg:text-6xl">Video Time</h1>
          <p className="text-base text-white">
            Ayo cari video sesuai dengan perasaan kamu hari ini Masalah, solusi dan tips dan trik untuk masalah hati
            kamu.
          </p>
        </div>
        <div>
          <img src={piknik} alt="" />
        </div>
      </section>
      <div className="mx-auto mt-5 max-w-lg">
        <OnChangeSearchBar onSearch={handleSearch} key={handleSearch} />
      </div>

      {/* Card List Video */}
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {videos.map((video) => (
          <Link
            to={`/videos/${video._id}`}
            key={video._id}
            className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition duration-300 hover:scale-105"
          >
            <div className="relative">
              <img
                src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                alt={video.title}
                className="h-auto w-full object-cover"
                onLoad={(e) => {
                  if (e.target.naturalWidth === 120 && e.target.naturalHeight === 90) {
                    e.target.src = "https://via.placeholder.com/1280x720?text=Thumbnail+Tidak+Tersedia";
                  }
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="mb-2 text-lg font-semibold line-clamp-2">{video.title}</h3>
              <p className="text-gray-600 line-clamp-3">{video.description}</p>
            </div>
          </Link>
        ))}
      </div>
      {/* Card List Video */}
    </div>
  );
}

export default ListVideo;
