import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Container from "react-bootstrap/Container";

import "./styles/App.css";
import "./styles/nav.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  setSocket,
  setPlayerCount,
  setGameUsers,
  setGamePolicies,
  startLoggingOutUser,
} from "./actions";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Game from "./pages/Game";
import Lobby from "./pages/Lobby";
import RevealRole from "./pages/RevealRole";
import Officials from "./pages/Officials";
import Admin from "./pages/Admin";
import Account from "./pages/Account";
import Forgotpassword from "./pages/Forgotpassword";
import Resetpassword from "./pages/Resetpassword";
import EmailConfirmation from "./pages/EmailConfirmation";
import GameSelection from "./pages/GameSelection";

const history = createBrowserHistory();

function App() {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket);

  useEffect(() => {
    dispatch(setSocket());
  }, [dispatch]);

  useEffect(() => {
    if (socket == null) return;
    socket.on("users-connected", (playerCount) =>
      dispatch(setPlayerCount(playerCount))
    );
    socket.on("get-game-users", (data) => dispatch(setGameUsers(data)));
    socket.on("get-game-policies", (data) => dispatch(setGamePolicies(data)));
    socket.on("logout", (message) =>
      dispatch(startLoggingOutUser(socket, history, message))
    );
  }, [socket, dispatch]);

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
          <Route path="/game">
            <GameSelection />
          </Route>
          <Route path="/lobby">
            <Lobby />
          </Route>
          <Route path="/revealrole">
            <RevealRole />
          </Route>
          <Route path="/board">
            <Game />
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
