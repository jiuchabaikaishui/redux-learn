import { useSelector } from "react-redux";
import { selectCurrentUsername } from "../auth/asyncAuthSlice";

import { useAddNewPostMutation } from "../api/apiSlice";

export default function AddPostForm() {
    const [addNewPost, { isLoading }] = useAddNewPostMutation()
    const currentUsername = useSelector(selectCurrentUsername)

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log('e: ', e);
        const { elements } = e.target
        const title = elements.postTitle.value
        const content = elements.postContent.value
        try {
            await addNewPost({title, content, user: currentUsername}).unwrap()
            e.target.reset()
        } catch (error) {
            console.error('Failed to save the post: ', error)
        }
    }

    return (<section>
        <h2>Add a New Post</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="postTitle">Post Title: </label>
            <input id="postTitle" type="text" required></input>
            <br></br>
            <br></br>
            <label htmlFor="postContent">Post Content: </label>
            <textarea id="postContent" name="postContent" required></textarea>
            <br></br>
            <button disabled={ isLoading }>Save Post</button>
        </form>
    </section>)
}