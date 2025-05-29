import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import {
  FaFileAlt,
  FaHeart,
  FaMoneyCheckAlt,
  FaHeadset,
  FaGraduationCap,
  FaCalendarAlt,
  FaTimes,
} from "react-icons/fa";

const featureList = [
  { icon: <FaFileAlt size={32} color="#042641" />, label: "Brochure Details" },
  { icon: <FaHeart size={32} color="#042641" />, label: "Shortlist & Apply" },
  {
    icon: <FaMoneyCheckAlt size={32} color="#042641" />,
    label: "Check Detailed Fees",
  },
  { icon: <FaHeadset size={32} color="#042641" />, label: "24/7 Counselling" },
  {
    icon: <FaGraduationCap size={32} color="#042641" />,
    label: "Scholarships",
  },
  {
    icon: <FaCalendarAlt size={32} color="#042641" />,
    label: "Application Deadlines",
  },
];
const PopupModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="xl" className="ff_r" centered>
      <Modal.Body className="d-flex p-0 position-relative">
        <button
          onClick={handleClose}
          className="position-absolute top-0 end-0 m-1 me-2 border-0 bg-transparent"
          style={{ zIndex: 10 }}
          aria-label="Close"
        >
          <FaTimes size={20} color="#000" />
        </button>
        {/* Left Section */}
        <div className="left-section p-4 w-50">
          <h5 className="mb-4">How Shiksha Sangam helps you in</h5>
          <Row>
            {featureList.map((item, index) => (
              <Col key={index} xs={6} className="mb-4">
                <div className="feature-card py-4 text-center p-3">
                  <div className="mb-2">{item.icon}</div>
                  <div className="fw-medium">{item.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Right Section */}
        <div className="right-section p-4 w-50">
          <h5 className=" fw-bold border-bottom pb-2 mb-4 clr_theme ">
            Enquire Now
          </h5>
          <Form>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Full Name :</Form.Label>
              <Form.Control placeholder="Please enter your full name*" />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Mobile Number :</Form.Label>
              <Form.Control placeholder="Please enter your 10 digits valid mobile number*" />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Select Course :</Form.Label>
              <Form.Select>
                <option>Choose Course</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Select Subject :</Form.Label>
              <Form.Select>
                <option>Choose Course First</option>
              </Form.Select>
            </Form.Group>

            <button className="w-100 w-100 py-2 text-white  fw-bold rounded-2 bg_theme mt-2">
              Apply Now
            </button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PopupModal;
