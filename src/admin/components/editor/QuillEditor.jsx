import React, { useEffect, useMemo } from "react";
import ReactQuill from "react-quill";
import Quill from "quill";
import "react-quill/dist/quill.snow.css";

// Define the font size whitelist
const fontSizeArray = [
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "30px",
  "36px",
  "48px",
];

const Size = Quill.import("attributors/style/size");
Size.whitelist = fontSizeArray;
Quill.register(Size, true);

const QuillEditor = ({ value, onChange, modules, placeholder }) => {
  const defaultModules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ font: [] }],
        //   [{ size: ["small" , "large"] }],
          [{ align: [] }],
          ["link", "image"],
        ],
      },
    }),
    []
  );

  const finalModules = modules
    ? { ...defaultModules, ...modules }
    : defaultModules;

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme="snow"
      modules={finalModules}
      placeholder={placeholder}
      style={{ marginBottom: "50px" }}
    />
  );
};

export default QuillEditor;
