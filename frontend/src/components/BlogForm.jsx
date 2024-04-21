import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BlogForm() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.title = "Write you Blog";
  }, []);

  useEffect(() => {
    if (!token) {
      return navigate("/signin");
    }
  }, [navigate, token]);

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    metadesc: "",
    imageUrl: "", // Added imageUrl field
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setBlog({ ...blog, [name]: value });
  };

  const handleContentChange = (value) => {
    setBlog({ ...blog, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://blog-backend-lzjt.onrender.com/createblog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(blog),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setBlog({
          title: "",
          content: "",
          metadesc: "",
          imageUrl: "", // Reset imageUrl field after successful submission
        });
        toast.success(data.msg);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.success(data.msg);
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["code", "code-block"],
        ["link", "image", "video"],
        ["clean"],
      ],
    },
  };

  return (
    <form className="p-16" onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Write your Blog
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            You can write your own Blog here which can be read by anyone.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    onChange={handleInput}
                    autoComplete="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Title"
                    value={blog.title}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="metadesc"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="metadesc"
                    id="metadesc"
                    onChange={handleInput}
                    autoComplete="metadesc"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="metadesc"
                    value={blog.metadesc}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cover Image URL
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    onChange={handleInput}
                    autoComplete="imageUrl"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Cover Image URL"
                    value={blog.imageUrl}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="content"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Content
              </label>
              <div className="mt-2">
                <ReactQuill
                  value={blog.content}
                  onChange={handleContentChange}
                  placeholder="Write your content here..."
                  className="bg-white h-72"
                  modules={modules}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </Link>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
