import React, { useState } from "react";
import axios from "axios";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ImageCompress from "quill-image-compress";
import { useSelector } from "react-redux";

Quill.register("modules/imageCompress", ImageCompress);

const CreateBlogAdmin = () => {
  const [activePage, setActivePage] = useState("Blog");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const open = useSelector((state) => state.sidebar.open);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title);
    console.log(description);
    console.log(author);
    console.log(content);
    // console.log(thumbnail);

    let data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("author", author);
    data.append("content", content);
    data.append("thumbnail", thumbnail);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/blog`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        Swal.fire({
          title: "Berhasil!",
          text: "Data berhasil disimpan.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/admin/blog");
        });
      } catch (error) {
        console.log(error);
      }
    }
    makeRequest();
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (file.size > maxSize) {
      Swal.fire({
        title: "Ukuran Gambar Terlalu Besar",
        text: "Ukuran gambar tidak boleh melebihi 2MB.",
        icon: "error",
      });
      setThumbnail(null); // Reset the selected thumbnail
      setThumbnailPreview(null); // Reset the thumbnail preview
      return;
    }

    setThumbnail(file);

    // Create a preview of the thumbnail
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Check image dimensions before uploading
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      if (width !== 1280 || height !== 720) {
        Swal.fire({
          title: "Ukuran Gambar Salah",
          text: "Ukuran gambar harus 1280x720 pixel.",
          icon: "error",
        });
        setThumbnail(null); // Reset the selected thumbnail
        setThumbnailPreview(null); // Reset the thumbnail preview
      }
    };
  };

  return (
    <div className="flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className={`${open ? "ml-72" : "ml-20"} container-dashboard`}>
        {/* judul */}
        <div>
          <h1 className="text-sizeTri font-bold text-textSec">Tambah Blog</h1>
          <p className="my-3 text-textFunc">Dashboard / Blog / Tambah</p>
        </div>
        {/* judul */}
        {/* content */}
        <div className="mx-auto mt-5 w-full justify-center rounded-md bg-bgTri shadow-sm shadow-textFunc">
          <div className="p-5">
            <div className="flex-1">
              <div className="w-full ">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <table className="w-full">
                    <tr>
                      <td className="py-3">
                        <label htmlFor="title" className="mb-1 block text-textSec">
                          Judul Blog
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
                        <label htmlFor="description" className="mb-1 block text-textSec">
                          Deskripsi Singkat
                        </label>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="description"
                          placeholder="max 50 words"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full rounded-md border py-2 px-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <label htmlFor="description" className="mb-1 block text-textSec">
                          Author
                        </label>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="author"
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          className="w-full rounded-md border py-2 px-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <label htmlFor="thumbnail" className="mb-1 block text-textSec">
                          Thumbnail Gambar
                        </label>
                      </td>
                      <td>
                        <input
                          type="file"
                          id="thumbnail"
                          accept=".jpg, .jpeg, .png, .gif, .bmp, .tiff, .svg, .webp"
                          onChange={handleThumbnailChange}
                          className="rounded-md border py-2 px-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        {thumbnailPreview && (
                          <div className="mt-2">
                            <p className="text-textFunc">Pratinjau Gambar:</p>
                            <img
                              src={thumbnailPreview}
                              alt="Thumbnail Preview"
                              className="mt-2 h-32 w-48 rounded-md border object-cover"
                            />
                          </div>
                        )}
                        {thumbnail && <p className="mt-2 text-textFunc">Gambar terpilih: {thumbnail.name}</p>}
                        <p className="mt-2 text-textFunc">
                          Format gambar yang diizinkan: JPG, JPEG, PNG, GIF, BMP, TIFF, SVG, WebP.
                          <br />
                          Ukuran gambar harus 1280x720 piksel dengan batas maksimum 2MB.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <label htmlFor="content" className="mb-1 block text-textSec">
                          Konten
                        </label>
                      </td>
                      <td className="py-3">
                        <ReactQuill
                          value={content}
                          onChange={setContent}
                          modules={{
                            toolbar: [
                              [{ header: [1, 2, false] }],
                              ["bold", "italic", "underline", "strike"],
                              ["link", "image"],
                              [{ list: "ordered" }, { list: "bullet" }],
                              ["blockquote", "code-block"],
                              [{ align: [] }],
                              [{ indent: "-1" }, { indent: "+1" }],
                              [{ direction: "rtl" }],
                              ["clean"],
                            ],
                            imageCompress: {
                              quality: 0.7, // default
                              maxWidth: 1000, // default
                              maxHeight: 1000, // default
                              imageType: "image/jpeg", // default
                              debug: true, // default
                            },
                          }}
                          formats={[
                            "header",
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "link",
                            "image",
                            "list",
                            "bullet",
                            "blockquote",
                            "code-block",
                            "align",
                            "indent",
                            "direction",
                          ]}
                          className="h-[200px] rounded-md border focus:outline-none focus:ring focus:ring-blue-300"
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
                      type="button"
                      className="mt-2 w-[100px] rounded-md bg-bgFunc px-4 py-2 text-white hover:bg-bgFunc3 focus:outline-none focus:ring focus:ring-gray-300"
                      onClick={handleGoBack}
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

export default CreateBlogAdmin;
