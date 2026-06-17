import { useNavigate, useParams } from "react-router-dom";
import { useGetPostQuery, useEditPostMutation } from "../api/apiSlice";

export default function QueryEditPostForm() {
    const {postId} = useParams()
    const { data: post } = useGetPostQuery(postId)
    const [ updatePost, { isLoading } ] = useEditPostMutation()

    const navigate = useNavigate()

    if (!post) {
        return <section>
          <h2>Post not found!</h2>
        </section>
    }

    const onSavePostClicked = async (e) => {
        e.preventDefault()

        const {elements} = e.target
        const title = elements.postTitle.value
        const content = elements.postContent.value
        if (title && content) {
            await updatePost({id: post.id, title, content})
            navigate(`/async/posts/${post.id}`)
        }
    }

    return <section>
        <h2>Edit Post</h2>
        <form onSubmit={onSavePostClicked}>
            <label htmlFor="postTitle">Post Title: </label>
            <input id="postTitle" name="postTitle" type="text" defaultValue={post.title} required disabled={isLoading}></input>
            <br></br>
            <label htmlFor="postContent">Post Content: </label>
            <textarea id="postContent" name="postContent" defaultValue={post.content} required disabled={isLoading}></textarea>
            <button>Save Post</button>
        </form>
    </section>
}