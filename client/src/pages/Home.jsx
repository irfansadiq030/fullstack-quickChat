import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
