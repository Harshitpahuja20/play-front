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
import { getUsers, addUser as createUser } from "../services/adminUser.service";
import { addBalance } from "../services/transactions.service";

const AdminSubadmins = () => {
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const [dataLoading, setDataLoading] = useState(false);

  // Add Balance popup state
  const [selectedUser, setSelectedUser] = useState(null);
  const [isBalancePopup, setIsBalancePopup] = useState(false);
  const [amount, setAmount] = useState("");

  // Add User popup state
  const [isAddUserPopup, setIsAddUserPopup] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: "",
    phoneNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [filters] = useState({
    dateRange: [null, null],
    status: "",
  });

  const handlePageClick = (event) => {
    const newPage = event.selected + 1; // ReactPaginate is zero-based
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
    fetchData(newPage);
  };

  useEffect(() => {
    fetchData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (page) => {
    setDataLoading(true);
    try {
      const response = await getUsers(page, filters);
      if (response.data.status) {
        setTableData(response.data.data);
        setPagination((prev) => ({
          ...prev,
          // If backend provides total pages, set it here:
          // totalPages: response.data.data.totalPages,
        }));
      } else {
        toast.error("Something went wrong!");
      }
    } catch (e) {
      toast.error("Something went wrong!");
    } finally {
      setDataLoading(false);
    }
  };

  // --- Add Balance flow ---
  const handleBalance = async () => {
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      return toast.warning("Please enter a valid amount");
    }
    setLoading(true);
    let data = { amount: numericAmount };
    if (selectedUser?._id) {
      data = { ...data, userId: selectedUser._id };
    }

    try {
      const res = await addBalance(data);
      if (res?.data?.status) {
        setSelectedUser(null);
        setAmount("");
        setIsBalancePopup(false);
        fetchData(1);
        toast.success("Balance added successfully");
      } else {
        toast.error(res?.data?.message || "Failed to add balance");
      }
    } catch (err) {
      console.log(`Error message ${err?.message}`);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // --- Add User flow ---
  const handleAddUser = async () => {
    const { fullName, phoneNumber, password } = newUser;

    if (!fullName?.trim()) return toast.warning("Full Name is required");
    if (!phoneNumber?.trim()) return toast.warning("Phone Number is required");
    if (!password?.trim()) return toast.warning("Password is required");

    setLoading(true);
    try {
      // Call the admin add service
      const res = await createUser({
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        password: password.trim(),
      });

      if (res?.data?.status) {
        toast.success("User added successfully");
        setNewUser({ fullName: "", phoneNumber: "", password: "" });
        setIsAddUserPopup(false);
        fetchData(1);
      } else {
        toast.error(res?.data?.message || "Failed to add user");
      }
    } catch (err) {
      console.log(`Error message ${err?.message}`);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
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
        <Col xs="auto" className="d-flex gap-2">
          <Button variant="primary" onClick={() => setIsAddUserPopup(true)}>
            Add User
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
                <th className="py-3 bg-dark text-white">Balance</th>
                <th className="py-3 bg-dark text-white text-center">Action</th>
              </tr>
            </thead>

            {!dataLoading ? (
              <tbody style={{ minHeight: "400px" }}>
                {tableData?.length > 0 ? (
                  tableData.map((data, index) => (
                    <tr key={data?._id || index}>
                      <td className="ps-4">{index + 1}</td>
                      <td>{data?.fullName}</td>
                      <td>{data?.phoneNumber}</td>
                      <td>₹ {data?.balance ?? 0}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center">
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(data);
                              setIsBalancePopup(true);
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
                    <td colSpan={5} className="text-center py-5 fs-6">
                      No Data Found
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

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-3">
          {pagination?.totalPages > 1 && (
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              previousLabel="Prev"
              onPageChange={handlePageClick}
              pageCount={pagination.totalPages}
              forcePage={pagination.currentPage - 1}
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

      {/* Add Balance Modal */}
      {isBalancePopup && (
        <AddModal
          show={isBalancePopup}
          handleClose={() => {
            setIsBalancePopup(false);
            setSelectedUser(null);
            setAmount("");
            setLoading(false);
          }}
          content={
            <>
              <Form.Control
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
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

      {/* Add User Modal */}
      {isAddUserPopup && (
        <AddModal
          show={isAddUserPopup}
          handleClose={() => {
            setIsAddUserPopup(false);
            setNewUser({ fullName: "", phoneNumber: "", password: "" });
            setLoading(false);
          }}
          content={
            <div className="d-flex flex-column gap-2">
              <Form.Control
                type="text"
                placeholder="Full Name"
                value={newUser.fullName}
                onChange={(e) =>
                  setNewUser((s) => ({ ...s, fullName: e.target.value }))
                }
                className="py-2 px-4 border-1 customInput rounded-2 w-100"
              />
              <Form.Control
                type="tel"
                placeholder="Phone Number"
                value={newUser.phoneNumber}
                onChange={(e) =>
                  setNewUser((s) => ({ ...s, phoneNumber: e.target.value }))
                }
                className="py-2 px-4 border-1 customInput rounded-2 w-100"
              />
              <Form.Control
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser((s) => ({ ...s, password: e.target.value }))
                }
                className="py-2 px-4 border-1 customInput rounded-2 w-100"
              />
            </div>
          }
          onConfirm={handleAddUser}
          title="Add User"
          loading={loading}
        />
      )}
    </div>
  );
};

export default AdminSubadmins;
