import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { worker } from "./api/server";
import { fetchUsers } from "./features/users/asyncUsersSlice";

async function mockStart() {
  await worker.start({ onUnhandledRequest: 'bypass' })

  store.dispatch(fetchUsers())

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    // <React.StrictMode>
      <Provider store={store}>
        <React.Suspense>
          <Router><App /></Router>
        </React.Suspense>
      </Provider>
    // </React.StrictMode>
  );
}
mockStart()


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
