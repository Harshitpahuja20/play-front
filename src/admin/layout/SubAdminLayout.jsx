import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import SubAdminNavbar from "../components/navbar/SubAdminNavbar";
import SubAdminSidebar from "../components/sidebar/SubAdminSidebar";

const SubAdminLayout = () => {
  // State to handle the visibility of the sidebar on small and medium screens
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  return (
    <>
      {/* Navbar at the top */}
      <SubAdminNavbar />

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
            <SubAdminSidebar /> {/* Sidebar component */}
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

export default SubAdminLayout;
