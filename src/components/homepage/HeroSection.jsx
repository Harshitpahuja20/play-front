import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import img1 from "../../assets/image/png/banner-1.jpg";
import img2 from "../../assets/image/png/banner-2.jpg";
import img3 from "../../assets/image/png/banner-3.jpg";

const images = [img1, img2, img3];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 300); // Half-second fade transition
    }, 4000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`hero-section position-relative d-flex align-items-end ${
        fade ? "fade-in" : "fade-out"
      }`}
      style={{
        backgroundImage: `url(${images[currentImage]})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "500px",
        height: "100%",
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      {/* Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 1 }}
      ></div>

      {/* Text content */}
      <Container
        style={{ position: "relative", zIndex: 2 }}
        className="h-100 d-flex pb-5 flex-column justify-content-end pb-4"
      >
        <h4 className="heading pb-5 text-white ff_p fw-bold mb-0">
          Welcome to
          <br className="d-lg-block d-none" />
          JBS Institute Of Skill Education
        </h4>
      </Container>
    </div>
  );
};

export default HeroSection;
