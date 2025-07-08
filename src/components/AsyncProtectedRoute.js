import { useSelector } from "react-redux";
import { selectCurrentUsername } from "../features/auth/asyncAuthSlice";
import { Navigate } from "react-router-dom";

export default function AsyncProtectedRoute({children}) {
    const username = useSelector(selectCurrentUsername)
    console.log('username: ', username);
    return username ? children : <Navigate to='/async/login'></Navigate>
}