import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Container from "react-bootstrap/Container";
import { io } from "socket.io-client";
import { getAllPolicies } from "./actions";

import "./styles/App.css";
import "./styles/nav.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Forgotpassword from "./pages/Forgotpassword";
import Resetpassword from "./pages/Resetpassword";
import { Officials } from "./pages/Officials";

const history = createBrowserHistory();

function App() {
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

  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Container>
              <Home />
            </Container>
          </Route>
          <Route path="/forgotpassword">
            <Container>
              <Forgotpassword />
            </Container>
          </Route>
          <Route path="/signup">
            <Container>
              <Signup />
            </Container>
          </Route>
          <Route path="/resetpassword">
            <Container>
              <Resetpassword />
            </Container>
          </Route>
          <Route path="/admin">{/* <Admin /> */}</Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/officials">
            <Officials />
          </Route>
          <Route path="/account">{/* <Account /> */}</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
