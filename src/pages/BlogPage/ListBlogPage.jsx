import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DefaultThumbnailBlog from "../../image/defaultThumbnailBlog.jpeg";
import dayjs from "dayjs";
import "dayjs/locale/id";
import imgBaca from "../../image-blog/baca.gif";
import OnChangeSearchBar from "../../components/SearchBar/OnChangeSearchBar";

function ListBlogPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    getBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const getBlogs = async () => {
    try {
      let endpoint = `${process.env.REACT_APP_BASE_URL}/blog`;

      if (searchQuery) {
        endpoint = `${process.env.REACT_APP_BASE_URL}/blog?title=${searchQuery}`;
      }
      const response = await axios.get(endpoint);
      setBlogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Header />
      <div className="bg-bgSec">
        <section className="flex flex-col items-center justify-center bg-indigo-900 py-16 px-16 sm:flex-row">
          <div className="md:mr-8">
            <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl lg:text-6xl">BlogTime</h1>
            <p className="text-base text-white">
              Ayo cari baca-an sesuai dengan perasaan kamu hari ini. Masalah, solusi dan tips dan trik untuk masalah
              hari kamu.
            </p>
          </div>
          <div>
            <img src={imgBaca} alt="Illustration" className="mx-auto max-w-full" />
          </div>
        </section>

        <div className="mx-auto mt-8 max-w-lg">
          <OnChangeSearchBar onSearch={handleSearch} key={handleSearch} />
        </div>

        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              to={`/blogs/${blog._id}`}
              key={blog._id}
              className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition duration-300 hover:scale-105"
            >
              <div className="relative">
                <img
                  src={blog.thumbnail ? `${process.env.REACT_APP_BASE_URL}${blog.thumbnail}` : DefaultThumbnailBlog}
                  alt={blog.title}
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold line-clamp-2">{blog.title}</h3>
                <p className="mb-2 text-sm text-gray-500">
                  {dayjs(blog.UpdatedAt).locale("id").format("dddd, DD MMMM YYYY")}
                </p>
                <p className="text-base text-textFunc line-clamp-3">{blog.description}</p>
                <p className="mt-4 text-sm text-gray-500">{blog.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ListBlogPage;
