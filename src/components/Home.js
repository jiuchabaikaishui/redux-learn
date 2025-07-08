import { Link } from "react-router-dom";
import { homeData } from "../data";

export default function Home() {
    return (<ul>
        {homeData.map(item => <li key={item.path}><Link to={item.path}>{item.title}</Link></li> )}
    </ul>)
}