// src/pages/AdminRounds.jsx
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Spinner,
  Table,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { getRounds, updateRoundResult } from "../services/adminRounds.service";
import AddModal from "../components/popup/AddModal";
import { getCards } from "../services/adminCard.service";
import ViewModal from "../components/popup/ViewModal";

// helper → “YYYY-MM-DD” for <input type="date">
const todayIso = () => new Date().toISOString().substring(0, 10);

const AdminRounds = () => {
  const [tableData, setTableData] = useState([]);
  const [cards, setCards] = useState([]);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [isViewPopup, setIsViewPopup] = useState(false);
  const [cardId, setCardId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(todayIso());

  const getFormattedDate = (isoString) =>
    new Date(isoString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  function getTimeIgnoringTimezone(isoString, amPm = false) {
    return new Date(isoString).toLocaleTimeString("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: amPm,
  });
}

  // fetch rows, optionally filtered
  const fetchData = async (filters = {}) => {
    setDataLoading(true);
    try {
      const res = await getRounds(filters);
      if (res?.data?.status) setTableData(res.data.data);
      else toast.error("Something went wrong!");
    } catch (e) {
      toast.error("Network error");
    } finally {
      setDataLoading(false);
    }
  };

  // first load → today
  useEffect(() => {
    fetchData({ date: todayIso() });
    if (cards?.length === 0) {
      getCardList();
    }
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

  const getCardList = async () => {
    setDataLoading(true);
    const response = await getCards(1, {});
    if (response.data.status) {
      setCards(response.data.data);
    } else {
      toast.error("Something went wrong!");
    }
  };

  const handleResultAdd = async () => {
    if (!selectedData?._id) return toast.warning("try again after refrshing");
    if (!cardId) return toast.warning("try again after refrshing");
    setDataLoading(true);
    await updateRoundResult({
      roundId: selectedData?._id,
      cardId,
    })
      .then((res) => {
        setLoading(false);

        if (res.data.status) {
          setIsEditPopup(false);
          toast.success("Result Updated!");
          setCardId(null);
          setSelectedData(null);
          fetchData({
            date: selectedDate
              ? new Date(selectedDate).toISOString().substring(0, 10)
              : todayIso,
          });
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        setLoading(false);

        toast.error(err?.message);
      });
  };

  return (
    <div className="p-3">
      {/* breadcrumb */}
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          Rounds
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* date-picker row */}
      <Row className="align-items-end mb-3">
        <Col xs="12" md="4">
          <Form.Label className="fw-semibold">Rounds for:</Form.Label>
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
      <div className="table-responsive border p-0 rounded">
        <Table hover responsive className="align-middle mb-0">
          <thead className="bg-dark text-white">
            <tr>
              <th className="ps-4 py-3 bg-dark text-white">Sr. No.</th>
              <th className="ps-4 py-3 bg-dark text-white">ID</th>
              <th className="py-3 bg-dark text-white">Time</th>
              <th className="py-3 bg-dark text-white">Status</th>
              <th className="py-3 bg-dark text-white">Result</th>
              <th className="py-3 bg-dark text-white">Total Bets</th>
              <th className="py-3 bg-dark text-white">Bet Amount</th>
              <th className="py-3 bg-dark text-white text-center">Action</th>
            </tr>
          </thead>

          {!dataLoading ? (
            <tbody>
              {tableData.length ? (
                tableData.map((data, idx) => (
                  <tr key={idx}>
                    <td className="ps-4">{idx + 1}</td>
                    <td className="ps-4">{data?.roundId}</td>
                    <td>{getTimeIgnoringTimezone(data.time, true)}</td>
                    <td>{data?.isClosed ? "Closes" : "Open"}</td>
                    <td className="">
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
                    <td>{data?.totalBetCount}</td>
                    <td>{data?.totalBetSum}</td>
                    <td className="text-center">
                      <Button
                        className="me-3 w-fit-content"
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          if (data?.totalBetCount > 0) {
                            setSelectedData(data);
                            setIsViewPopup(true);
                          }
                        }}
                      >
                        View Bets
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          setSelectedData(data);
                          setIsEditPopup(true);
                        }}
                      >
                        Add Result
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-5 fs-6">
                    No data for {getFormattedDate(selectedDate)}
                  </td>
                </tr>
              )}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={7} className="text-center py-5">
                  <Spinner animation="border" />
                </td>
              </tr>
            </tbody>
          )}
        </Table>
      </div>

      <AddModal
        show={isEditPopup}
        handleClose={() => {
          setIsEditPopup(false);
          setSelectedData(null);
          setCardId(null);
        }}
        size="lg"
        content={
          <Row xs={1} md={4} className="g-2">
            {cards.map((card) => {
              const isActive = card._id === cardId; // match check
              return (
                <Col
                  key={card._id}
                  className="p-2"
                  onClick={() => setCardId(card._id)}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className={[
                      "border",
                      "p-2",
                      "rounded",
                      "d-flex",
                      "justify-content-center",
                      // extra styles when active
                      isActive && "border-success bg-success bg-opacity-25",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <img
                      src={`${process.env.REACT_APP_API_URL}/${card.image}`}
                      alt={card.name}
                      width="100"
                      height="100"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </Col>
              );
            })}
          </Row>
        }
        onConfirm={() => handleResultAdd()}
        title={`Add Result for #${selectedData?.roundId}`}
        loading={loading}
      />

      <ViewModal
        show={isViewPopup}
        handleClose={() => {
          setIsViewPopup(false);
          setSelectedData(null);
        }}
        size="lg"
        content={
          <Row xs={1} md={3} className="g-2">
            {selectedData?.betCards?.map((card) => {
              return (
                <Col
                  key={card._id}
                  className="p-2"
                  onClick={() => setCardId(card._id)}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className={[
                      "border",
                      "p-2",
                      "rounded",
                      "d-flex",
                      "justify-content-center",
                      "align-items-center"
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <div>
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${card?.cardInfo?.image}`}
                        alt={card.name}
                        width="100"
                        height="100"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <div className="fs-6">
                    <span className="text-sm">{card?.cardInfo?.name}</span> <br /> Bets : {card?.betCount} <br /> Amount : {card?.totalBetAmount}
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        }
        title={`Bets of #${selectedData?.roundId}`}
      />
    </div>
  );
};

export default AdminRounds;
