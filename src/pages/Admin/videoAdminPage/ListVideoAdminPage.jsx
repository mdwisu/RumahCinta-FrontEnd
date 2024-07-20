import React, { useEffect, useState } from "react";
import ListVideoAdmin from "../../../components/Admin/videoAdmin/ListVideoAdmin";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Sidebar from "../../../components/Admin/Sidebar";

function ListVideoAdminPage() {
  const [activePage, setActivePage] = useState("Video");
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const open = useSelector((state) => state.sidebar.open);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/video/`,
    };

    try {
      const response = await axios.request(config);
      setVideos(response.data.video);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVideo = async (_id) => {
    console.log(_id);
    try {
      const config = {
        method: "delete",
        url: `${process.env.REACT_APP_BASE_URL}/video/${_id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.request(config);
          setVideos((prevVideos) => prevVideos.filter((video) => video._id !== _id));
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelled", "Your file is safe :)", "error");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredVideos = videos.filter((video) => video.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <div className="flex">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        {/* Content */}
        <div className={`${open ? "ml-72" : "ml-20"} container-dashboard`}>
          {/* judul */}
          <div>
            <h1 className="text-sizeTri font-bold text-textSec">Video</h1>
            <p className="my-3 text-textFunc">Dashboard / Video</p>
          </div>
          {/* judul */}
          {/* content */}

          <div className="mx-auto mt-5 w-full justify-center rounded-md bg-bgTri shadow-sm shadow-textFunc">
            <div className="flex items-center justify-between px-5 pt-5">
              <div className="flex items-center space-x-4">
                <Link
                  id="addVideo"
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
                  type="button"
                  to={"/admin/video/create-video"}
                >
                  Tambah
                </Link>
                <input
                  type="text"
                  placeholder="Cari judul video"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="">
              <div className="relative overflow-x-auto p-5">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                  <thead className=" bg-bgFunc3  text-center text-textOpt">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Judul Video
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Deskripsi Singkat
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVideos.map((video, index) => (
                      <tr key={video._id} className="border-b bg-white ">
                        <th scope="row" className="px-6 py-4 text-center">
                          {index + 1}
                        </th>
                        <td className="px-6 py-4">{video.title}</td>
                        <td className="px-6 py-4">{video.description}</td>
                        <td className="flex gap-3 px-6 py-4">
                          <Link to={`/videos/${video._id}`} className="text-blue-500 hover:underline">
                            Detail
                          </Link>
                          <Link to={`/admin/video/${video._id}/edit`} className="text-yellow-500 hover:underline">
                            Edit{" "}
                          </Link>
                          <button onClick={() => deleteVideo(video._id)} className="text-red-500 hover:underline">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* content */}
        </div>

        {/* Content */}
      </div>
    </>
  );
}

export default ListVideoAdminPage;
