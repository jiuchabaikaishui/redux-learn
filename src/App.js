import logo from './logo.svg';
import './App.css';
import Counter from "./features/counter/Counter";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";

function App() {
  return (
    <div className="App">
      <h1>Redux</h1>
      <h2>计数器示例</h2>
      <Counter></Counter>
      <h2>帖子示例</h2>
      <AddPostForm></AddPostForm>
      <PostsList></PostsList>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
