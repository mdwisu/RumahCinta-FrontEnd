import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/id";
import piknik from "../../image/piknik.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import OnChangeSearchBar from "../../components/SearchBar/OnChangeSearchBar.jsx";

function ListVideoPage() {
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-bgSec">
        <section className="flex flex-col items-center justify-center bg-green-700 py-16 px-16 sm:flex-row">
          <div className="md:mr-8">
            <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl lg:text-6xl">Video Time</h1>
            <p className="text-base text-white">
              Ayo cari video sesuai dengan perasaan kamu hari ini. Masalah, solusi dan tips dan trik untuk masalah hati
              kamu.
            </p>
          </div>
          <div>
            <img src={piknik} alt="Illustration" className="mx-auto max-w-full" />
          </div>
        </section>

        <div className="mx-auto mt-5 max-w-lg">
          <OnChangeSearchBar onSearch={handleSearch} key={handleSearch} placeholder="Cari video..." />
        </div>

        <div className=" ">
          <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {isLoading ? (
              <div className="col-span-full flex h-64 items-center justify-center">
                <p className="text-center text-gray-500">Loading...</p>
              </div>
            ) : videos.length > 0 ? (
              videos.map((video) => (
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
              ))
            ) : (
              <div className="col-span-full flex h-64 items-center justify-center">
                <p className="text-center text-xl font-semibold text-gray-500">Tidak ada video yang ditemukan.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ListVideoPage;
