import whatsaapIcon from "../../assets/image/png/whatsapp.png";
import callIcon from "../../assets/image/png/telephone.png";

const TopToBottom = () => {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: "345678",
        }}
      >
        <div className="d-flex flex-column ">
          <img width={40} height={40} src={callIcon} alt="top_arrow" />
          <img
            className="mt-2"
            width={40}
            height={40}
            src={whatsaapIcon}
            alt="top_arrow"
          />
        </div>
      </div>
    </div>
  );
};

export default TopToBottom;
