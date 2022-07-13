import React from "react";
import { QueryClient } from "react-query";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Redirect from "./pages/Redirect";
import "react-toastify/dist/ReactToastify.css";

const Router = () => {
  return (
    <>
      <nav>hehe boi</nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/redirect" element={<Redirect />} />
        </Routes>
      </main>
      <ToastContainer theme="dark" />
    </>
  );
};

export default Router;
