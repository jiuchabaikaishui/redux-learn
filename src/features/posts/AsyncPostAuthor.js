import { useSelector } from "react-redux";
import { selectUserById } from "../users/asyncUsersSlice";

export default function PostAuthor({userId, showPrefix=true}) {
    const author = useSelector(state => selectUserById(state, userId))
    return <span>{showPrefix ? 'by ' : null}{(author && author.name) ?? 'Unknown author'}</span>
}