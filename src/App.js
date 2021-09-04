import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Home } from "./Home";
import { Officials } from "./Officials";
import { io } from "socket.io-client";
import { getAllPolicies } from "./actions";
import "./App.css";

export default function App() {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState();
  const allPolicies = useSelector((state) => state.allPolicies);
  const policyDeck = allPolicies.filter(
    (policy) => policy.isDiscarded === 0 && policy.isEnacted === 0
  );
  useEffect(() => {
    const s = io("https://secrethitleronline.duckdns.org:8445");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-changes", () => {
      dispatch(getAllPolicies());
    });
    socket.emit("get-policies");
    return () => {
      socket.off("receive-changes");
    };
  }, [socket, policyDeck.length]);

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
