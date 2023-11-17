import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    if (loading) return null;

    if (!isAuthenticated) {
        navigate('/signin');
        return null;
    }

    if (isAdmin && user.role !== 'admin') {
        navigate('/signin');
        return null;
    }

    return children;
};

export default ProtectedRoute;
