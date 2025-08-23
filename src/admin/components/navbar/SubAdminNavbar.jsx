import React, { useState } from "react";
import { Navbar, Nav, Container, Button, Offcanvas } from "react-bootstrap";
import { FaUserCircle, FaHome, FaUser } from "react-icons/fa";
import { GiCardRandom } from "react-icons/gi";
import { MdGamepad, MdVerifiedUser } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/image/svg/maineLogo.png";
import { handleLogout } from "../../../services/common.service";

const SubAdminNavbar = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const handleClose = () => setShowSidebar(false);
    const handleShow = () => setShowSidebar(true);
    const location = useLocation();

    const navItems = [
        {
            to: "/subadmin/users",
            label: "Users",
            icon: <FaUser />,
        },
        {
            to: "/subadmin/myusers",
            label: "My Users",
            icon: <FaUser />,
        }
    ];

    const isActive = (path) =>
        location.pathname === path || location.pathname.startsWith(path + "/");

    return (
        <>
            {/* Main Navbar */}
            <Navbar expand="sm" className="d-flex flex-column align-items-start ff_p pt-0 pb-0">
                <div className="bg-light w-100">
                    <Container fluid>
                        <div className="d-flex align-items-center justify-content-between w-100">
                            <Navbar.Brand className="w-100">
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link to="/subadmin/dashboard" className="pb-0">
                                        <div className="d-flex clr_theme align-items-center gap-2">
                                            <h6 className="ff_p fw-bold mb-0">Admin Panel</h6>
                                        </div>
                                    </Link>

                                    <div className="d-lg-block d-none">
                                        <div className="d-flex align-items-center gap-2 clr_theme small">
                                            <FaUserCircle size={32} />
                                            <span className="fs_14 fw-semibold">Sub Admin</span>
                                        </div>
                                    </div>
                                </div>
                            </Navbar.Brand>

                            {/* Mobile toggle */}
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
                            <img width={150} className="rounded-5" src={logo} alt="logo" />
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>

                <div className="px-3">
                    <div className="border my-3 border-2 w-100"></div>
                </div>

                <Offcanvas.Body className="pt-0">
                    <Nav className="flex-column gap-2">
                        <div className="flex-grow-1 px-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={handleClose}
                                    className={`d-flex align-items-center px-4 py-2 mt-3 text-decoration-none text-white ff_p sidebar-link ${isActive(item.to) ? "bg-primary" : ""
                                        }`}
                                >
                                    <span className="me-3">{item.icon}</span>
                                    {item.label}
                                </Link>
                            ))}
                            <button
                                className={`bg-danger rounded px-4 py-2 mt-2 text-white border-0 w-100 text-center`}
                                onClick={handleLogout}
                            >
                                Log out
                            </button>
                        </div>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default SubAdminNavbar;
