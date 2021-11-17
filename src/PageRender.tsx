import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Loading from "./component/global/Alert/Loading";
import NotFound from "./component/global/NotFound";
import { DataContext } from "./store/GlobalState";
import { IParams } from "./utils/Typescript";

const generatePage = (name: string) => {
  const component = () => require(`./pages/${name}`).default;

  try {
    return React.createElement(component());
  } catch (err) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, slug }: IParams = useParams();
  let name = "";

  if (page) {
    name = slug ? `${page}/[slug]` : `${page}`;
  }

  return generatePage(name);
};

export default PageRender;
