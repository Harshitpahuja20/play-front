import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getCurrentUser, login } from "../../services/auth.service";
import { toast } from "react-toastify";
import { useStudy } from "../../context/study.context";

const FranchiseLoginHero = () => {
  const { setCurrentUser } = useStudy();
  const [formData, setFormData] = useState({
    email: "admin@gmail.com",
    password: "admin@123",
    role: "franchise",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isEmail = emailRegex.test(formData.email || "");

    if (!formData.email || !isEmail)
      return toast.warning("Please enter a valid Email!");

    if (!formData.password || formData.password.length < 3)
      return toast.warning("Password must contain three characters!");

    await login(formData)
      .then(async (res) => {
        if (res.data.status) {
          setFormData({
            email: "",
            password: "",
            role: "franchise",
          });

          localStorage.setItem("franchisetoken", res?.data?.data?.token);
          await getCurrentUser(res?.data?.data?.token).then((response) => {
            if (response?.data?.status) {
              setCurrentUser(response?.data?.data?.data);
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
    <div className="py-5">
      <Container className="py-4">
        <Row className=" justify-content-center">
          <Col md={5}>
            <div className="card p-4">
              <h4 className=" clr_theme fw-bold mb-0 ff_p">
                Access Your Panel
              </h4>
              <p className=" mb-0 ff_p mt-1">
                Check your all details before submit
              </p>
              <div className="d-flex mt-4 ff_p flex-column">
                <label htmlFor="EnrollmentNumber">Email</label>
                <input
                  className="mt-2 py-2 px-3"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData?.email}
                />
              </div>
              <div className="d-flex mt-3 ff_p flex-column">
                <label htmlFor="EnrollmentNumber">Password</label>
                <input className="mt-2 py-2 px-3" type="password" name="password"
                    onChange={handleChange}
                    value={formData?.password} />
              </div>
              {/* <span
                className="text-primary mb-0 ff_p mt-1"
                style={{ cursor: "pointer" }}
              >
                Forgot password ?
              </span> */}
              <button className=" bg_theme w-100 py-2 text-white ff_p border-0 mt-4" onClick={handleSubmit}>
                Get Access
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FranchiseLoginHero;
