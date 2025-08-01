import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postsSlice";
// import { selectAllUsers } from "../users/usersSlice";
import { selectCurrentUsername } from "../auth/authSlice";

export default function AddPostForm() {
    const dispatch = useDispatch()
    // const users = useSelector(selectAllUsers)
    const currentUsername = useSelector(selectCurrentUsername)

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log('e: ', e);
        const { elements } = e.target
        const title = elements.postTitle.value
        const content = elements.postContent.value
        // const userId = elements.postAuthor.value
        dispatch(postAdded(title, content, currentUsername))
        
        e.target.reset()
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
            </select>
            <br></br> */}
            <label htmlFor="postContent">Post Content: </label>
            <textarea id="postContent" name="postContent" required></textarea>
            <br></br>
            <button>Save Post</button>
        </form>
    </section>)
}