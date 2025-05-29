import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  FaRegClock,
  FaUniversity,
  FaChalkboardTeacher,
  FaNetworkWired,
} from "react-icons/fa"; // Import icons

const WelcomeSection = () => {
  return (
    <div className="py-5 ">
      <Container>
        <h3 className=" ff_p mb-0 ">
          JBS Institute Of Skill Education <strong>Advantages</strong>
        </h3>
        <Row className="mt-3">
          <Col className="col-md-3 col-sm-6 mt-4">
            <div
              className="card p-4 border-0 h-100"
              style={{ backgroundColor: "#FEF5DF" }}
            >
              <FaRegClock size={40} className="mb-3" />
              <h6 className=" ff_p fw-bold mb-0 ">
                Flexible & convenient schedule
              </h6>
              <p className=" ff_p mb-0 mt-2">
                Balance your academic pursuits with personal and professional
                commitments by learning anywhere and at any time, as per your
                convenience.
              </p>
            </div>
          </Col>
          <Col className="col-md-3 col-sm-6 mt-4">
            <div
              className="card p-4 border-0 h-100 "
              style={{ backgroundColor: "#E9F4FC" }}
            >
              <FaUniversity size={40} className="mb-3" />
              <h6 className=" ff_p fw-bold mb-0 ">
                At par with on-campus degrees
              </h6>
              <p className=" ff_p mb-0 mt-2">
                Access UGC-entitled online degrees that are at par with
                on-campus degrees and accepted for govt. or corporate jobs and
                higher education.
              </p>
            </div>
          </Col>
          <Col className="col-md-3 col-sm-6 mt-4">
            <div
              className="card p-4 border-0 h-100 "
              style={{ backgroundColor: "#FEF5DF" }}
            >
              <FaChalkboardTeacher size={40} className="mb-3" />
              <h6 className=" ff_p fw-bold mb-0 ">
                Experienced faculty & mentors
              </h6>
              <p className=" ff_p mb-0 mt-2">
                Acquire quality education and guidance from esteemed faculty and
                mentors who share their expertise and practical knowledge.
              </p>
            </div>
          </Col>
          <Col className="col-md-3 col-sm-6 mt-4">
            <div
              className="card p-4 border-0 h-100 "
              style={{ backgroundColor: "#F5FFD9" }}
            >
              <FaNetworkWired size={40} className="mb-3" />
              <h6 className=" ff_p fw-bold mb-0 ">Shiksha Sangam network</h6>
              <p className=" ff_p mb-0 mt-2">
                Be a part of the prestigious Manipal alumni network to build
                connections and to gain easy access to a wide range of career
                opportunities.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WelcomeSection;
