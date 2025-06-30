import React, { useEffect, useState } from "react";
import {
  Button,
  Spinner,
  Table,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { getRoundsUser } from "../../services/common.service";

// helper → “YYYY-MM-DD” for <input type="date">
const todayIso = () => new Date().toISOString().substring(0, 10);

const RoundsComponent = () => {
  const [tableData, setTableData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(todayIso());

  const getFormattedDate = (isoString) =>
    new Date(isoString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const getTimeInIST = (isoString, amPm = false) =>
    new Date(isoString).toLocaleTimeString("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: amPm,
    });

  const fetchData = async (filters = {}) => {
    setDataLoading(true);
    try {
      const res = await getRoundsUser(filters);
      if (res?.data?.status) setTableData(res.data.data);
      else toast.error("Something went wrong!");
    } catch (e) {
      toast.error("Network error");
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchData({ date: todayIso() });
  }, []);

  const handleDateChange = (value) => {
    setSelectedDate(value);
    fetchData({ date: value });
  };

  const clearFilter = () => {
    const today = todayIso();
    setSelectedDate(today);
    fetchData({ date: today });
  };

  return (
    <div className="p-3">
      {/* date-picker row */}
      <Row className="align-items-end mb-4">
        <Col xs="12" md="4">
          <Form.Label className="fw-semibold">Results for:</Form.Label>
          <Form.Control
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </Col>
        <Col xs="auto" className="pt-2">
          <Button variant="secondary" onClick={clearFilter}>
            Clear filter
          </Button>
        </Col>
      </Row>

      {/* table */}
      <div className="table-responsive border p-0 rounded" style={{minHeight:'500px'}}>
        <Table hover responsive className="align-middle mb-0">
          <thead className="bg-dark text-white">
            <tr>
              <th className="ps-5 py-3 text-start bg-dark text-white">Sr. No.</th>
              <th className="ps-4 py-3 text-center bg-dark text-white">ID</th>
              <th className="py-3 text-center bg-dark text-white">Time</th>
              <th className="py-3 text-center bg-dark text-white">Status</th>
              <th className="py-3 text-end pe-5 bg-dark text-white">Result</th>
            </tr>
          </thead>

          {!dataLoading ? (
            <tbody>
              {tableData.length ? (
                tableData.map((data, idx) => (
                  <tr key={idx}>
                    <td className="ps-5 text-start">{idx + 1}</td>
                    <td className="ps-4 text-center">{data?.roundId}</td>
                    <td className=" text-center">{getTimeInIST(data.time, true)}</td>
                    <td className=" text-center">{data?.isClosed ? "Closed" : "Open"}</td>
                    <td className=" text-end pe-5">
                      {data?.card?.image ? (
                        <img
                          src={`${process.env.REACT_APP_API_URL}/${data?.card?.image}`}
                          alt="Image"
                          width="70"
                          height="70"
                          className="rounded"
                          style={{ objectFit: "contain", cursor: "pointer" }}
                        />
                      ) : (
                        "Not updated"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-5 fs-6">
                    No data for {getFormattedDate(selectedDate)}
                  </td>
                </tr>
              )}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={5} className="text-center py-5">
                  <Spinner animation="border" />
                </td>
              </tr>
            </tbody>
          )}
        </Table>
      </div>
    </div>
  );
};

export default RoundsComponent;
