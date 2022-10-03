import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import SecretIdComponent from "./SecretIdComponent";

function RevealRoleComponent(props) {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket);
  const game = useSelector((state) => state.game);
  const gameUser = useSelector((state) => state.gameUser);
  const gameUsers = useSelector((state) => state.gameUsers);
  const fascists = useSelector((state) => state.fascists);
  const liberals = useSelector((state) => state.liberals);
  const fascist = useSelector((state) => state.fascist);
  const hitler = useSelector((state) => state.hitler);
  const [gameTimer, setGameTimer] = useState(-1);

  useEffect(() => {
    if (socket == null) return;
    socket.on("game-timer", (time) => setGameTimer(time));
    socket.on("start-game", () => props.history.push("/board"));
  }, [socket, dispatch, props.history]);

  return (
    <div>
      <h1 className="pageTitle">Secret Hitler</h1>
      {gameTimer > -1 && (
        <Container>
          <p>Game Starting in: {gameTimer}</p>
        </Container>
      )}
      <Container>
        <p>Game Name: {game.name}</p>
      </Container>
      <Container>
        <p>Connected Players: {gameUsers.length}</p>
      </Container>
      <Container>
        <p>Fascists: {fascists.length}</p>
      </Container>
      <Container>
        <p>Liberals: {liberals.length}</p>
      </Container>
      <Container>
        <h2>Your Secret Identity</h2>
      </Container>
      <Container>
        <SecretIdComponent
          roleId={gameUser.role_id}
          alt="Your secret identity"
        ></SecretIdComponent>
      </Container>
      {fascist && (!hitler || gameUsers.length < 7) && (
        <>
          <Container>
            <h2>Teammate's Secret Identities</h2>
          </Container>
          <Container>
            {gameUsers
              .filter(
                (otherUser) =>
                  otherUser.role_id !== gameUser.role_id &&
                  otherUser.party_membership === 1
              )
              .map((otherUser) => (
                <SecretIdComponent
                  key={otherUser.role_id}
                  roleId={otherUser.role_id}
                  username={otherUser.username}
                  alt={otherUser.username + "'s secret identity"}
                ></SecretIdComponent>
              ))}
          </Container>
        </>
      )}
    </div>
  );
}

export default withRouter(RevealRoleComponent);
