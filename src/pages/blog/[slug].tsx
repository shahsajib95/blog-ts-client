import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router";
import Details from "../../component/Blogs/Details";
import Loading from "../../component/global/Alert/Loading";
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

  if (loading) return <Loading />;
  return (
    <section className="blog-details" style={{minHeight: '100vh'}}>
      {blog.map((item, index) => (
        <Details blog={item} key={index} />
      ))}
    </section>
  );
};

export default BlogDetails;
