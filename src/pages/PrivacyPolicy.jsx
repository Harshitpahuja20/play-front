import React, { useEffect } from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import { Container } from "react-bootstrap";
import BannerSection from "../components/common/BannerSection";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);

  return (
    <div>
      <CustomNavbar />
      <BannerSection title="Privacy Policy" page="Privacy Policy" />
      <Container className="py-5">
        {/* Information We Collect */}
        <div className="d-flex align-items-center gap-3 mb-3">
          <span
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "black",
              borderRadius: "50px",
            }}
          ></span>
          <h5 className="fw-bold mb-0">Information We Collect :</h5>
        </div>

        <p className="ff_r mt-3">
          <strong>Personal Information: </strong>
          We may collect personal information such as your name, email address,
          phone number, and other contact details when you register for an
          account, subscribe to our newsletter, or communicate with us.
        </p>
        <p className="ff_r mt-3">
          <strong>User Data: </strong>
          We may gather data about your usage of Shiksha Sangam, including your
          course history, progress, and interactions with our platform.
        </p>
        <p className="ff_r mt-3">
          <strong>Cookies and Tracking Technologies: </strong>
          We employ cookies and similar tracking technologies to enhance your
          experience on Shiksha Sangam. These technologies assist us in
          personalizing content, analyzing usage patterns, and improving our
          services.
        </p>

        {/* How We Use Your Information */}
        <div className="d-flex align-items-center gap-3 mt-5 mb-3">
          <span
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "black",
              borderRadius: "50px",
            }}
          ></span>
          <h5 className="fw-bold mb-0">How We Use Your Information :</h5>
        </div>
        <p className="ff_r mt-3">
          We utilize the information we collect for the following purposes:
        </p>
        <p className="ff_r mt-3">
          <strong>Provide Services: </strong>
          To deliver the educational services you have requested, including
          courses, assessments, and certifications.
        </p>
        <p className="ff_r mt-3">
          <strong>Personalization: </strong>
          To personalize your learning experience and provide you with relevant
          content and recommendations.
        </p>
        <p className="ff_r mt-3">
          <strong>Analytics: </strong>
          To analyze user behavior and improve our website, services, and
          overall user experience.
        </p>
        <p className="ff_r mt-3">
          <strong>Security: </strong>
          To protect our platform, prevent fraud, and ensure the security of
          your data.
        </p>

        {/* Sharing Your Information */}
        <div className="d-flex align-items-center gap-3 mt-5 mb-3">
          <span
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "black",
              borderRadius: "50px",
            }}
          ></span>
          <h5 className="fw-bold mb-0">Sharing Your Information :</h5>
        </div>

        <p className="ff_r mt-3">
          <strong>Business Transfers: </strong>
          In the event of a merger, acquisition, or sale of assets, your
          information may be transferred to the acquiring entity.
        </p>

        {/* Your Choices and Rights */}
        <div className="d-flex align-items-center gap-3 mt-5 mb-3">
          <span
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "black",
              borderRadius: "50px",
            }}
          ></span>
          <h5 className="fw-bold mb-0">Your Choices and Rights :</h5>
        </div>

        <p className="ff_r mt-3">
          You have the following rights regarding your personal information:
        </p>
        <p className="ff_r mt-3">
          <strong>Access: </strong>
          You can request access to the personal information we hold about you.
        </p>
        <p className="ff_r mt-3">
          <strong>Correction: </strong>
          You can request corrections to any inaccurate or incomplete data.
        </p>
        <p className="ff_r mt-3">
          <strong>Deletion: </strong>
          You can request the deletion of your personal information.
        </p>
        <p className="ff_r mt-3">
          <strong>Opt-Out: </strong>
          You can opt out of receiving promotional emails from us.
        </p>

        {/* Security */}
        <div className="d-flex align-items-center gap-3 mt-5 mb-3">
          <span
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "black",
              borderRadius: "50px",
            }}
          ></span>
          <h5 className="fw-bold mb-0">Security :</h5>
        </div>

        <p className="ff_r mt-3">
          We implement appropriate measures to protect your personal information
          from unauthorized access, disclosure, alteration, or destruction.
          However, no online system is entirely secure, and we cannot guarantee
          the complete security of your data.
        </p>

        {/* Changes to This Privacy Policy */}
        <div className="d-flex align-items-center gap-3 mt-5 mb-3">
          <span
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "black",
              borderRadius: "50px",
            }}
          ></span>
          <h5 className="fw-bold mb-0">Changes to This Privacy Policy :</h5>
        </div>

        <p className="ff_r mt-3">
          We may update this Privacy Policy periodically. Any changes will be
          posted on this page, and the date of the latest revision will be
          indicated at the top.
        </p>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
