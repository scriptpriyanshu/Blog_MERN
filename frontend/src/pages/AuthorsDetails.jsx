import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const AuthorsDetails = () => {
  const [author, setAuthor] = useState("");
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const fetchAuthorDetails = async () => {
    try {
      const response = await fetch(
        `https://blog-backend-lzjt.onrender.com/authors/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      const author = data.author;
      console.log(author);
      if (response.ok) {
        setAuthor(author);
      } else {
        console.error("Failed to fetch blog details");
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };
  useEffect(() => {
    fetchAuthorDetails();
  }, []);

  const [user, setUser] = useState({
    username: "",
    email: "",
    bio: "",
  });

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        "https://blog-backend-lzjt.onrender.com/profile",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      const user = data.user;
      console.log(user);
      if (response.ok) {
        setUser({
          username: user.username,
          email: user.email,
          bio: user.bio,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [token]);

  useEffect(() => {
    document.title = author.username
      ? `${author.username}'s Profile`
      : "Author's Profile";
  }, [fetchAuthorDetails]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
    window.location.reload();
  };

  return (
    <>
      <main className="flex items-center h-screen justify-center">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-end px-4 pt-4">
            {user.username === author.username && (
              <>
                <button
                  id="dropdownButton"
                  data-dropdown-toggle="dropdown"
                  className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                  type="button"
                >
                  <span className="sr-only">Open dropdown</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </button>
                <div
                  id="dropdown"
                  className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul className="py-2" aria-labelledby="dropdownButton">
                    <li>
                      <Link
                        to="/editprofile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Edit
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Export Data
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col items-center pb-10">
            <img
              className="h-24 w-24 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <h5 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
              {author.username ? author.username : "Username"}
            </h5>
            <span className="text-lg  text-gray-100 bg-blue-600 px-3 py-1 rounded-md">
              {author.email ? author.email : "Email"}
            </span>
            <span className="py-2 px-3 mt-4 w-3/4 rounded-lg bg-gray-200 font-medium text-lg text-gray-800">
              {author.bio ? author.bio : ""}
            </span>
            {user.username === author.username ? (
              <div className="flex mt-4 md:mt-6">
                <Link
                  to="/write"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Write
                </Link>
                <a
                  onClick={handleLogout}
                  href="/"
                  className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Log Out
                </a>
              </div>
            ) : (
              <div className="flex mt-4 md:mt-6">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Follow
                </button>
                <Link
                  href="/"
                  className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Message
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default AuthorsDetails;
