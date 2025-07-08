import { useSelector } from "react-redux";
import { selectUserById } from "./asyncUsersSlice";
import { selectPostsByUser } from "../posts/asyncPostsSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AsyncUserPage() {
    const {userId} = useParams()
    const user = useSelector(state => selectUserById(state, userId))
    const postsForUser = useSelector((state) => selectPostsByUser(state, userId))
    console.log('user: ', user);
    console.log('postsForUser: ', postsForUser);
    
    return <section>
        <h2>{user.name}</h2>
        <ul>
            {postsForUser.map(post => {
                return <li key={post.id}><Link to={`/async/posts/${post.id}`}>{post.title}</Link></li>
            })}
        </ul>
    </section>
}