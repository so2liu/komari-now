import React from "react";
import MockPage from "./pages/MockPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Food from "./pages/Food";
import { mockMenu } from "./mock";
import Cart from "./pages/Cart";
import ContextProviders from "./contextProviders";
import Drinks from "./pages/Drinks";
import Home from "./pages/Home";
import Pay from "./pages/Pay";

function App() {
  return (
    <ContextProviders>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/drinks">
            <Drinks MENU={mockMenu} />
          </Route>
          <Route path="/food">
            <Food MENU={mockMenu} />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/pay">
            <Pay />
          </Route>
        </Switch>
      </Router>
    </ContextProviders>
  );
}

export default App;
