import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Alert } from "./component/global/Alert/Notify";
import Navbar from "./component/Navbar/Navbar";
import { DataProvider } from "./store/GlobalState";
import PageRender from "./PageRender";
import Footer from "./component/Footer/Footer";

function App() {


  return (
    <div>
      <DataProvider>
        <Router>
          <Alert />
          <Navbar />
          <Switch>
            <Route exact path="/" component={PageRender} />
            <Route exact path="/:page" component={PageRender} />
            <Route exact path="/:page/:slug" component={PageRender} />
          </Switch>
          <Footer/>
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;
