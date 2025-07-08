import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import { selectCurrentUsername } from "../auth/authSlice";

export default function SinglePostPage() {
    const {postId} = useParams()
    const post = useSelector((state) => selectPostById(state, postId))
    const currentUsername = useSelector(selectCurrentUsername)
    const canEdit = currentUsername === post.user
    
    return <section>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <ReactionButtons post={post}></ReactionButtons>
        <PostAuthor userId={post.user}></PostAuthor>
        <br></br>
        {canEdit && <Link to={`/editPost/${postId}`}>Edit Post</Link>}
    </section>
}