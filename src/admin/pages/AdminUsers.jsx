import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Col,
  Row,
  Spinner,
  Table,
  Button,
  Form,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import AddModal from "../components/popup/AddModal";
import { toast } from "react-toastify";
import { getUsers } from "../services/adminUser.service";
import { addBalance } from "../services/transactions.service";

const AdminUsers = () => {
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [selectedUser, setSelectedUser] = useState("");
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [amount, setAmount] = useState(NaN);
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: [null, null],
    status: "",
  });

  function getFormattedDate(isoString) {
    const date = new Date(isoString);
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  const handlePageClick = (event) => {
    const newPage = event.selected + 1; // ReactPaginate is zero-based
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = async (page) => {
    setDataLoading(true);
    const response = await getUsers(page, filters);
    if (response.data.status) {
      setDataLoading(false);
      setTableData(response.data.data);
      setPagination({
        ...pagination,
        // totalPages: response.data.data.totalPages,
      });
    } else {
      setDataLoading(false);
      toast.error("Something went wrong!");
    }
  };

  const handleBalance = async () => {
    if (!amount) return toast.warning("Please add Amount");
    setLoading(true);
    let data = { amount };
    if (selectedUser) {
      data = { ...data, userId: selectedUser?._id };
    }
    await addBalance(data)
      .then((res) => {
        setLoading(false);
        if (res?.data?.status) {
          setSelectedUser(null)
          setAmount(NaN)
          setLoading(false)
          setIsEditPopup(false)
          fetchData(1)
          return toast.success("Added successfully");
        } else {
          return toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(`Error message ${err?.message}`);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="p-3">
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold">
          Users
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mb-3 justify-content-end">
        <Col xs="auto">
          <Button variant="danger" onClick={() => setIsEditPopup(true)}>
            Add Bonus
          </Button>
        </Col>
      </Row>

      <Row className="g-4">
        <div className="table-responsive border p-0 rounded">
          <Table hover responsive className="align-middle mb-0">
            <thead className="bg-dark text-white">
              <tr className="bg-dark text-white">
                <th className="ps-4 py-3 bg-dark text-white">Sr. No.</th>
                <th className="py-3 bg-dark text-white">Full Name</th>
                <th className="py-3 bg-dark text-white">Phone Number</th>
                <th className="py-3 bg-dark text-white">Ref By</th>
                <th className="py-3 bg-dark text-white">Balance</th>
                <th className="py-3 bg-dark text-white">Created At</th>
                <th className="py-3 bg-dark text-white text-center">Action</th>
              </tr>
            </thead>
            {!dataLoading ? (
              <tbody style={{ minHeight: "400px" }}>
                {tableData?.length > 0 ? (
                  tableData.map((data, index) => (
                    <tr key={index}>
                      <td className="ps-4">{index + 1}</td>
                      <td>{data?.fullName}</td>
                      <td>{data?.phoneNumber}</td>
                      <td>{data?.refBy || "N/A"}</td>
                      <td>₹ {data?.balance}</td>
                      <td>{getFormattedDate(data?.createdAt)}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center">
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(data);
                              setIsEditPopup(true);
                            }}
                            className="py-2 px-3"
                          >
                            Add Balance
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-5 fs-6">
                      No Data Found
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

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-3">
          {pagination?.totalPages > 1 && (
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              previousLabel="Prev"
              onPageChange={handlePageClick}
              pageCount={pagination.totalPages}
              forcePage={pagination.currentPage - 1} // Sync with state
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              containerClassName="pagination justify-content-center mt-4"
              pageClassName="page-item"
              pageLinkClassName="page-link rounded px-3 py-2 border-0 shadow-sm"
              previousClassName="page-item"
              previousLinkClassName="page-link rounded px-3 py-2 border-0 shadow-sm"
              nextClassName="page-item"
              nextLinkClassName="page-link rounded px-3 py-2 border-0 shadow-sm"
              breakClassName="page-item"
              breakLinkClassName="page-link rounded px-3 py-2 border-0 shadow-sm"
              activeClassName="active bg-primary text-white"
            />
          )}
        </div>
      </Row>

      {isEditPopup && (
        <AddModal
          show={isEditPopup}
          handleClose={() => {
            setIsEditPopup(false);
            setSelectedUser(null);
            setAmount(NaN);
            setLoading(false)
          }}
          content={
            <>
              <Form.Control
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                className="py-2 px-4 border-1 customInput rounded-2 w-100"
              />
            </>
          }
          onConfirm={handleBalance}
          title={
            selectedUser
              ? `Add balance for ${selectedUser?.fullName}`
              : `Add Bonus for All Users`
          }
          loading={loading}
        />
      )}
    </div>
  );
};

export default AdminUsers;
