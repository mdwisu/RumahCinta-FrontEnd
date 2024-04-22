import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const EditBlogAdmin = () => {
  const [activePage, setActivePage] = useState("Blog");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const open = useSelector((state) => state.sidebar.open);

  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem("token");

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          let data = new FormData();
          data.append("title", title);
          data.append("description", description);
          data.append("author", author);
          data.append("content", content);
          data.append("thumbnail", thumbnail);

          let config = {
            method: "patch",
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_BASE_URL}/blog/${id}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: data,
          };
          const response = await axios.request(config);
          console.log(JSON.stringify(response.data));
          navigate(`/admin/blog`);
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
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/blog/${id}`);
        const blogData = response.data.data;
        setTitle(blogData.title);
        setDescription(blogData.description);
        setAuthor(blogData.author);
        setContent(blogData.content);
        setThumbnail(blogData.thumbnail || null);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleContentChange = (value) => {
    const updatedContent = value.replace(
      /src="(\/images\/[a-zA-Z0-9_]+\.[a-zA-Z]{3,4})"/g,
      `src="${process.env.REACT_APP_BASE_URL}$1"`,
    );

    setContent(updatedContent);
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
      setThumbnail(null);
      setThumbnailPreview(null);
      return;
    }

    setThumbnail(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(file);

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
        setThumbnail(null);
        setThumbnailPreview(null);
      }
    };
  };

  return (
    <div className="flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className={`${open ? "ml-72" : "ml-20"} container-dashboard`}>
        {/* judul */}
        <div>
          <h1 className="text-sizeTri font-bold text-textSec">Edit Blog</h1>
          <p className="my-3 text-textFunc">Dashboard / Blog / Edit</p>
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
                          onChange={handleContentChange}
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

export default EditBlogAdmin;
