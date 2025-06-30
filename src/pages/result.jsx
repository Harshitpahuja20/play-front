import React from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import WinFooter from "../components/common/winfooter";
import RoundsComponent from "../components/rounds/RoundsComponent";

const Result = () => {
  return (
    <div>
      <CustomNavbar />
      <RoundsComponent/>
      <WinFooter />
    </div>
  );
};

export default Result;
