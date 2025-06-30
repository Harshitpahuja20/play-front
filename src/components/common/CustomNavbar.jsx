import React, { useState } from "react";
import { Navbar, Nav, Container, Button, Offcanvas } from "react-bootstrap";
import logo from "../../../src/assets/image/svg/maineLogo.png";
import { Link } from "react-router-dom";

const CustomNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const handleClose = () => setShowSidebar(false);
  const handleShow = () => setShowSidebar(true);

  return (
    <>
      {/* Main Navbar */}
      <Navbar
        expand="lg"
        className="bg-dark d-flex flex-column align-items-start ff_p pt-0"
      >
        <div className="p-2 w-100">
          <Container>
            <div className="d-flex align-items-center justify-content-between w-100">
              <Navbar.Brand className="w-100">
                <div className="d-flex justify-content-between align-items-center gap-3">
                  <Link to="/" className="pb-0">
                    <img
                      src={logo}
                      alt="logo"
                      style={{ maxHeight: "70px" }}
                      className="minH"
                    />
                  </Link>
                </div>
              </Navbar.Brand>
              <Button
                variant="light"
                onClick={handleShow}
                className="d-lg-none ms-auto"
              >
                <span className="navbar-toggler-icon" />
              </Button>
              <Nav className="d-none d-lg-flex gap-3">
                <a href="#" className="text-white mt-2">
                  Home
                </a>
               <Nav.Link as={Link} to="/result" className="text-white">
                  Result
                </Nav.Link>
                <a href="#contact-us" className="text-white mt-2">
                  Contact
                </a>
              </Nav>
            </div>
          </Container>
        </div>
      </Navbar>

      {/* Mobile Sidebar Navigation */}
      <Offcanvas
        show={showSidebar}
        onHide={handleClose}
        placement="end"
        className="bg-dark text-white"
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>
            <img src={logo} alt="logo" style={{ maxHeight: "60px" }} />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column gap-3">
            <Nav.Link
              as={Link}
              to="/"
              onClick={handleClose}
              className="fs_12 ff_p text-white ps-0"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/result"
              onClick={handleClose}
              className="fs_12 ff_p text-white ps-0"
            >
              Result
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              onClick={handleClose}
              className="fs_12 ff_p text-white ps-0"
            >
              Contact
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CustomNavbar;
