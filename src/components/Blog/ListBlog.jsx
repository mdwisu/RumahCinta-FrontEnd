import React, { useEffect, useState } from "react";
import HeaderBlog from "../../image/list-blog.png";
import HeaderBlog2 from "../../image/list-blog2.png";
import ListBlog1 from "../../image2/26.png";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/id";
import imgBaca from "../../image-blog/baca.gif";

function ListBlog() {
  const navigate = useNavigate();
  const [searching, setSearching] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searching]); // Memicu getBlogs saat searching berubah

  const getBlogs = async () => {
    try {
      let endpoint = `${process.env.REACT_APP_BASE_URL}/blog`;

      if (searching) {
        endpoint = `${process.env.REACT_APP_BASE_URL}/blog?title=${searching}`;
      }
      const response = await axios.get(endpoint);
      setBlogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(blogs);

  const handleClick = (id) => {
    navigate(`/blogs/${id}`);
  };

  return (
    <div className="bg-bgSec">
      {/* Header List Blog */}
      {/* <div className="absolute mx-[30px] mt-[150px] w-[300px] text-white md:mx-[200px] md:mt-[200px] md:w-[700px]">
        <span className="text-sizeSec font-bold">BlogTime</span>
        <p className="mt-3 text-[16px]">Ayo cari bacaan sesuai dengan perasaan kamu hari ini</p>
        <p className="text-[16px]">Masalah, solusi dan tips dan trik untuk masalah hati kamu.</p>
      </div> */}

      {/* Search List Blog */}
      {/* <div className="">
        <div className="absolute flex justify-center mt-[450px] md:mt-[500px] w-full ">
          <div>
            <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
              <div className="relative flex-auto min-w-0 w-[350px] sm:w-[600px] lg:w-[800px]">
                <input
                  className="form-control absolute inset-0 block w-full h-full py-4 px-3 pr-8 text-xs sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-gray-200 rounded-xl md:rounded-3xl transition ease-in-out m-0 focus:text-black focus:bg-white focus:border-bgPrimary focus:outline-none"
                  type="text"
                  placeholder="Cari disini..."
                  name="search"
                  aria-label="Search"
                  value={searching}
                  onChange={(e) => setSearching(e.target.value)}
                />
                <div className="absolute inset-y-[17px] right-1 flex items-center pr-2 pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* Search List Blog */}

      {/* <div>
        <img className="h-auto w-full md:hidden" src={HeaderBlog} alt="Header for small screens" />
        <img className="hidden h-auto w-full md:block" src={HeaderBlog2} alt="Header for medium and large screens" />
      </div> */}

      <section class="dark:bg-lavender-900 bg-indigo-900 py-16">
        <div class="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 sm:px-6 md:flex-row lg:px-8">
          <div class="mb-8 md:mb-0 md:w-1/2">
            <h1 class="mb-4 text-4xl font-bold text-white">BlogTime</h1>
            <p class="text-lg text-white">
              Ayo cari baca-an sesuai dengan perasaan kamu hari ini. Masalah, solusi dan tips dan trik untuk masalah
              hari kamu.
            </p>
          </div>
          <div class="md:w-1/2">
            <img src={imgBaca} alt="Illustration" class="mx-auto max-w-full" />
          </div>
        </div>
      </section>

      {/* Header List Blog */}

      {/* Card List Blog */}
      <div className="my-10 flex flex-wrap justify-center">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="m-5 max-w-sm cursor-pointer rounded-lg bg-white shadow-sm hover:border hover:border-gray-200"
            onClick={() => handleClick(blog._id)}
          >
            <img
              className="rounded-t-lg"
              src={blog.thumbnail ? `${process.env.REACT_APP_BASE_URL}${blog.thumbnail}` : ListBlog1}
              alt=""
            />
            <div className="rounded p-6">
              <h1 className="text-xl font-bold text-textSec">{blog.title}</h1>
              <p className="text-sizeParagraph text-gray-500"></p>
              <p className="text-sizeParagraph text-gray-500">
                {dayjs(blog.UpdatedAt).locale("id").format("dddd, DD MMMM YYYY")}
              </p>
              <div className="max-w-xs text-sizeParagraph text-textFunc">
                <p className="overflow-hidden truncate">{blog.description}</p>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <p className="text-sizeParagraph text-gray-500"></p>
                <p className="text-sizeParagraph text-gray-500">{blog.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListBlog;
