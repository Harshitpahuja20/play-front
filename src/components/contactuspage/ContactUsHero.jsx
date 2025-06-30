import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { contactUs } from "../../services/contact.service";

const ContactUsHero = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    comment: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isEmail = emailRegex.test(formData.email || "");
    if (!formData.fullName) return toast.warning("Full Name is required!");
    if (!formData.phoneNumber || formData.phoneNumber.length < 10)
      return toast.warning("Please Enter a valid Phone Number!");
    if (!formData.email || !isEmail)
      return toast.warning("Please Enter a valid Email!");
    if (!formData.subject) return toast.warning("Subject is required!");
    if (!formData.comment) return toast.warning("Comment is required!");

    await contactUs(formData)
      .then((res) => {
        if (res.data.status) {
          setFormData({
            fullName: "",
            subject: "",
            comment: "",
            phoneNumber: "",
            email: "",
          });
          return toast.success("Request Submitted!");
        } else {
          return toast.error("Something went wrong! Please try again later");
        }
      })
      .catch((err) => {
        console.error(`err in contact us ${err?.message}`);
        return toast.error("Something went wrong! Please try again later");
      });
  };

  return (
    <div className="py-5 ff_p">
      <Container className="py-md-4">
        <Row className=" align-items-start">
          <Col className="pe-md-5 mt-4" md={6}>
            <h4 className="fw-bold mb-0 ">Feel Free To Contact Us</h4>
            <p className=" mb-0 mt-1">
              We are experienced in handling the formalities and
              documentationrequired for your imports and exports. We work with
              all international station to guarantee that your load will safely
              reach without any delays.
            </p>
            <div className="border w-100 my-4"></div>
            <Row>
              <Col md={12}>
                <h6 className="fw-bold mb-0 ">Website :</h6>
                <p className=" mb-0 mt-1">https://www.win10.fun</p>
              </Col>
            </Row>
          </Col>
          <Col md={6} className="mt-4 mt-md-0">
            <Row>
              <Col className="mt-4" md={12}>
                <input
                  className="py-3 px-4 customInput rounded-2 w-100"
                  type="text"
                  placeholder="Full Name"
                  name="fullName"
                  onChange={handleChange}
                  value={formData?.fullName}
                />
              </Col>
              <Col className="mt-4" md={12}>
                <input
                  className="py-3 px-4 customInput rounded-2 w-100"
                  type="number"
                  placeholder="Enter Your Phone Number"
                  name="phoneNumber"
                  onChange={handleChange}
                  value={formData?.phoneNumber}
                />
              </Col>
              <Col className="mt-4" md={12}>
                <textarea
                  name="comment"
                  id="w3review"
                  rows="4"
                  placeholder="Enter Your Query"
                  className="py-3 px-4 customInput rounded-2 w-100"
                  onChange={handleChange}
                  value={formData?.comment}
                ></textarea>
              </Col>
            </Row>
            <div className="d-flex justify-content-start">
              <button
                className=" rounded-2 bg_theme w-100 py-3 text-white ff_p border-0 mt-4"
                onClick={handleSubmit}
              >
                Send Message
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUsHero;
