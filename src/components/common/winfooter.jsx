import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const getCurrentYear = () => new Date().getFullYear();

const WinFooter = () => {
  return (
    <div
      
      className="text-center py-3 bg-light"
    >
      <Row className="justify-content-center mb-2 w-100 m-0">
        <Col xs="auto">
          <Link to="/privacy-policy" className="text-decoration-none mx-2">
            Privacy Policy
          </Link>
          |
          <Link to="/terms-of-service" className="text-decoration-none mx-2">
            Terms of Service
          </Link>
          |
          <Link to="/disclaimer" className="text-decoration-none mx-2">
            Disclaimer
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-center w-100 m-0">
        <Col xs="auto">
          <small className="text-muted">
            © {getCurrentYear()}. All rights reserved.
          </small>
        </Col>
      </Row>
    </div>
  );
};

export default WinFooter;
