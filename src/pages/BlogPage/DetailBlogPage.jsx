import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { splitDate } from "../../util/Helper";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import dayjs from "dayjs";
import "dayjs/locale/id";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

function DetailBlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [dateCreated, setDateCreated] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    getBlogsById(id);
    window.scrollTo(0, 0);
  }, []);

  const getBlogsById = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/blog/${id}`);
    setBlog(response.data.data);
    setName(response.data.data.createdBy.name);
    setDateCreated(splitDate(response.data.data.updatedAt));
  };

  const replaceImageSrc = (content) => {
    if (!content) {
      return "";
    }

    const regex = /<img[^>]+src="([^">]+)"/g;
    const replacedContent = content.replace(regex, (match, src) => {
      if (src.startsWith("/images")) {
        return match.replace(src, `${process.env.REACT_APP_BASE_URL}${src}`);
      }
      return match;
    });
    return replacedContent;
  };

  const replacedContent = replaceImageSrc(blog.content);

  console.log(blog);
  return (
    <div>
      <Header />
      <div className="container mx-auto ">
        <div className="mx-auto max-w-3xl py-6">
          <h1 className=" text-center text-4xl font-bold text-dark sm:text-4xl">{blog.title}</h1>
          <p className="text-center text-lg font-semibold text-[#71717a]">Author: {blog.author}</p>
          <p className="justify text-center text-lg font-semibold text-[#71717a]">
            Updated at: {dayjs(blog.UpdatedAt).locale("id").format("dddd, DD MMMM YYYY")}
          </p>
          {/* <ReactQuill value={replacedContent} readOnly={true} theme={"bubble"} /> */}
          <p className="text-lg" dangerouslySetInnerHTML={{ __html: replacedContent }} />

          <style>
            {`
            .prose img {
              display: block;
              margin: 0 auto;
            }
          `}
          </style>
        </div>
        <Link to="/blog" className=" my-4 text-white">
          <div className="w-100 h-50 border-1 m-5 cursor-pointer rounded-2xl border bg-bgOpt2 p-2 text-center hover:bg-bgOpt">
            Selesai
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default DetailBlogPage;
