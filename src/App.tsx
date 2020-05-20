import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MockPage from "./pages/MockPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Food from "./pages/Food";
import { mockMenu } from "./utils";

function App() {
  return (
    <Router>
      <Redirect from="/" exact to="/food" />
      <Switch>
        <Route path="/drinks">
          <MockPage />
        </Route>
        <Route path="/food">
          <Food MENU={mockMenu} />
        </Route>
        <Route path="/history">
          <MockPage />
        </Route>
        <Route path="/pay">
          <MockPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
