import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedIn } from "./authSlice";
import { selectAllUsers } from "../users/usersSlice";

export default function LoginPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const users = useSelector(selectAllUsers)

    const handleSubmit = (e) => {
        e.preventDefault()

        const username = e.target.elements.username.value
        dispatch(userLoggedIn(username))

        navigate('/postsList')
    } 
    return <section>
        <h2>Welcome to Tweeter!</h2>
        <h3>Please log in:</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">User: </label>
            <select id="username" name="username" required>
                <option value=""></option>
                {users.map(({id, name}) => <option key={id} value={id}>{name}</option>)}
            </select>
            <button>Log In</button>
        </form>
    </section>
}