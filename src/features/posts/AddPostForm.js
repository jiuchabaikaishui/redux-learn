import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { postAdded } from "./postsSlice";

export default function AddPostForm() {
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log('e: ', e);
        const { elements } = e.target
        const title = elements.postTitle.value
        const content = elements.postContent.value
        const newPost = { id: nanoid(), title, content}
        console.log('newPost: ', newPost);
        dispatch(postAdded(newPost))
        
        e.target.reset()
    }
    return (<section>
        <h2>Add a New Post</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="postTitle">Post Title: </label>
            <input id="postTitle" type="text" required></input>
            <label htmlFor="postContent">Post Content: </label>
            <textarea id="postContent" name="postContent" required></textarea>
            <button>Save Post</button>
        </form>
    </section>)
}