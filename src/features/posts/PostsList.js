import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";

export default function PostsList() {
    const posts = useSelector(selectAllPosts)
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    return (<section>
        {orderedPosts.map((post) => <article key={post.id}>
            <h3><Link to={`/posts/${post.id}`}>{post.title}</Link></h3>
            <p>{post.content.substring(0, 100)}</p>
            <PostAuthor userId={post.user}></PostAuthor>
            <ReactionButtons post={post}></ReactionButtons>
        </article>)}
    </section>)
}