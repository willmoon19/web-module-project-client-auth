import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import './App.css';
import Login from "./Components";
import PrivateRoute from "./Components/PrivateRoute";
import FriendsList from "./Components/FriendsList";


function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              {localStorage.getItem("token")?<Link to="/friends">FriendsList</Link>:<div> Please log in</div>}
            </li>
          </ul>
        </nav>
        <Switch>
          <PrivateRoute exact path="/" component={FriendsList} />
          <Route path="/login" component={Login}/>
          <Route path="/friends" component={FriendsList}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
