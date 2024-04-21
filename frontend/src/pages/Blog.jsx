import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogLoading from "../components/BlogLoading";

const Blog = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      return navigate("/signin");
    }
  }, [navigate, token]);

  const [blog, setBlog] = useState("");
  const [writerName, setWriterName] = useState("");
  const [writerID, setWriterID] = useState("");

  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  const { id } = useParams();

  // Function to fetch blog details
  const fetchBlogDetails = async () => {
    try {
      const response = await fetch(`https://blog-backend-lzjt.onrender.com/blog/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      const blogDetails = data.blog;
      const writerid = data.writer._id;
      if (response.ok) {
        setBlog(blogDetails);
        setWriterName(data.writerUsername);
        setWriterID(writerid);
      } else {
        console.error("Failed to fetch blog details");
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("https://blog-backend-lzjt.onrender.com/profile", {
          headers: {
            Authorization: token,
          },
        });
        const data = await response.json();
        const user = data.user;
        if (response.ok) {
          setUser({
            username: user.username,
            email: user.email,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, [token]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://blog-backend-lzjt.onrender.com/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });
      if (response.ok) {
        toast.success("Blog deleted successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!blog) {
    // Render loading state until user data is loaded
    return (
      <>
        <BlogLoading />
      </>
    );
  }

  return (
    <>
      <main className="bg-gray-100 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl flex justify-between mb-4">
              <div>
                Written By -
                <Link
                  to={`/authors/${writerID}`}
                  className="inline-block ml-1 bg-blue-200 text-blue-800 px-2 py-1 rounded-lg font-semibold"
                >
                  @{writerName}
                </Link>
              </div>
              {user.username === writerName && (
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500"
                >
                  Delete
                </button>
              )}
            </h2>
            <h1 className="lg:text-4xl sm:text-xl md: text-2xl font-bold mb-4">
              {blog.title}
            </h1>
            <div className="flex justify-center">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="rounded-lg mb-6"
              />
            </div>
            <h1
              dangerouslySetInnerHTML={{ __html: blog.content }}
              className="lg:text-xl md:text-2xl sm:text-3xl break-words leading-relaxed mb-6"
            ></h1>
            <Link
              to="/"
              className="block bg-blue-700 rounded-lg font-medium px-3 py-2 text-white w-1/6 text-center hover:underline text-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Blog;
