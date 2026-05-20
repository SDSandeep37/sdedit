import React from "react";
import Navbar from "./Desgins/Navbar/Navbar";
import Banner from "./Desgins/Banner/Banner";
import Community from "./Desgins/Community/Community";
import Features from "./Desgins/Features/Features";
import RealTime from "./Desgins/RealTime/RealTime";
import JoinUs from "./Desgins/JoinUs/JoinUs";
import Footer from "./Desgins/Footer/Footer";

const Home = () => {
  return (
    <div>
      <Banner />
      <Community />
      <Features></Features>
      <RealTime />
      <JoinUs />
    </div>
  );
};

export default Home;
