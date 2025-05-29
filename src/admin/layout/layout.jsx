import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import Sidebar from "../components/sidebar/sidebar"; // Your custom Sidebar component
import AdminNavbar from "../components/navbar/navbar";
// import "./AdminLayout.css"; // Import the custom styles

const AdminLayout = () => {
  // State to handle the visibility of the sidebar on small and medium screens
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  return (
    <>
      {/* Navbar at the top */}
      <AdminNavbar />

      {/* Backdrop that covers the screen when the sidebar is visible */}
      {sidebarVisible && (
        <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
      )}

      {/* Main content layout */}
      <Container fluid className="h-100 pt-0">
        <Row className="h-100">
          {/* Sidebar (Drawer style) */}
          <Col
            xs={0}
            lg={2}
            className={`sidebar-drawer bg-red p-3 ${
              sidebarVisible ? "sidebar-visible" : ""
            }`}
          >
            <Sidebar /> {/* Sidebar component */}
          </Col>

          {/* Main content area */}
          <Col xs={12} lg={10} className="p-md-4 p-0">
            <Outlet /> {/* Dynamic pages rendered here */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLayout;
