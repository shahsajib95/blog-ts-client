import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import LoadingCom from "../component/global/LoadinCom/LoadingCom";
import Nothings from "../component/global/Nothings";
import PaginatePage from "../component/global/PaginatePage";
import CommonBlog from "../component/Home/CommonBlog";
import SearchBox from "../component/Search/SearchBox";
import { getAPI } from "../utils/FetchData";
import { IBlog, InputChange } from "../utils/Typescript";

type Ipage = {
  currentPage: number;
  offset: number;
};

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<Ipage>({ currentPage: 0, offset: 0 });
  const [loading, setLoading] = useState<boolean>(false);

  const handleInput = (e: InputChange) => {
    setSearch(e.target.value);
  };
  const { pathname } = useLocation();

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (search.length < 2) return setBlogs([]);

      try {
        setLoading(true);
        const res = await getAPI(
          `search/blog?title=${search}&page=${page.currentPage + 1}&skip=3`
        );
        setBlogs(res.data.blog);
        setCount(res.data.count);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search, page]);

  useEffect(() => {
    setSearch("");
    setBlogs([]);
  }, [pathname]);

  const pageCount = Math.ceil(count / 3);
  const changePage = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * 3;
    setPage({ currentPage: selectedPage, offset: offset });
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
    <div className="container">
      <SearchBox handleInput={handleInput} />
      {blogData()}
    </div>
  );
};

export default Search;
