import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import haryanaImg from "../../assets/image/png/haryanaImg.jpg";

const TopStudyPlaces = () => {
  return (
    <div className="py-5">
      <Container>
        <h4 className=" ff_p mb-0">
          Top study <strong>places</strong>
        </h4>
        <p className=" mb-0 ff_p mt-1">
          Shikshasangam.in is an extensive search engine for education industry
          players.
        </p>
        <Row className="mt-3">
          <Col className="col-lg-2 col-6 mt-3 col-md-4">
            <div className="position-relative">
              <img
                className="w-100 object-fit-cover"
                height={200}
                src={haryanaImg}
                alt="w-100"
              />
              <div className="position-absolute w-100 p-2 ff_p text-white  bottom-0 start-0 bg-black">
                <p className=" mb-0 text-center">Haryana</p>
              </div>
            </div>
          </Col>
          <Col className="col-lg-2 col-6 mt-3 col-md-4">
            <div className="position-relative">
              <img
                className="w-100 object-fit-cover"
                height={200}
                src={haryanaImg}
                alt="w-100"
              />
              <div className="position-absolute w-100 p-2 ff_p text-white  bottom-0 start-0 bg-black">
                <p className=" mb-0 text-center">Haryana</p>
              </div>
            </div>
          </Col>
          <Col className="col-lg-2 col-6 mt-3 col-md-4">
            <div className="position-relative">
              <img
                className="w-100 object-fit-cover"
                height={200}
                src={haryanaImg}
                alt="w-100"
              />
              <div className="position-absolute w-100 p-2 ff_p text-white  bottom-0 start-0 bg-black">
                <p className=" mb-0 text-center">Haryana</p>
              </div>
            </div>
          </Col>
          <Col className="col-lg-2 col-6 mt-3 col-md-4">
            <div className="position-relative">
              <img
                className="w-100 object-fit-cover"
                height={200}
                src={haryanaImg}
                alt="w-100"
              />
              <div className="position-absolute w-100 p-2 ff_p text-white  bottom-0 start-0 bg-black">
                <p className=" mb-0 text-center">Haryana</p>
              </div>
            </div>
          </Col>
          <Col className="col-lg-2 col-6 mt-3 col-md-4">
            <div className="position-relative">
              <img
                className="w-100 object-fit-cover"
                height={200}
                src={haryanaImg}
                alt="w-100"
              />
              <div className="position-absolute w-100 p-2 ff_p text-white  bottom-0 start-0 bg-black">
                <p className=" mb-0 text-center">Haryana</p>
              </div>
            </div>
          </Col>
          <Col className="col-lg-2 col-6 mt-3 col-md-4">
            <div className="position-relative">
              <img
                className="w-100 object-fit-cover"
                height={200}
                src={haryanaImg}
                alt="w-100"
              />
              <div className="position-absolute w-100 p-2 ff_p text-white  bottom-0 start-0 bg-black">
                <p className=" mb-0 text-center">Haryana</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopStudyPlaces;
