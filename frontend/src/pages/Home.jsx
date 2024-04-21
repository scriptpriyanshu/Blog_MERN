import React, { useEffect } from "react";
import BlogsCards from "../components/BlogsCards";

const Home = () => {
  useEffect(() => {
    document.title = "Blogs | Home";
  }, []);
  return (
    <>
      <div className="flex bg-[#f5f5f5] flex-wrap justify-center items-center">
        <BlogsCards />
      </div>
    </>
  );
};

export default Home;
