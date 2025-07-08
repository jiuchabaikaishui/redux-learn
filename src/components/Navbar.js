import { useLocation, Link } from "react-router-dom";
import { isSiglePost, isPosts, isAsyncPostsList } from "../data";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedOut } from "../features/auth/authSlice";
import { selectCurrentUser } from "../features/users/usersSlice";

export default function Navbar({children}) {
    const location = useLocation()
    const dispatch = useDispatch()
    const user = useSelector(selectCurrentUser)
    
    return (<div>
        <h1>{children}</h1>
        {isSiglePost(location.pathname) ? <Link to='/postsList'>Posts</Link> : null}
        {isAsyncPostsList(location.pathname) ? <Link to='/async/users'>Users</Link> : null}
        {user && isPosts(location.pathname) ? <div>
            {user.name}
            <button onClick={(e) => {
                dispatch(userLoggedOut())
            }}>Log Out</button>
        </div> : null}
    </div>)
}