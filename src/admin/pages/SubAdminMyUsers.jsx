import React, { useState, useEffect } from "react";
import {
    Breadcrumb,
    Col,
    Row,
    Spinner,
    Button,
    Form,
    Card,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import AddModal from "../components/popup/AddModal";
import { toast } from "react-toastify";
import { getSubAdminUsers } from "../services/adminUser.service";
import { addBalance, withdraw } from "../services/transactions.service";

const SubAdminUses = () => {
    const [tableData, setTableData] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
    });
    const [selectedUser, setSelectedUser] = useState(null);
    const [isAddPopup, setIsAddPopup] = useState(false);
    const [isWithdrawPopup, setIsWithdrawPopup] = useState(false);
    const [amount, setAmount] = useState(NaN);
    const [dataLoading, setDataLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    // ✅ fetch users automatically
    const fetchData = async (page = 1) => {
        setDataLoading(true);
        try {
            const response = await getSubAdminUsers(page);
            if (response.data.status) {
                setTableData(response.data.data);
                setPagination({
                    currentPage: page,
                    totalPages: response.data?.meta?.totalPages || 1,
                });
            } else {
                toast.error("Something went wrong!");
            }
        } catch (err) {
            toast.error("API error occurred");
        }
        setDataLoading(false);
    };

    useEffect(() => {
        fetchData(1);
    }, []);

    const handlePageClick = (event) => {
        const newPage = event.selected + 1;
        setPagination((prev) => ({ ...prev, currentPage: newPage }));
        fetchData(newPage);
    };

    const handleBalance = async (type) => {
        if (!amount) return toast.warning("Please add Amount");
        setLoading(true);

        let data = { amount, userId: selectedUser?.userId };

        try {
            let res;
            if (type === "add") {
                res = await addBalance(data);
            } else if (type === "withdraw") {
                res = await withdraw(data);
            }

            setLoading(false);

            if (res?.data?.status) {
                setSelectedUser(null);
                setAmount(NaN);
                setIsAddPopup(false);
                setIsWithdrawPopup(false);
                fetchData(pagination.currentPage); // refresh

                toast.success(
                    type === "add" ? "Balance added successfully" : "Withdraw successful"
                );
            } else {
                toast.error(res?.data?.message || "Action failed");
            }
        } catch (err) {
            setLoading(false);
            console.error(`Error message ${err?.message}`);
            toast.error("Something went wrong!");
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

            {/* User Cards */}
            <Row className="g-3">
                {!dataLoading ? (
                    tableData?.length > 0 ? (
                        tableData.map((data, index) => (
                            <Col md={6} key={index}>
                                <Card className="p-3 shadow-sm">
                                    <Row>
                                        <Col>
                                            <div>
                                                <strong>{data?.fullName}</strong>
                                                <br />
                                                {data?.phoneNumber}
                                                <br />
                                                ₹ {data?.balance}
                                            </div>
                                        </Col>
                                        <Col className="text-end">
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                className="mt-2"
                                                onClick={() => {
                                                    setSelectedUser(data);
                                                    setIsWithdrawPopup(true);
                                                }}
                                            >
                                                Withdraw
                                            </Button>
                                            <br />
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="mt-2"
                                                onClick={() => {
                                                    setSelectedUser(data);
                                                    setIsAddPopup(true);
                                                }}
                                            >
                                                Add Balance
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <div className="text-center py-5">No Data Found</div>
                    )
                ) : (
                    <div className="text-center py-5 w-100">
                        <Spinner animation="border" />
                    </div>
                )}
            </Row>

            {/* Pagination */}
            {tableData?.length > 0 && pagination?.totalPages > 1 && (
                <div className="d-flex justify-content-center mt-3">
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
                </div>
            )}

            {/* Withdraw Modal */}
            {isWithdrawPopup && (
                <AddModal
                    show={isWithdrawPopup}
                    handleClose={() => {
                        setIsWithdrawPopup(false);
                        setSelectedUser(null);
                        setAmount(NaN);
                        setLoading(false);
                    }}
                    content={
                        <Form.Control
                            type="number"
                            placeholder="Withdraw Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="py-2 px-4 border-1 customInput rounded-2 w-100"
                        />
                    }
                    onConfirm={() => handleBalance("withdraw")}
                    title={`Withdraw for ${selectedUser?.fullName}`}
                    loading={loading}
                />
            )}

            {/* Add Balance Modal */}
            {isAddPopup && (
                <AddModal
                    show={isAddPopup}
                    handleClose={() => {
                        setIsAddPopup(false);
                        setSelectedUser(null);
                        setAmount(NaN);
                        setLoading(false);
                    }}
                    content={
                        <Form.Control
                            type="number"
                            placeholder="Add Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="py-2 px-4 border-1 customInput rounded-2 w-100"
                        />
                    }
                    onConfirm={() => handleBalance("add")}
                    title={`Add balance for ${selectedUser?.fullName}`}
                    loading={loading}
                />
            )}
        </div>
    );
};

export default SubAdminUses;
