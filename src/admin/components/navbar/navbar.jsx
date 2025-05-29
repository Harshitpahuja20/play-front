import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Button,
  Offcanvas,
} from "react-bootstrap";

import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaChevronDown,
  FaMinus,
  FaPlus,
  FaTools,
} from "react-icons/fa";
import logo from "../../../assets/image/svg/maineLogo.png";

const AdminNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const handleClose = () => setShowSidebar(false);
  const handleShow = () => setShowSidebar(true);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // state to manage dropdown toggle

  const navItems = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/about", label: "About", icon: <FaInfoCircle /> },
    { to: "/contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  // Toggle function for dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleOffcanvas = () => setShow((prev) => !prev);

  return (
    <>
      {/* Top Red Bar */}

      {/* Main Navbar */}
      <Navbar
        expand="sm"
        className="  d-flex flex-column align-items-start ff_p  pt-0 pb-0"
      >
        <div className="bg-light w-100">
          <Container fluid>
            <div className="d-flex align-items-center justify-content-between w-100">
              <Navbar.Brand className="w-100">
                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/" className="pb-0">
                    <div className="d-flex clr_theme align-items-center gap-2">
                      <h6 className="ff_p  fw-bold mb-0">Admin Panel</h6>
                    </div>
                  </Link>

                  <div className="d-lg-block d-none">
                    <div className="d-flex  align-items-center gap-2 clr_theme small">
                      <FaUserCircle size={32} />
                      <span className=" fs_14 fw-semibold">Rahul Jangra</span>
                    </div>
                  </div>
                </div>
              </Navbar.Brand>
              <Button
                variant="light"
                onClick={handleShow}
                className="d-lg-none ms-auto"
              >
                <span className="navbar-toggler-icon" />
              </Button>
            </div>
          </Container>
        </div>
      </Navbar>

      {/* Mobile Sidebar Navigation */}
      <Offcanvas
        className="Side bg-dark"
        show={showSidebar}
        onHide={handleClose}
        placement="end"
      >
        <Offcanvas.Header closeButton className="text-white">
          <Offcanvas.Title>
            <div className="d-flex align-items-center justify-content-center gap-2 cursor-pointer py-3 border-0 border-secondary fs-5 fw-bold">
              <img width={150} className=" rounded-5" src={logo} alt="logo" />
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <div className="px-3">
          <div className="border my-3  border-2 w-100"></div>
        </div>
        <Offcanvas.Body className="pt-0">
          <Nav className="flex-column gap-2">
            <div className="flex-grow-1 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`d-flex align-items-center px-4 py-2 mt-3 text-decoration-none text-white ff_p sidebar-link ${
                    location.pathname === item.to ? "bg-primary" : ""
                  }`}
                >
                  <span className="me-3">{item.icon}</span>
                  {item.label}
                </Link>
              ))}

              {/* Dropdown Menu */}
              <div className={`w-100 mt-3`}>
                <div
                  onClick={toggleDropdown}
                  className={`text-white px-4 py-2 w-100 align-items-center  text-start sidebar-link dropdown-toggle ${
                    location.pathname.includes("/services")
                      ? "bg-primary d-flex justify-content-between align-items-center"
                      : " d-flex justify-content-between align-items-center "
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  <span className="me-3">
                    {" "}
                    <span className="me-3">
                      <FaTools />
                    </span>
                    Services
                  </span>
                  <span>
                    {" "}
                    {isDropdownOpen ? (
                      <FaMinus size={12} />
                    ) : (
                      <FaPlus size={12} />
                    )}{" "}
                  </span>
                  {/* Plus/Minus Toggle */}
                </div>

                {isDropdownOpen && (
                  <div className=" mt-2 px-3">
                    <div className="bg-dark w-100">
                      <Link
                        to="/services/design"
                        className="text-white ff_p border-bottom border-2 d-block px-4 py-2"
                      >
                        Design
                      </Link>
                      <Link
                        to="/services/development"
                        className="text-white ff_p border-bottom border-2 d-block px-4 py-2"
                      >
                        Development
                      </Link>
                      <Link
                        to="/services/marketing"
                        className="text-white ff_p border-bottom border-2 d-block px-4 py-2"
                      >
                        Marketing
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AdminNavbar;
