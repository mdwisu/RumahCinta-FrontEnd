import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import youtubeVideoId from "youtube-video-id";
import { useSelector } from "react-redux";

const EditVideoAdmin = () => {
  const [title, setTitle] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [activePage, setActivePage] = useState("Video");
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const textareaRef = useRef(null);
  const open = useSelector((state) => state.sidebar.open);

  useEffect(() => {
    adjustTextareaHeight();
  }, [description]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let data = {
      title,
      videoLink: videoLink || undefined,
      description,
      author,
    };
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/video/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    try {
      Swal.fire({
        title: "Do you want to save the changes?",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.request(config);
          console.log(JSON.stringify(response.data));
          navigate(`/admin/video`);
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchVideo = async () => {
      console.log("fetch is running");
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/video/${id}`);
        const videoData = response.data.data;
        setTitle(videoData.title);
        setVideoLink(videoData.videoId);
        setDescription(videoData.description);
        setAuthor(videoData.author);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVideo();
  }, [id]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className={`${open ? "ml-72" : "ml-20"} container-dashboard`}>
        {/* judul */}
        <div>
          <h1 className="text-sizeTri font-bold text-textSec">Edit Video</h1>
          <p className="my-3 text-textFunc">Dashboard / Video / Edit</p>
        </div>
        {/* judul */}
        {/* content */}
        <div className="mx-auto mt-5 w-full justify-center rounded-md bg-bgTri shadow-sm shadow-textFunc">
          <div className="p-5">
            <div className="flex-1">
              <div className="w-full">
                <form onSubmit={handleUpdate} className="space-y-4">
                  <table className="w-full">
                    <tr>
                      <td className="py-3">
                        <label htmlFor="title" className="mb-1 block text-textSec">
                          Judul Video
                        </label>
                      </td>
                      <td className="">
                        <input
                          type="text"
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full rounded-md border py-2 px-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <label htmlFor="videoLink" className="mb-1 block text-textSec">
                          Link Video
                        </label>
                      </td>
                      <td className="">
                        <input
                          type="text"
                          id="videoLink"
                          onChange={(e) => setVideoLink(e.target.value)}
                          className="w-full rounded-md border py-2 px-2 focus:outline-none focus:ring focus:ring-blue-300"
                          placeholder="https://www.youtube.com/watch?v=Lw0ZUa1vW5I"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <label htmlFor="description" className="mb-1 block text-textSec">
                          Deskripsi
                        </label>
                      </td>
                      <td className="">
                        <textarea
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full rounded-md border py-2 px-2 focus:outline-none focus:ring focus:ring-blue-300"
                          rows="1"
                          ref={textareaRef}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <label htmlFor="author" className="mb-1 block text-textSec">
                          Author
                        </label>
                      </td>
                      <td className="">
                        <input
                          type="text"
                          id="author"
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          className="w-full rounded-md border py-2 px-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                      </td>
                    </tr>
                  </table>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      position: "relative",
                    }}
                    className="flex flex-wrap gap-2 p-5"
                  >
                    <button
                      onClick={handleGoBack}
                      type="button"
                      className="mt-2 w-[100px] rounded-md bg-bgFunc px-4 py-2 text-white hover:bg-bgFunc3 focus:outline-none focus:ring focus:ring-gray-300"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="mt-2 w-[100px] rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* content */}
      </div>
    </div>
  );
};

export default EditVideoAdmin;
