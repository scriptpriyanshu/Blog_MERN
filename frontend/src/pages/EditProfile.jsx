import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const token = localStorage.getItem("token");

  const updateProfile = async () => {
    try {
      const response = await fetch(`http://localhost:9090/editprofile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ username, bio }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast.success(data.msg);
        console.log(data.msg);
        navigate("/profile");
      } else {
        toast.error(data.error);
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile();
  };

  return (
    <div className="flex h-screen flex-col justify-center items-center">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-10"></div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="h-24 w-24 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <div className="w-80">
              <input
                type="username"
                name="username"
                id="username"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <textarea
                name="bio"
                className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 resize-y dark:text-white"
                id="bio"
                placeholder="Your Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="5"
              ></textarea>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
