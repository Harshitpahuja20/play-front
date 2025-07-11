import React, { useEffect, useState } from "react";
import { getAllResults } from "../../services/common.service";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const Homeresult2 = () => {
  const [tableData, setTableData] = useState({ hours: [], rows: [] });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAllResults(Infinity);
      if (res?.data?.status) {
        const result = organizeData(res.data.data);
        setTableData(result);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (e) {
      toast.error("Network error");
    }
  };

  const organizeData = (data) => {
    const todayDate = new Date().toISOString().split("T")[0];
    const nowHour = new Date().getHours();

    // Format hours into 12-hour clock
    const hours = Array.from({ length: 24 }, (_, i) => {
      const period = i < 12 ? "AM" : "PM";
      const hour12 = i % 12 === 0 ? 12 : i % 12;
      return `${hour12} ${period}`;
    });

    // For each date, build 24-hour slots
    const rows = data.map((d) => {
      const hourly = Array(24).fill(null);
      d.rounds?.forEach((round) => {
        const hour = new Date(round.time).getHours();
        hourly[hour] = round.image;
      });

      const values = hourly.map((img, i) => {
        if (img) return img;
        if (d._id === todayDate) return i > nowHour ? "Not Started" : "Wait";
        return "N/A";
      });

      return {
        label: d._id,
        values,
      };
    });

    return { hours, rows };
  };

  function getNextDate(dateStr) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + 1); // add 1 day

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
  const dd = String(date.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
}


  return (
    <div className="container mt-4 px-2">
      <h5 className="mb-3 fw-semibold">सब दिनों का परिणाम</h5>

      <div style={{ overflowX: "auto" }}>
        <table
          className="table table-bordered text-center mb-0"
          style={{
            minWidth: "900px",
            whiteSpace: "nowrap",
            borderCollapse: "collapse",
          }}
        >
          <thead className="bg-dark text-white">
            <tr>
              <th>
               
              </th>
              {tableData.hours.map((hour, idx) => (
                <th
                  key={idx}
                  style={{
                    padding: "6px 8px",
                    fontSize: "0.85rem",
                    minWidth: "120px",
                    whiteSpace: "nowrap",
                  }}
                >
                    <br />
                  {hour}
                  <br />
                  <br />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                <td
                  className="fw-bold bg-light text-start"
                  style={{
                    whiteSpace: "nowrap",
                    fontSize: "0.9rem",
                    minWidth: "120px",
                    zIndex: 1,
                  }}
                >
                  {getNextDate(row.label)}
                </td>
                {row.values.map((cell, colIdx) => (
                  <td key={colIdx} className="p-1 align-middle">
                    {cell?.startsWith("card") ? (
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${cell}`}
                        alt="card"
                        style={{
                          width: 50,
                          height: 70,
                          objectFit: "cover",
                          borderRadius: 4,
                        }}
                      />
                    ) : (
                      <small className="text-muted">{cell || "-"}</small>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Homeresult2;
