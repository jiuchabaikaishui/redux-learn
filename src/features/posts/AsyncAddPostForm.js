import { useDispatch, useSelector } from "react-redux";
// import { selectAllUsers } from "../users/asyncUsersSlice";
import { selectCurrentUsername } from "../auth/asyncAuthSlice";
import { addNewPost } from "./asyncPostsSlice";
import { useState } from "react";

export default function AddPostForm() {
    const dispatch = useDispatch()
    // const users = useSelector(selectAllUsers)
    const currentUsername = useSelector(selectCurrentUsername)

    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log('e: ', e);
        const { elements } = e.target
        const title = elements.postTitle.value
        const content = elements.postContent.value
        // const userId = elements.postAuthor.value
        try {
            setAddRequestStatus('pending')
            await dispatch(addNewPost({title, content, user: currentUsername})).unwrap()
            e.target.reset()
        } catch (error) {
            console.error('Failed to save the post: ', error)
        } finally {
            setAddRequestStatus('idle')
        }
    }

    // const usersOptions = users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)
    return (<section>
        <h2>Add a New Post</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="postTitle">Post Title: </label>
            <input id="postTitle" type="text" required></input>
            <br></br>
            {/* <label htmlFor="postAuthor">Author: </label>
            <select id="postAuthor" required>
                <option value=''></option>
                {usersOptions}
            </select> */}
            <br></br>
            <label htmlFor="postContent">Post Content: </label>
            <textarea id="postContent" name="postContent" required></textarea>
            <br></br>
            <button disabled={addRequestStatus !== 'idle'}>Save Post</button>
        </form>
    </section>)
}