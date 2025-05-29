// import React, { useEffect, useRef, useState } from "react";
// import {
//   Breadcrumb,
//   Col,
//   Row,
//   Spinner,
//   Table,
//   Button,
//   Form,
// } from "react-bootstrap";
// import ReactPaginate from "react-paginate";
// import BrokenImage from "../../assets/image/png/broken-image.png";
// import mediaPicker from "../../assets/image/png/media-picker.png";
// import AddModal from "../components/popup/AddModal";
// import DeleteModal from "../components/popup/DeleteModal";
// import { toast } from "react-toastify";
// import { IoIosCloseCircle } from "react-icons/io";
// import {
//   addPlace,
//   deletePlace,
//   getPlaces,
//   updatePlace,
// } from "../services/adminPlaces.service";
// import { FaTrash } from "react-icons/fa";
// import { BsFillPencilFill } from "react-icons/bs";

// const AdminPlaces = () => {
//   const [tableData, setTableData] = useState([]);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//   });
//   const [selectedId, setSelectedId] = useState("");
//   const [isDeletePopup, setIsDeletePopup] = useState(false);
//   const [isAddPopup, setIsAddPopup] = useState(false);
//   const [isEditPopup, setIsEditPopup] = useState(false);
//   const [isEditData, setIsEditData] = useState(null);
//   const [loading, setIsLoading] = useState(false);
//   const [dataLoading, setDataLoading] = useState(false);
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const imageRef = useRef();
//   const [filters, setFilters] = useState({
//     dateRange: [null, null],
//     status: "",
//   });

//   function getFormattedDate(isoString) {
//     const date = new Date(isoString);
//     const options = {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//     };
//     return date.toLocaleDateString("en-US", options);
//   }

//   const handlePageClick = (event) => {
//     const newPage = event.selected + 1; // ReactPaginate is zero-based
//     setPagination((prev) => ({ ...prev, currentPage: newPage }));
//   };

//   useEffect(() => {
//     fetchData(1);
//   }, []);

//   const fetchData = async (page) => {
//     setDataLoading(true);
//     const response = await getPlaces(page, filters);
//     if (response.data.status) {
//       setDataLoading(false);
//       setTableData(response.data.data);
//       setPagination({
//         ...pagination,
//         totalPages: response.data.data.totalPages,
//       });
//     } else {
//       setDataLoading(false);
//       toast.error("Something went wrong!");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       if (selectedId) {
//         await deletePlace(selectedId).then((response) => {
//           if (response.data.status) {
//             toast.success(response.data.message);
//             fetchData({
//               page: pagination.currentPage,
//             });
//             setIsDeletePopup(false);
//             setSelectedId("");
//           } else {
//             toast.error(response.data.message);
//           }
//         });
//       }
//     } catch (error) {
//       toast.error("Something went wrong!");
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files?.[0]; // Get the first selected file
//     if (file) {
//       setFile(file);
//     }
//   };

//   const handleAddCleaningType = async () => {
//     try {
//       if (!title) return toast.warning("Title is required!");
//       if (!file) return toast.warning("Icon is required!");
//       setIsLoading(true);
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("place", file);
//       await addPlace(formData).then((res) => {
//         if (res.data.status) {
//           toast.success("Added Successfully");
//           setIsLoading(false);
//           fetchData({ page: pagination.currentPage });
//           setIsAddPopup(false);
//           setTitle("");
//           setFile(null);
//         } else {
//           toast.error(res.data.message);
//           setIsLoading(false);
//         }
//       });
//     } catch (error) {
//       setIsLoading(false);
//       toast.error("Something went wrong!");
//       console.log(error?.message);
//     }
//   };

//   const handleUpdateCleaningType = async () => {
//     try {
//       if (!isEditData?.title) return toast.warning("Title is required!");
//       setIsLoading(true);
//       const formData = new FormData();
//       formData.append("title", isEditData?.title);
//       formData.append("id", isEditData?._id);
//       if (file) {
//         formData.append("place", file);
//       }

//       await updatePlace(formData).then((res) => {
//         if (res.data.status) {
//           toast.success("Updated Successfully");
//           setIsLoading(false);
//           fetchData({ page: pagination.currentPage });
//           setIsEditPopup(false);
//           setIsEditData(null);
//           setFile(null);
//         } else {
//           toast.error(res.data.message);
//           setIsLoading(false);
//         }
//       });
//     } catch (error) {
//       setIsLoading(false);
//       toast.error("Something went wrong!");
//       console.log(error?.message);
//     }
//   };

