import React, { useCallback, useEffect, useState } from "react";
import LoadingCom from "../component/global/LoadinCom/LoadingCom";
import Nothings from "../component/global/Nothings";
import CommonBlog from "../component/Home/CommonBlog";
import { getAPI } from "../utils/FetchData";
import { IBlog } from "../utils/Typescript";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("blog/get/popular");
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  const getBlog = useCallback(async () => {
    setLoading(true);
    const res = await getAPI(url);
    setBlogs(res.data);
    setLoading(false);
  }, [url]);
  useEffect(() => {
    getBlog();
  }, [getBlog]);

  const blogData = () => {
    return (
      <>
        {blogs.length === 0 && !loading && <Nothings />}
        {loading ? (
          <LoadingCom />
        ) : (
          <div className="row">
            {blogs?.map((item) => (
              <CommonBlog blog={item} key={item._id} />
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <section className="home container my-5">
      <h1>
        <strong>Blog</strong>
      </h1>
      <ul className="nav nav-tabs mt-5" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
            onClick={() => setUrl("blog/get/popular")}
          >
            Popular
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#contact"
            type="button"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
            onClick={() => setUrl("blog/get/recent")}
          >
            Recent
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <h4 className="my-4">
            <strong>Popular Blogs</strong>
          </h4>
          {blogData()}
        </div>
        <div
          className="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          <h4 className="my-4">
            <strong>Recent Blogs</strong>
          </h4>
          {blogData()}
        </div>
      </div>
    </section>
  );
};

export default Home;
