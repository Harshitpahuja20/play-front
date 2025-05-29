import React, { useEffect } from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import BannerSection from "../components/common/BannerSection";
import HomeAboutSection from "../components/homepage/HomeAboutSection";
import AboutContentSection from "../components/aboutPage/AboutContentSection";

const AboutUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);
  return (
    <div>
      <CustomNavbar />
      <BannerSection title="About Us" page="About Us" />
      <HomeAboutSection />
      <AboutContentSection />
    </div>
  );
};

export default AboutUsPage;