//   return (
//     <div className="p-3">
//       <Breadcrumb>
//         <Breadcrumb.Item href="/admin/dashboard">Home</Breadcrumb.Item>
//         <Breadcrumb.Item active className="fw-semibold">
//           Places
//         </Breadcrumb.Item>
//       </Breadcrumb>

//       <Row className="mb-3 justify-content-end">
//         <Col xs="auto">
//           <Button variant="danger" onClick={() => setIsAddPopup(true)}>
//             Add
//           </Button>
//         </Col>
//       </Row>

//       <Row className="g-4">
//         <div className="table-responsive border p-0 rounded">
//           <Table hover responsive className="align-middle mb-0">
//             <thead className="bg-dark text-white">
//               <tr className="bg-dark text-white">
//                 <th className="ps-4 py-3 bg-dark text-white">Sr. No.</th>
//                 <th className="py-3 bg-dark text-white">Title</th>
//                 <th className="py-3 bg-dark text-white">Image</th>
//                 <th className="py-3 bg-dark text-white">Created At</th>
//                 <th className="py-3 bg-dark text-white text-center">Action</th>
//               </tr>
//             </thead>
//             {!dataLoading ? (
//               <tbody style={{ minHeight: "400px" }}>
//                 {tableData?.length > 0 ? (
//                   tableData.map((data, index) => (
//                     <tr key={index}>
//                       <td className="ps-4">{index + 1}</td>
//                       <td>{data?.title}</td>
//                       <td>
//                         <img
//                           src={
//                             data?.image
//                               ? `${process.env.REACT_APP_API_URL}/${data?.image}`
//                               : BrokenImage
//                           }
//                           alt="Image"
//                           width="60"
//                           height="60"
//                           className="rounded"
//                           style={{ objectFit: "cover", cursor: "pointer" }}
//                         />
//                       </td>
//                       <td>{getFormattedDate(data?.createdAt)}</td>
//                       <td className="text-center">
//                         <div className="d-flex justify-content-center">
//                           <Button
//                             variant=""
//                             size="sm"
//                             onClick={() => {
//                               setSelectedId(data?._id);
//                               setIsDeletePopup(true);
//                             }}
//                           >
//                             <FaTrash />
//                           </Button>
//                           <Button
//                             variant=""
//                             size="sm"
//                             onClick={() => {
//                               setIsEditData(data);
//                               setIsEditPopup(true);
//                             }}
//                           >
//                             <BsFillPencilFill />
//                           </Button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={5} className="text-center py-5 fs-6">
//                       No Data Found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             ) : (
//               <tbody>
//                 <tr>
//                   <td colSpan={5} className="text-center py-5">
//                     <Spinner animation="border" />
//                   </td>
//                 </tr>
//               </tbody>
//             )}
//           </Table>
//         </div>

//         {/* Pagination */}
//         <div className="d-flex justify-content-center mt-3">
//           {pagination?.totalPages > 1 && (
//             <ReactPaginate
//               breakLabel="..."
//               nextLabel="Next"
//               previousLabel="Prev"
//               onPageChange={handlePageClick}
//               pageCount={pagination.totalPages}
//               forcePage={pagination.currentPage - 1} // Sync with state
//               pageRangeDisplayed={3}
//               marginPagesDisplayed={2}
//               containerClassName="pagination justify-content-center mt-4"
//               pageClassName="page-item"
//               pageLinkClassName="page-link rounded px-3 py-2 border-0 shadow-sm"
//               previousClassName="page-item"
//               previousLinkClassName="page-link rounded px-3 py-2 border-0 shadow-sm"
//               nextClassName="page-item"
//               nextLinkClassName="page-link rounded px-3 py-2 border-0 shadow-sm"
//               breakClassName="page-item"
//               breakLinkClassName="page-link rounded px-3 py-2 border-0 shadow-sm"
//               activeClassName="active bg-primary text-white"
//             />
//           )}
//         </div>
//       </Row>

//       <DeleteModal
//         show={isDeletePopup}
//         handleClose={() => {
//           setIsDeletePopup(false);
//           setSelectedId("");
//         }}
//         onConfirm={handleDelete}
//       />

