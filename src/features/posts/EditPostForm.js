import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectPostById, postUpdated } from "./postsSlice";

export default function EditPostForm() {
    const {postId} = useParams()
    const post = useSelector((state) => selectPostById(state, postId))

    const dispatch = useDispatch()
    const navigate = useNavigate()

    if (!post) {
        return <section>
          <h2>Post not found!</h2>
        </section>
    }

    const onSavePostClicked = (e) => {
        e.preventDefault()

        const {elements} = e.target
        const title = elements.postTitle.value
        const content = elements.postContent.value
        if (title && content) {
            dispatch(postUpdated({id: post.id, title, content}))
            navigate(`/posts/${post.id}`)
        }
    }

    return <section>
        <h2>Edit Post</h2>
        <form onSubmit={onSavePostClicked}>
            <label htmlFor="postTitle">Post Title: </label>
            <input id="postTitle" name="postTitle" type="text" defaultValue={post.title} required></input>
            <label htmlFor="postContent">Post Content: </label>
            <textarea id="postContent" name="postContent" defaultValue={post.content} required></textarea>
            <button>Save Post</button>
        </form>
    </section>
}