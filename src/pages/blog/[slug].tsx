import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router";
import Details from "../../component/Blogs/Details";
import { getAPI } from "../../utils/FetchData";
import { IBlog, IParams } from "../../utils/Typescript";

const BlogDetails = () => {
  const id = useParams<IParams>().slug;
  const [loading, setLoading] = useState<boolean>(false);
  const [blog, setBlog] = useState<IBlog[]>([]);

  const getBlog = useCallback(async () => {
    setLoading(true);
    const res = await getAPI(`blog/${id}`);
    setBlog(res.data);
    setLoading(false);
  }, [id]);
  useEffect(() => {
    getBlog();
  }, [getBlog]);

  if (loading)
    return (
      <h2
        className="text-center d-flex justify-content-center align-items-center my-5"
        style={{ height: "100vh" }}
      >
        Loading
      </h2>
    );

  return (
    <section className="blog-details container my-5">
      {blog.map((item) => (
        <Details blog={item} key={item._id} />
      ))}
    </section>
  );
};

export default BlogDetails;
