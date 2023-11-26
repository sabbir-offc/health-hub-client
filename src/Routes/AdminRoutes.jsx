import PropTypes from "prop-types";

import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import useUserInfo from "../hooks/useUserInfo";

const AdminRoutes = ({ children }) => {
  const { userInfo, isLoading } = useUserInfo();

  if (isLoading) return <Loader />;
  if (userInfo?.role === "admin") return children;
  return <Navigate to="/dashboard" />;
};

AdminRoutes.propTypes = {
  children: PropTypes.node,
};
export default AdminRoutes;
