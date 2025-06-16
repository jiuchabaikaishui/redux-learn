import { useSelector } from "react-redux";
export default function PostsList() {
    const posts = useSelector((state) => state.posts)

    return (<section>
        {posts.map((post) => <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
        </article>)}
    </section>)
}