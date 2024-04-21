import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Authors = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch(
          "https://blog-backend-lzjt.onrender.com/authors",
          {
            method: "GET",
          }
        );
        const data = await response.json();
        console.log("Data:", data);
        if (response.ok) {
          setAuthors(data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAuthors();

    document.title = "Authors";
  }, []);

  return (
    <>
      <div className="mt-4 ">
        {authors.map((author) => (
          <main key={author._id} className="p-5 flex justify-center">
            <Link
              href={`/authors/${author._id}`}
              className="px-14 flex gap-5 items-center w-full max-w-xl p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
              // Set random background color
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 h-12 w-12 text-blue-500 rounded-lg ">
                <img
                  className="rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span className="sr-only">Fire icon</span>
              </div>
              <div>
                <div className="ms-3 text-xl font-bold text-white">
                  {author.username}
                </div>
                <div className="ms-3 text-lg font-normal text-white">
                  {author.email}
                </div>
              </div>
            </Link>
          </main>
        ))}
      </div>
    </>
  );
};

export default Authors;
