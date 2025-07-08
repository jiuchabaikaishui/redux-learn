import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./asyncAuthSlice";
import { selectAllUsers } from "../users/asyncUsersSlice";

export default function LoginPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const users = useSelector(selectAllUsers)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const username = e.target.elements.username.value
        await dispatch(login(username))

        navigate('/async/postsList')
        console.log('async login');
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