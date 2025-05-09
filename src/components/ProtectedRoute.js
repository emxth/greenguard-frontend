import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../UserManagement/AuthContext";

const ProtectedRoute = ({ roles }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!roles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
