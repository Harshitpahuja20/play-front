import React, { useState } from "react";
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
import { getUsersforSubAdmin } from "../services/adminUser.service";
import { addBalance } from "../services/transactions.service";

const SubAdminUses = () => {
    const [tableData, setTableData] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
    });
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditPopup, setIsEditPopup] = useState(false);
    const [amount, setAmount] = useState(NaN);
    const [dataLoading, setDataLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const getFormattedDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const handlePageClick = (event) => {
        const newPage = event.selected + 1;
        setPagination((prev) => ({ ...prev, currentPage: newPage }));
        fetchData(newPage, searchQuery);
    };

    const fetchData = async (page, query = "") => {
        setDataLoading(true);
        try {
            const response = await getUsersforSubAdmin(query);
            if (response.data.status) {
                setTableData(response.data.data);
                setPagination((prev) => ({
                    ...prev,
                    // totalPages: response.data.data.totalPages,
                }));
            } else {
                toast.error("Something went wrong!");
            }
        } catch (err) {
            toast.error("API error occurred");
        }
        setDataLoading(false);
    };

    const handleSearch = () => {
        if (!/^\d+$/.test(searchQuery)) {
            return toast.warning("Only digits (0-9) allowed");
        }
        if (searchQuery.length < 3) {
            return toast.warning("Please enter at least 3 digits");
        }
        fetchData(1, searchQuery);
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
                    setSelectedUser(null);
                    setAmount(NaN);
                    setIsEditPopup(false);
                    fetchData(1, searchQuery); // refresh after adding balance
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

            {/* Search bar */}
            <Row className="mb-3">
                <div className="d-flex w-100 gap-2">
                    <Form.Control
                        type="text"
                        placeholder="Search by phone number"
                        value={searchQuery}
                        onChange={(e) =>
                            setSearchQuery(e.target.value.replace(/[^0-9]/g, ""))
                        }
                    />
                    <Button variant="primary" onClick={handleSearch}>
                        Search
                    </Button>
                </div>
            </Row>


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
                                            </div>
                                        </Col>
                                        <Col className="text-end">
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="mt-2"
                                                onClick={() => {
                                                    setSelectedUser(data);
                                                    setIsEditPopup(true);
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
            {tableData?.length > 0 && (
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
            )}

            {isEditPopup && (
                <AddModal
                    show={isEditPopup}
                    handleClose={() => {
                        setIsEditPopup(false);
                        setSelectedUser(null);
                        setAmount(NaN);
                        setLoading(false);
                    }}
                    content={
                        <Form.Control
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="py-2 px-4 border-1 customInput rounded-2 w-100"
                        />
                    }
                    onConfirm={handleBalance}
                    title={`Add balance for ${selectedUser?.fullName}`
                    }
                    loading={loading}
                />
            )}
        </div>
    );
};

export default SubAdminUses;
