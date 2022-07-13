import React from "react";
import { QueryClient } from "react-query";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";

const Router = () => {
  return (
    <>
      <nav>hehe boi</nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <ToastContainer />
    </>
  );
};

export default Router;
