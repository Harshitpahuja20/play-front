import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/image/png/bg.jpg";

const BannerSection = ({ title, page }) => {
  return (
    <div
      className="hero-section py-5 ff_p d-flex align-items-center justify-content-center text-white"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="py-4">
        {" "}
        <div className="text-center py-5">
          <h1 className="fw-bold">{title}</h1>
          <p>
            <Link to="/" className="text-white text-decoration-none">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary fw-semibold">{page}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
