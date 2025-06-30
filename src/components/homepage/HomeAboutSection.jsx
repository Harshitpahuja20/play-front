import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import aboutImg from "../../assets/image/png/cards.png";
import downloadBtn from "../../assets/image/png/download-btn.png";
import { handleAppDownload } from "../../services/common.service";

const HomeAboutSection = () => {
  return (
    <div className="py-5 ff_p bg-dark" style={{ minHeight: "80vh" }}>
      <Container>
        <Row className="align-items-center text-white bg-dark">
        <Col md={6}>
            <img
              className="w-100 object-fit-contain rounded-3"
              height={450}
              src={aboutImg}
              alt="aboutImg"
            />
          </Col>
          
          <Col md={6} className="mt-4 mt-md-0">
            <h2 className="display-4"><i className="mb-0 mt-2 fw-medium">खेलो और जीतो</i></h2>
           
            <p className=" ff_p mt-3 fs-2">
            Download करने के लिए नीचे दिए गए बटन पर क्लिक करें। 👇👇
            </p>
            <a href="#" className="ps-0 outline-0 cursor-pointer" onClick={()=>handleAppDownload()}>
              <img src={downloadBtn} alt="" className="fit-contain" width={"350"} />
            </a>
          </Col>

         
        </Row>
      </Container>
    </div>
  );
};

export default HomeAboutSection;
