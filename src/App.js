import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import Footer from "./components/common/Footer";
import TopToBottom from "./components/common/TopToBottom";
import FranchiseLoginPage from "./pages/FranchiseLoginPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import "./index.css";
import AdminLayout from "./admin/layout/layout";
import { ToastContainer } from "react-toastify";
import { useStudy } from "./context/study.context";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashobard from "./admin/pages/AdminDashobard";
import AdminStreams from "./admin/pages/AdminCards";
import AdminCards from "./admin/pages/AdminCards";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminRounds from "./admin/pages/AdminRounds";
import DisclaimerPage from "./pages/disclaimer";
import PrivacyPolicyPage from "./pages/privacy-policy";
import TermsOfService from "./pages/terms";

function App() {
  const { currentUser } = useStudy();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const franchisetoken = localStorage.getItem("franchisetoken");

  // Admin private route that checks for either token or admin role
  const AdminPrivateRoute = ({ children }) => {
    if (token || (currentUser && currentUser.role === "admin")) {
      return children;
    }
    return <Navigate to="/" />;
  };

  return (
    <>
      <ToastContainer />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route
          path="/terms-of-service"
          element={<TermsOfService />}
        />
        <Route
          path="/disclaimer"
          element={<DisclaimerPage />}
        />

        {/* Admin Login with redirect if already logged in */}
        <Route
          path="/admin/login"
          element={
            token || (currentUser && currentUser.role === "admin") ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <AdminLogin />
            )
          }
        />

        <Route
          path="/my-account"
          element={
            franchisetoken ||
            (currentUser && currentUser.role === "franchise") ? (
              <Navigate to="/franchise/dashboard" />
            ) : (
              <FranchiseLoginPage />
            )
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <AdminPrivateRoute>
              <AdminLayout />
            </AdminPrivateRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashobard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="cards" element={<AdminCards />} />
          <Route path="rounds" element={<AdminRounds />} />
          <Route path="*" element={<Navigate to={"dashboard"} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
