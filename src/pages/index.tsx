import React, { useCallback, useContext, useEffect, useState } from "react";
import LoadingCom from "../component/global/LoadinCom/LoadingCom";
import Nothings from "../component/global/Nothings";
import PaginatePage from "../component/global/PaginatePage";
import Banner from "../component/Home/Banner/Banner";
import CommonBlog from "../component/Home/CommonBlog";
import { DataContext } from "../store/GlobalState";
import { getAPI } from "../utils/FetchData";
import { IBlog } from "../utils/Typescript";

const Home = () => {
  const {state} = useContext(DataContext)
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<object>({ currentPage: 0, offset: 0 });
  const [type, setype] = useState<string>("popular");
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [count, setCount] = useState<number>(0);

  const getBlog = useCallback(
    async (page, type) => {
      setLoading(true);
      const res = await getAPI(
        `blog/get/${type}?page=${page.currentPage + 1}&limit=3`
      );
      setBlogs(res.data.blog);
      setCount(res.data.count);
      setLoading(false);
    },
    [page]
  );
  useEffect(() => {
    getBlog(page, type);
  }, [getBlog]);

  const pageCount = Math.ceil(count / 3);
  const changePage = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * 3;
    setPage({ currentPage: selectedPage, offset: offset });
  };

  const changeType = (data: string) => {
    setPage({ currentPage: 0, offset: 0 });
    setype(data);
  };

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
        <PaginatePage pageCount={pageCount} changePage={changePage} />
      </>
    );
  };

  return (
    <>
      {!state.user.email && <Banner />}
      <section className="home container py-5">
        <h1 className="color">
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
              onClick={() => changeType(`popular`)}
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
              onClick={() => changeType(`recent`)}
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
            {blogData()}
          </div>
          <div
            className="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            {blogData()}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
