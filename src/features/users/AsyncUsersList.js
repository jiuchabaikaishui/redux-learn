import { useSelector } from "react-redux";
import { selectUserIds, selectUserById } from "./asyncUsersSlice";
import { Link } from "react-router-dom";

function UserExcerpt({userId}) {
    const user = useSelector((state) => selectUserById(state, userId))
    return <li>
        <Link to={`/async/users/${user.id}`}>{user.name}</Link>
    </li>
}

export default function AsyncUsersList() {
    // const users = useSelector(selectAllUsers)
    const userIds = useSelector(selectUserIds)

    return (<section>
        <h2>Users</h2>
        <ul>
            {userIds.map(userId => <UserExcerpt key={userId} userId={userId}></UserExcerpt>)}
        </ul>
    </section>)
}