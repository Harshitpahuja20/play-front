import React, { useEffect } from "react";
import CustomNavbar from "../components/common/CustomNavbar";
import BannerSection from "../components/common/BannerSection";
import { Container } from "react-bootstrap";

const TermsAndConditionsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);

  return (
    <div>
      <CustomNavbar />
      <BannerSection title="Terms & Conditions" page="Terms & Conditions" />
      <Container className="py-5">
        <div className="d-flex align-items-center gap-3 mb-4">
          <span
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "black",
              borderRadius: "50px",
            }}
          ></span>
          <h5 className="fw-bold mb-0">Use of Services :</h5>
        </div>
        <p>
          <strong>Eligibility:</strong> You must be at least 18 years old or
          have the legal capacity in your jurisdiction to use Shiksha Sangam.
          Minors under 18 must have parental or guardian consent.
        </p>
        <p>
          <strong>Account Registration:</strong> You may need to create an
          account to access certain features. You are responsible for
          maintaining the confidentiality of your account information.
        </p>
        <p>
          <strong>Accuracy of Information:</strong> You agree to provide
          accurate and complete information during registration and to update
          your information as necessary to keep it accurate.
        </p>

        <div className="d-flex align-items-center gap-3 my-4">
          <span
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "black",
              borderRadius: "50px",
            }}
          ></span>
          <h5 className="fw-bold mb-0">Admission and Participation</h5>
        </div>
        <p>
          <strong>Course Enrollment:</strong> Enrollment in courses on Shiksha
          Sangam is subject to availability. We reserve the right to cancel or
          modify courses at our discretion.
        </p>
        <p>
          <strong>Code of Conduct:</strong> You agree to abide by a code of
          conduct that promotes respectful and constructive interactions with
          instructors and fellow learners. Any violations may result in
          suspension or termination of your account.
        </p>
        <p>
          <strong>Intellectual Property:</strong> All course materials,
          including text, videos, and assessments, are the intellectual property
          of Shiksha Sangam or our instructors. You may not reproduce,
          distribute, or modify these materials without permission.
        </p>

        <div className="d-flex align-items-center gap-3 my-4">
          <span
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "black",
              borderRadius: "50px",
            }}
          ></span>
          <h5 className="fw-bold mb-0">Fees and Payments</h5>
        </div>
        <p>
          <strong>Payment:</strong> You agree to pay all fees associated with
          courses or services you purchase on Shiksha Sangam. Payment is due
          upon enrollment, and we may use third-party payment processors to
          facilitate transactions.
        </p>
        <p>
          <strong>Refunds:</strong> Refund policies are determined by course
          instructors and may vary. Please review the refund policy for each
          course before enrolling.
        </p>

        <div className="d-flex align-items-center gap-3 my-4">
          <span
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "black",
              borderRadius: "50px",
            }}
          ></span>
          <h5 className="fw-bold mb-0">
            Disclaimers and Limitations of Liability
          </h5>
        </div>
        <p>
          <strong>Disclaimer:</strong> Shiksha Sangam provides educational
          content, but we do not guarantee the accuracy or completeness of
          course materials. We are not responsible for any errors or omissions.
        </p>
        <p>
          <strong>Limitation of Liability:</strong> To the extent permitted by
          law, Shiksha Sangam shall not be liable for any indirect,
          consequential, or incidental damages arising out of your use of our
          platform.
        </p>

        <div className="d-flex align-items-center gap-3 my-4">
          <span
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "black",
              borderRadius: "50px",
            }}
          ></span>
          <h5 className="fw-bold mb-0">Changes to Terms and Conditions</h5>
        </div>
        <p>
          <strong>Modification:</strong> We reserve the right to modify these
          Terms and Conditions at any time. Any changes will be posted on this
          page, and the date of the latest revision will be indicated at the
          top.
        </p>

        <div className="d-flex align-items-center gap-3 my-4">
          <span
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "black",
              borderRadius: "50px",
            }}
          ></span>
          <h5 className="fw-bold mb-0">Governing Law</h5>
        </div>
        <p>
          <strong>Jurisdiction:</strong> These terms and conditions shall be
          governed by and construed in accordance with the laws of India without
          regard to its conflicts of law principles. The User agrees to submit
          to the sole jurisdiction and venue for any dispute that may arise
          under or in relation to the subject matter in Fatehabad court
          jurisdiction, India only.
        </p>

        <div className="d-flex align-items-center gap-3 my-4">
          <span
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "black",
              borderRadius: "50px",
            }}
          ></span>
          <h5 className="fw-bold mb-0">Contact Us</h5>
        </div>
        <p>
          <strong>Contact Information:</strong> If you have any questions or
          concerns about these Terms and Conditions, please contact us at{" "}
          <a href="mailto:shiskhasangamindia@gmail.com">
            shiskhasangamindia@gmail.com
          </a>
        </p>

        <p className="mt-5">
          Thank you for choosing Shiksha Sangam. We look forward to providing
          you with a valuable educational experience.
        </p>
      </Container>
    </div>
  );
};

export default TermsAndConditionsPage;
