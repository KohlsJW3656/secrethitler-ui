import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import SecretIdComponent from "./SecretIdComponent";

function RevealRoleComponent(props) {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);
  const gameUser = useSelector((state) => state.gameUser);
  const gameUsers = useSelector((state) => state.gameUsers);
  const socket = useSelector((state) => state.socket);

  useEffect(() => {
    if (socket == null) return;
  }, [socket, dispatch, props.history]);

  return (
    <div>
      <h1 className="pageTitle">Secret Hitler</h1>
      <Container>
        <p>Game Name: {game.name}</p>
      </Container>
      <Container>
        <p>Connected Players: {gameUsers.length}</p>
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
      <Container>
        <h2>Teammate's Secret Identities</h2>
      </Container>
      <Container>
        {gameUsers
          .filter((otherUser) => otherUser.role_id !== gameUser.role_id)
          .map((otherUser) => (
            <SecretIdComponent
              key={otherUser.role_id}
              roleId={otherUser.role_id}
              username={otherUser.username}
              alt={otherUser.username + "'s secret identity"}
            ></SecretIdComponent>
          ))}
      </Container>
    </div>
  );
}

export default withRouter(RevealRoleComponent);
