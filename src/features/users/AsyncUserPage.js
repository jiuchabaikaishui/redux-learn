import { useSelector } from "react-redux";
import { selectUserById } from "./asyncUsersSlice";
// import { selectPostsByUser } from "../posts/asyncPostsSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { createSelector } from "@reduxjs/toolkit";
import { useGetPostsQuery } from "../api/apiSlice";

const selectPostsForUser = createSelector(
    (res) => {
        console.log('selectPostsForUser : ', res);
        return res.data
    },
    (res, userId) => userId,
    (posts, userId) => posts.filter((post) => post.user === userId)
)

export default function AsyncUserPage() {
    const {userId} = useParams()
    const user = useSelector(state => selectUserById(state, userId))
    // const postsForUser = useSelector((state) => selectPostsByUser(state, userId))
    const { postsForUser } = useGetPostsQuery(undefined, {
        selectFromResult: result => {
            console.log('selectFromResult: ', result);
            return ({
                ...result,
                postsForUser: selectPostsForUser(result, userId)
            })
        }
    })
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