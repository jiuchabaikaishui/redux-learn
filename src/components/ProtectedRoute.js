import { useSelector } from "react-redux";
import { selectCurrentUsername } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}) {
    const username = useSelector(selectCurrentUsername)
    return username ? children : <Navigate to='/login'></Navigate>
}