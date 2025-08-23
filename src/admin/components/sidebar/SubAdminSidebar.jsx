import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    FaHome,
    FaMinus,
    FaPlus,
    FaTools,
    FaUser
} from "react-icons/fa";
import { GiCardAceSpades, GiCardRandom } from "react-icons/gi";
import logo from "../../../assets/image/svg/maineLogo.png";
import { MdVerifiedUser, MdGamepad } from "react-icons/md";
import { handleLogout } from "../../../services/common.service";

// ✅ Main Sidebar Component
function SubAdminSidebar({ isSidebarOpen }) {
    const location = useLocation();

    const navItems = [
        {
            to: "/subadmin/users",
            label: "Users",
            icon: <FaUser />,
        },
        {
            to: "/subadmin/myusers",
            label: "My Users",
            icon: <FaUser />,
        }
    ];

    return (
        <div className={`bg-dark text-white Side`} id="sidebar">
            <div className="d-flex align-items-center justify-content-center gap-2 cursor-pointer py-3 border-bottom border-secondary fs-5 fw-bold">
                <img width={200} className="rounded-5" src={logo} alt="logo" />
            </div>

            <div className="flex-grow-1 px-2">
                {navItems.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className={`d-flex rounded align-items-center px-4 py-2 mt-2 text-decoration-none text-white sidebar-link ${location.pathname === item.to ? "bg-secondary" : "bg-dark"
                            }`}
                    >
                        <span className="me-3">{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
                <button
                    className={`bg-danger rounded px-4 py-2 mt-2 text-white border-0 w-100 text-center`}
                    onClick={handleLogout}
                >
                    Log out
                </button>
            </div>
        </div>
    );
}

export default SubAdminSidebar;
