import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const getCurrentYear = () => new Date().getFullYear()

const WinFooter = () => {
  return (
    <div className="bg-light text-center py-3">
      <Row className="justify-content-center mb-2">
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
      <Row className="justify-content-center">
        <Col xs="auto">
          <small className="text-muted">
            © {getCurrentYear()}. rights reserved.
          </small>
        </Col>
      </Row>
    </div>
  )
}

export default WinFooter
