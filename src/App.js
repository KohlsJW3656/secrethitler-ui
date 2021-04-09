import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./Home";
import { Officials } from "./Officials";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/officials">
            <Officials />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
