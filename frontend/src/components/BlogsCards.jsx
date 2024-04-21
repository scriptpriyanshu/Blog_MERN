import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const BlogsCards = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("https://blog-server-livid-three.vercel.app/getblog", {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  console.log(blogs);

  if (!blogs || blogs.length === 0) {
    return (
      <>
        <Loading />
        <Loading />
        <Loading />
        <Loading />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-wrap">
        {blogs.map((blog, index) => (
          <div className="p-10 w-full">
            <main key={index} className="flex bg-white  rounded-lg shadow-lg">
              <img
                className="w-1/3 rounded-l-lg"
                src={blog.imageUrl}
                alt={blog.title}
              />
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <div className="font-bold text-xl mb-2">{blog.title}</div>
                  <p className="text-gray-700 text-base">{blog.metadesc}</p>
                </div>
                <Link
                  to={`/blogs/${blog._id}`}
                  className="bg-gray-900 mb-2 w-24 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Read More
                </Link>
              </div>
            </main>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogsCards;
