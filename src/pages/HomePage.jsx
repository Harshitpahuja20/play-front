import React from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import HomeAboutSection from "../components/homepage/HomeAboutSection";
import ContactUsPage from "./ContactUsPage";
import ScreenDesigns from "./ScreenDesigns";
import WinFooter from "../components/common/winfooter";

const HomePage = () => {
  window.scrollTo({ top: 0, behavior: "instant" });

  return (
    <div>
      <CustomNavbar />
      <HomeAboutSection />
      <ScreenDesigns/>
      <ContactUsPage/>
      <WinFooter/>
    </div>
  );
};

export default HomePage;
