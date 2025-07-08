import { useLocation, Link } from "react-router-dom";
import { isAsyncPostsList, isAsyncPosts, isAsyncSiglePost, isNotifications, isAsyncLogin } from "../data";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../features/users/asyncUsersSlice";
import { logout } from "../features/auth/asyncAuthSlice";
import { fetchNotifications, selectUnreadNotificationsCount } from "../features/notifications/notificationsClice";

export default function AsyncNavbar({children}) {
    const location = useLocation()
    const dispatch = useDispatch()
    const user = useSelector(selectCurrentUser)
    const numUnreadNotifications = useSelector(selectUnreadNotificationsCount)
    console.log('numUnreadNotifications: ', numUnreadNotifications);
    
    let unreadNotificationsBadge = null
    if (numUnreadNotifications > 0) {
        unreadNotificationsBadge = <span className='badge'>{numUnreadNotifications}</span>
    }
    
    return (<div>
        <h1>{children}</h1>
        {isAsyncSiglePost(location.pathname) ? <Link to='/async/postsList'>Posts</Link> : null}
        {isAsyncPostsList(location.pathname) ? <Link to='/async/users'>Users</Link> : null}
        {!isNotifications(location.pathname) && !isAsyncLogin(location.pathname) ? <Link to='/async/notifications'>Notifications {unreadNotificationsBadge}</Link> : null}
        {!isAsyncLogin(location.pathname) ? <button onClick={() => dispatch(fetchNotifications())}>Refresh Notifications</button> : null}
        {user && isAsyncPosts(location.pathname) ? <div>
            {user.name}
            <button onClick={(e) => {
                e.preventDefault()
                dispatch(logout())
            }}>Log Out</button>
        </div> : null}
    </div>)
}