import { Navigate } from "react-router-dom";
import { useUser } from "./useUser";

const PrivateAuthRoute = ({ element: Component }) => {
    const user = useUser();

    return user ? Component : <Navigate to="/login" replace />;
};

export default PrivateAuthRoute;