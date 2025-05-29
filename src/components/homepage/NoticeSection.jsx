import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "react-bootstrap";
import noticeImg from "../../assets/image/png/noticeImg.jpg";

const notices = [
  {
    img: noticeImg,
    title: "Admission Start For Session 2023-204",
    buttonText: "Center Login",
  },
  {
    img: noticeImg,
    title: "Apply For Online Admission",
    buttonText: "Apply Now",
  },
  {
    img: noticeImg,
    title: "Admission Start For Session 2023-204",
    buttonText: "Center Login",
  },
  {
    img: noticeImg,
    title: "New Batch Admission Started",
    buttonText: "Apply Now",
  },
];

const Arrow = ({ className, style, onClick, direction }) => (
  <div
    className={`custom-arrow d-md-flex d-none ${direction}`}
    onClick={onClick}
  >
    {direction === "left" ? <FaArrowLeft /> : <FaArrowRight />}
  </div>
);

const NoticeBoardSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <Arrow direction="right" />,
    prevArrow: <Arrow direction="left" />,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="noticeboard-section ff_p py-5">
      <Container>
        <p className="section-subtitle mb-0 ff_p clr_theme">
          जेबीएस इंस्टीट्यूट ऑफ स्किल एजुकेशन
        </p>
        <h2 className="section-title mt-2">Notice Board</h2>
        <Slider {...settings}>
          {notices.map((notice, index) => (
            <div className="notice-card" key={index}>
              <div className="card-content text-start">
                <img src={notice.img} alt="Notice" />
                <h4>{notice.title}</h4>
                <button>{notice.buttonText}</button>
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

export default NoticeBoardSlider;
