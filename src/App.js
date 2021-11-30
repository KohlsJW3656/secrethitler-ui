import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Container from "react-bootstrap/Container";
import { io } from "socket.io-client";

import "./styles/App.css";
import "./styles/nav.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { setPlayerCount } from "./actions";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Officials from "./pages/Officials";
import Admin from "./pages/Admin";
import Account from "./pages/Account";
import Forgotpassword from "./pages/Forgotpassword";
import Resetpassword from "./pages/Resetpassword";
import EmailConfirmation from "./pages/EmailConfirmation";

const history = createBrowserHistory();

function App() {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState();

  useEffect(() => {
    const s = io("https://secrethitleronline.duckdns.org:8445");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null) return;
    socket.on("users-conneceted", (socketCount) => {
      dispatch(setPlayerCount(socketCount));
    });
  }, [socket]);

  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Container>
              <Home />
            </Container>
          </Route>
          <Route path="/signup">
            <Container>
              <Signup />
            </Container>
          </Route>
          <Route path="/forgotpassword">
            <Container>
              <Forgotpassword />
            </Container>
          </Route>
          <Route path="/emailconfirmation">
            <Container>
              <EmailConfirmation />
            </Container>
          </Route>
          <Route path="/resetpassword/:jwt">
            <Container>
              <Resetpassword />
            </Container>
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/officials">
            <Officials />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
