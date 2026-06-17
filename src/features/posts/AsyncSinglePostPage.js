import { useParams, Link } from "react-router-dom";
import { useGetPostQuery } from "../api/apiSlice";
import Spinner from "../../components/Spinner";
import PostAuthor from "./AsyncPostAuthor";
import TimeAgo from "../../components/TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useSelector } from "react-redux";
import { selectCurrentUsername } from "../auth/asyncAuthSlice";


export default function AsyncSinglePostPage() {
    const { postId } = useParams()
    const { data: post = null, isFetching, isSuccess } = useGetPostQuery(postId)
    console.log('AsyncSinglePostPage post: ', post);

    const currentUsername = useSelector(selectCurrentUsername)
    const canEdit = post ? currentUsername === post.user : false

    let content = null
    if (isFetching) {
        content = <Spinner text="Loading…"></Spinner>
    } else if (isSuccess) {
        content = (<article>
            <h2>{post.title}</h2>
            <div>
                <PostAuthor userId={post.user}></PostAuthor>
                <TimeAgo timestamp={post.date}></TimeAgo>
            </div>
            <p>{post.content}</p>
            <ReactionButtons post={post}></ReactionButtons>
            {canEdit && <Link to={`/async/editPost/${postId}`}>Edit Post</Link>}
        </article>)
    }

    return <section>{content}</section>
}