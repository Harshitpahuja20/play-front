import React, { useEffect } from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import FranchiseLoginHero from "../components/franchiseloginpage/FranchiseLoginHero";
import BannerSection from "../components/common/BannerSection";

const FranchiseLoginPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);
  return (
    <div>
      <CustomNavbar />
      <BannerSection title="My Account" page="My Account" />
      <FranchiseLoginHero />
    </div>
  );
};

export default FranchiseLoginPage;
