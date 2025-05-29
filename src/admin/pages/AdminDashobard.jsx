import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Row, Card } from "react-bootstrap";
import { getStatistics } from "../services/statistics.service";
import { toast } from "react-toastify";

const AdminDashobard = () => {
  const [statistics, setStatistics] = useState({
    verifiedUsers: 0,
    totalBets: 0,
    totalRounds: 0,
    totalCards: 0,
  });

  const handleGetStatistics = async () => {
    await getStatistics()
      .then((res) => {
        if (res.data.status) {
          setStatistics(res.data.data);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  useEffect(() => {
    handleGetStatistics();
  }, []);

  return (
    <div className="p-3">
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          Dashboard
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4">
        <Col md={3} sm={6} xs={12}>
          <Card className="shadow-sm border rounded-3 h-100">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
              <div
                className="text-uppercase fw-semibold mb-3 text-start w-100"
                style={{ fontSize: "12px" }}
              >
                users
              </div>
              <div className="fw-bold fs-3 text-primary">{statistics?.verifiedUsers}</div>
              <div
                className="text-uppercase mt-1 fw-semibold text-primary"
                style={{ fontSize: "12px" }}
              >
                Total Users
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <Card className="shadow-sm border rounded-3 h-100">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
              <div
                className="text-uppercase fw-semibold mb-3 text-start w-100"
                style={{ fontSize: "12px" }}
              >
                cards
              </div>
              <div className="fw-bold fs-3 text-warning">{statistics?.totalCards}</div>
              <div
                className="text-uppercase mt-1 fw-semibold text-warning"
                style={{ fontSize: "12px" }}
              >
                Total Cards
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <Card className="shadow-sm border rounded-3 h-100">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
              <div
                className="text-uppercase fw-semibold mb-3 text-start w-100"
                style={{ fontSize: "12px" }}
              >
                bets
              </div>
              <div className="fw-bold fs-3 text-info">{statistics?.totalBets}</div>
              <div
                className="text-uppercase mt-1 fw-semibold text-info"
                style={{ fontSize: "12px" }}
              >
                Total Bets
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <Card className="shadow-sm border rounded-3 h-100">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center py-4">
              <div
                className="text-uppercase fw-semibold mb-3 text-start w-100"
                style={{ fontSize: "12px" }}
              >
                rounds
              </div>
              <div className="fw-bold fs-3 text-success">{statistics?.totalRounds}</div>
              <div
                className="text-uppercase mt-1 fw-semibold text-success"
                style={{ fontSize: "12px" }}
              >
                Total rounds
              </div>
            </Card.Body>
          </Card>
        </Col>
        

        {/* You can add more cards like this for stats like "Total Enquiries", "New Registrations", etc. */}
      </Row>
    </div>
  );
};

export default AdminDashobard;
