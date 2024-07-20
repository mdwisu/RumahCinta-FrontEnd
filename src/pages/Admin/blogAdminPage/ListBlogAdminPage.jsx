import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Sidebar from "../../../components/Admin/Sidebar";

function ListBlogAdminPage() {
  const [activePage, setActivePage] = useState("Blog");
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const open = useSelector((state) => state.sidebar.open);

  useEffect(() => {
    const fetchBlogs = async () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASE_URL}/blog`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.request(config);
        setBlogs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteBlog = async (_id) => {
    console.log(_id);
    try {
      const config = {
        method: "delete",
        url: `${process.env.REACT_APP_BASE_URL}/blog/${_id}`,
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
          setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== _id));
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

  const filteredBlogs = blogs.filter((blog) => blog.title.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <>
      <div className="flex">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <div className={`${open ? "ml-72" : "ml-20"} container-dashboard`}>
          <div>
            <h1 className="text-sizeTri font-bold text-textSec">Blog</h1>
            <p className="my-3 text-textFunc">Dashboard / Blog</p>
          </div>

          <div className="mx-auto mt-5 w-full justify-center rounded-md bg-bgTri shadow-sm shadow-textFunc">
            <div className="flex items-center justify-between px-5 pt-5">
              <div className="flex items-center space-x-4">
                <Link
                  id="addBlog"
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 "
                  type="button"
                  to={"/admin/blog/create-blog"}
                >
                  Tambah
                </Link>
                <input
                  type="text"
                  placeholder="Cari judul blog"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="">
              <div className="relative overflow-x-auto p-5">
                <table className="w-full text-left text-sm text-gray-500 ">
                  <thead className=" bg-bgFunc3  text-center text-textOpt">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Judul Blog
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
                    {filteredBlogs.map((blog, index) => (
                      <tr key={blog._id} className="border-b bg-white ">
                        <th scope="row" className="px-6 py-4 text-center ">
                          {index + 1}
                        </th>
                        <td className="px-6 py-4">{blog.title}</td>
                        <td className="px-6 py-4">{blog.description}</td>
                        <td className="flex gap-3 px-6 py-4">
                          <Link to={`/blogs/${blog._id}`} className="text-blue-500 hover:underline">
                            Detail
                          </Link>
                          <Link to={`/admin/blog/${blog._id}/edit`} className="text-yellow-500 hover:underline">
                            Edit
                          </Link>
                          <button onClick={() => deleteBlog(blog._id)} className="text-red-500 hover:underline">
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
        </div>
      </div>
    </>
  );
}

export default ListBlogAdminPage;