//       <AddModal
//         show={isAddPopup}
//         handleClose={() => {
//           setIsAddPopup(false);
//           setTitle("");
//           setFile(null);
//         }}
//         content={
//           <>
//             <input
//               type="file"
//               className="form-control d-none"
//               placeholder="Add title"
//               ref={imageRef}
//               onChange={handleFileChange}
//             />
//             <div>
//               <div className="w-100">
//                 <div
//                   style={{ width: "200px" }}
//                   className="mx-auto position-relative"
//                 >
//                   {file ? (
//                     <>
//                       {" "}
//                       <img
//                         src={URL.createObjectURL(file)}
//                         alt="Selected Image"
//                         className="img-thumbnail mx-auto d-block mb-4"
//                         width={"200px"}
//                       />
//                       <span
//                         className="badge bg-transparent position-absolute cursor-pointer"
//                         onClick={() => setFile(null)}
//                         style={{ top: "-15px", right: "-22px" }}
//                       >
//                         <IoIosCloseCircle className="fs-3 text-danger cursor-pointer" />
//                       </span>
//                     </>
//                   ) : (
//                     <img
//                       src={mediaPicker}
//                       alt="MediaPicker"
//                       onClick={() => {
//                         imageRef.current.click();
//                       }}
//                       className="img-thumbnail mx-auto d-block mb-4 cursor-pointer"
//                       width={"200px"}
//                     />
//                   )}
//                 </div>
//               </div>
//             </div>

//             <Form.Control
//               type="text"
//               placeholder="Add title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="py-2 px-4 border-1 customInput rounded-2 w-100"
//             />
//           </>
//         }
//         onConfirm={() => handleAddCleaningType()}
//         title="Add New Place"
//         loading={loading}
//       />

//       <AddModal
//         show={isEditPopup}
//         handleClose={() => {
//           setIsEditPopup(false);
//           setIsEditData(null);
//           setFile(null);
//         }}
//         isUpdate={true}
//         content={
//           <>
//             <input
//               type="file"
//               className="form-control d-none"
//               placeholder="Add title"
//               ref={imageRef}
//               onChange={handleFileChange}
//             />
//             <div>
//               <div className="w-100">
//                 <div
//                   style={{ width: "200px" }}
//                   className="mx-auto position-relative"
//                 >
//                   {file ? (
//                     <>
//                       {" "}
//                       <img
//                         src={URL.createObjectURL(file)}
//                         alt="Selected Image"
//                         className="img-thumbnail mx-auto d-block mb-5"
//                         width={"200px"}
//                       />
//                       <span
//                         className="badge bg-transparent position-absolute cursor-pointer"
//                         onClick={() => setFile(null)}
//                         style={{ top: "-15px", right: "-22px" }}
//                       >
//                         <IoIosCloseCircle className="fs-3 text-danger cursor-pointer" />
//                       </span>
//                     </>
//                   ) : isEditData?.image ? (
//                     <>
//                       {" "}
//                       <img
//                         src={`${process.env.REACT_APP_API_URL}/${isEditData?.image}`}
//                         alt="Selected Image"
//                         className="img-thumbnail mx-auto d-block mb-5"
//                         width={"200px"}
//                       />
//                       <span
//                         className="badge bg-transparent position-absolute cursor-pointer"
//                         onClick={() =>
//                           setIsEditData((prev) => ({ ...prev, image: "" }))
//                         }
//                         style={{ top: "-15px", right: "-22px" }}
//                       >
//                         <IoIosCloseCircle className="fs-3 text-danger cursor-pointer" />
//                       </span>
//                     </>
//                   ) : (
//                     <img
//                       src={mediaPicker}
//                       alt="MediaPicker"
//                       onClick={() => {
//                         imageRef.current.click();
//                       }}
//                       className="img-thumbnail mx-auto d-block mb-5 cursor-pointer"
//                       width={"200px"}
//                     />
//                   )}
//                 </div>
//               </div>
//             </div>

//             <Form.Control
//               type="text"
//               placeholder="Add title"
//               value={isEditData?.title}
//               onChange={(e) => {
//                 setIsEditData((prev) => ({
//                   ...prev,
//                   title: e.target?.value,
//                 }));
//               }}
//               className="py-2 px-4 border-1 customInput rounded-2 w-100"
//             />
//           </>
//         }
//         onConfirm={() => handleUpdateCleaningType()}
//         title="Update Place"
//         loading={loading}
//       />
//     </div>
//   );
// };

// export default AdminPlaces;


import React from 'react'

const AdminPlaces = () => {
  return (
    <div>AdminPlaces</div>
  )
}

export default AdminPlaces