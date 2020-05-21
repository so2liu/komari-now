import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MockPage from "./pages/MockPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Food from "./pages/Food";
import { mockMenu } from "./utils";
import Cart from "./pages/Cart";
import ContextProviders from "./contextProviders";

function App() {
  return (
    <ContextProviders>
      <Router>
        <Redirect from="/" exact to="/cart" />
        <Switch>
          <Route path="/drinks">
            <MockPage />
          </Route>
          <Route path="/food">
            <Food MENU={mockMenu} />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/pay">
            <MockPage />
          </Route>
        </Switch>
      </Router>
    </ContextProviders>
  );
}

export default App;
