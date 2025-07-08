import './App.css';
import { useLocation, useRoutes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AsyncNavbar from "./components/AsyncNavbar";
import { routesData, getTitle, isAsyncPosts } from "./data";
import { ToastContainer } from "react-tiny-toast";

function App() {
  console.log('render app');
  
  const routes = useRoutes(routesData)
  const location = useLocation()
  const title = getTitle(location.pathname)
  
  return (
    <div className="App">
      {isAsyncPosts(location.pathname) ? <AsyncNavbar>{title}</AsyncNavbar> : <Navbar>{title}</Navbar>}
      { routes }
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
