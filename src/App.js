import React from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import {useState} from 'react';
const App=() => {
  const pageSize=6;
  const [progress, setProgress] = useState(0);
  const setProgressHandler = (progress) => {
    setProgress(progress);
  };

    return (
      <div style={{ backgroundColor: "#0F172A" , color: "#F8FAFC", minHeight: "100vh" }}>
        <BrowserRouter>
          <Navbar />
            <LoadingBar
        color="#f11946"
        progress={progress}
        height = {3}
        onLoaderFinished={() => setProgress(0)}
      />

          <Routes>
            <Route
              exact
              path="/"
              element={<News setProgress={setProgressHandler}  key="general" category="general" pageSize={pageSize} />}
            ></Route>
            <Route
              exact
              path="/business"
              element={<News setProgress={setProgressHandler}   key="business" category="business" pageSize={pageSize} />}
            ></Route>
            <Route
              exact
              path="/entertainment"
              element={<News setProgress={setProgressHandler}    key="entertainment" category="entertainment" pageSize={pageSize} />}
            ></Route>
            <Route
              exact
              path="/health"
              element={<News setProgress={setProgressHandler} key="health" category="health" pageSize={pageSize} />}
            ></Route>
            <Route
              exact
              path="/science"
              element={<News setProgress={setProgressHandler}  key="science" category="science" pageSize={pageSize} />}
            ></Route>
            <Route
              exact
            
              path="/sports"
              element={<News setProgress={setProgressHandler}  key="sports"  category="sports" pageSize={pageSize} />}
            ></Route>
            <Route
              exact
              path="/technology"
              element={<News setProgress={setProgressHandler}  key="technology" category="technology" pageSize={pageSize} />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

export default App;
