import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { getCurrentUser, login } from "../../services/auth.service";
import { toast } from "react-toastify";
import { useStudy } from "../../context/study.context";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useStudy();
  const [formData, setFormData] = useState({
    fullName: "admin",
    password: "123456",
    role: "admin",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.fullName)
      return toast.warning("Please enter fullName!");

    if (!formData.password || formData.password.length < 3)
      return toast.warning("Password must contain three characters!");

    await login(formData)
      .then(async (res) => {
        if (res.data.status) {
          setFormData({
            fullName: "",
            password: "",
            role: "admin",
          });
          console.log(res?.data)
          localStorage.setItem("token", res?.data?.token);
          await getCurrentUser(res?.data?.token).then((response) => {
            if (response?.data?.status) {
              setCurrentUser(response?.data?.data);
            }
          });
          toast.success("Login Successfully");
        } else {
          return toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.error(`err in contact us ${err?.message}`);
        return toast.error("Something went wrong! Please try again later");
      });
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="w-100 d-flex justify-content-center align-items-center"
    >
      <div className="py-5 w-100">
        <Container className="py-4">
          <Row className=" justify-content-center">
            <Col md={6} lg={4}>
              <div className="card p-4">
                <h4 className=" clr_theme fw-bold mb-0 ff_p">
                  Access Admin Panel
                </h4>
                <p className=" mb-0 ff_p mt-1">
                  Check your all details before submit
                </p>
                <div className="d-flex mt-4 ff_p flex-column">
                  <label htmlFor="EnrollmentNumber">Fullname</label>
                  <input
                    className="mt-2 py-2 px-3"
                    type="text"
                    name="fullName"
                    onChange={handleChange}
                    value={formData?.fullName}
                  />
                </div>
                <div className="d-flex mt-3 ff_p flex-column">
                  <label htmlFor="EnrollmentNumber">Password</label>
                  <input
                    className="mt-2 py-2 px-3"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={formData?.password}
                  />
                </div>
                <button
                  className=" bg_theme w-100 py-2 text-white ff_p border-0 mt-4"
                  onClick={handleSubmit}
                >
                  Get Access
                </button>
                <Link
                  to={"/"}
                  className=" text-center w-100 py-2 ff_p border-0 mt-4 text-dark"
                >
                  <FaArrowLeft className="me-1" />
                  Go to Home
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AdminLogin;
