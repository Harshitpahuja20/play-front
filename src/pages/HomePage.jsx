import React from "react";
import HeroSection from "../components/homepage/HeroSection";
import WelcomeSection from "../components/homepage/WelcomeSection";
import NoticeSection from "../components/homepage/NoticeSection";
import CustomNavbar from "../components/common/CustomNavbar";
import TopStudyPlaces from "../components/homepage/TopStudyPlaces";
import HomeAboutSection from "../components/homepage/HomeAboutSection";

const HomePage = () => {
  window.scrollTo({ top: 0, behavior: "instant" });

  return (
    <div>
      <CustomNavbar />
      <HomeAboutSection />
    </div>
  );
};

export default HomePage;
