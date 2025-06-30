import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import screen1 from "../assets/image/png/screen1.png";
import screen2 from "../assets/image/png/screen2.png";
import screen3 from "../assets/image/png/screen3.png";
import screen4 from "../assets/image/png/screen4.png";

const images = [screen1, screen2, screen3];

const ScreenDesigns = () => {
  return (
    <div className="container py-4">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {images.map((src, index) => (
          <div className="col" key={index}>
            <div className="p-2 d-flex justify-content-center">
              <img
                src={src}
                alt={`App screen ${index + 1}`}
                className={`img-fluid`}
                style={{
                  minHeight: "400px",
                  maxHeight: "450px",
                  objectFit: "contain",
                  borderRadius: "16px",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScreenDesigns;
