import { io } from "socket.io-client";

export const Action = Object.freeze({
  /* Games */
  FinishCreatingGame: "FinishCreatingGame",
  FinishJoiningGame: "FinishJoiningGame",
  FinishLoadingJoinableGames: "FinishLoadingJoinableGames",

  /* Policies */
  FinishLoadingAllPolicies: "FinishLoadingAllPolicies",
  FinishLoadingDrawPolicies: "FinishLoadingDrawPolicies",
  FinishLoadingDeckPolicies: "FinishLoadingDeckPolicies",
  FinishLoadingDiscardedPolicies: "FinishLoadingDiscardedPolicies",
  FinishLoadingEnactedPolicies: "FinishLoadingEnactedPolicies",
  FinishLoadingNotEnactedPolicies: "FinishLoadingNotEnactedPolicies",
  FinishLoadingTopPolicy: "FinishLoadingTopPolicy",
  FinishEditingPolicy: "FinishEditingPolicy",

  /* User Signup, Login, Logout */
  FinishLoggingInUser: "FinishLoggingInUser",
  FinishAddingUser: "FinishAddingUser",
  FinishSettingUser: "FinishSettingUser",
  FinishEditingUser: "FinishEditingUser",
  FinishLoggingOutUser: "FinishLoggingOutUser",

  /* Admin */
  FinishLoadingUsers: "FinishLoadingUsers",
  FinishEditingUserAdmin: "FinishEditingUserAdmin",

  /* Notifications */
  AddNotification: "AddNotification",
  DismissNotification: "DismissNotification",

  /* Sockets */
  SetSocket: "SetSocket",
  SetPlayerCount: "SetPlayerCount",
  SetGameUsers: "SetGameUsers",
  SetGamePolicies: "SetGamePolicies",
});

export const host = "https://secrethitleronline.duckdns.org:8445";

function checkForErrors(response) {
  if (!response.ok) {
    throw Error(`${response.status}: ${response.statusText}`);
  }
  return response;
}

/*********************************** Games ***********************************/
export function startCreatingGame(
  name,
  username,
  private_game,
  password,
  socket,
  history,
  jwt
) {
  const game = { name, private_game, password };
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  };

  return (dispatch) => {
    fetch(`${host}/game/create`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          game.game_id = data.id;
          dispatch(FinishCreatingGame(game));
          dispatch(
            AddNotification({
              type: "success",
              message: "Game Created Successfully!",
            })
          );
          dispatch(
            startJoiningGame(
              game.game_id,
              username,
              password,
              socket,
              history,
              jwt
            )
          );
        }
      })
      .catch((e) => {
        console.error(e);
        dispatch(
          AddNotification({
            type: "danger",
            message: "Warning! Failed to create game!!",
          })
        );
      });
  };
}

export function FinishCreatingGame(game) {
  return {
    type: Action.FinishCreatingGame,
    payload: game,
  };
}

export function startJoiningGame(
  game_id,
  username,
  password,
  socket,
  history,
  jwt
) {
  const gameUser = { game_id, username, password };
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gameUser),
  };

  return (dispatch) => {
    fetch(`${host}/gameuser/join`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          gameUser.game_user_id = data.id;
          dispatch(FinishJoiningGame(gameUser));
          socket.emit("join-game", { username, game_id });
          history.push("/lobby");
          dispatch(
            AddNotification({
              type: "success",
              message: "User Successfully joined!",
            })
          );
        }
      })
      .catch((e) => {
        console.error(e);
        dispatch(
          AddNotification({
            type: "danger",
            message: "Incorrect password, or the game is no longer joinable",
          })
        );
      });
  };
}

export function FinishJoiningGame(gameUser) {
  return {
    type: Action.FinishJoiningGame,
    payload: gameUser,
  };
}

export function startGettingJoinableGames(jwt) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  return (dispatch) => {
    fetch(`${host}/game/all/joinable`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          dispatch(FinishLoadingJoinableGames(data.joinableGames));
        }
      })
      .catch((e) => console.error(e));
  };
}

export function FinishLoadingJoinableGames(joinableGames) {
  return {
    type: Action.FinishLoadingJoinableGames,
    payload: joinableGames,
  };
}

/*********************************** User Login ***********************************/

export function startLoggingInUser(email, password, socket) {
  const source = "Website";
  const user = { email, password, source };
  const loginOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  };

  return (dispatch) => {
    fetch(`${host}/user/login`, loginOptions)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          dispatch(finishLoggingInUser(data.jwt));
          const getUserOptions = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.jwt}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          };
          fetch(`${host}/user`, getUserOptions)
            .then(checkForErrors)
            .then((response) => response.json())
            .then((userData) => {
              if (userData.ok) {
                socket.emit("login", { user_id: userData.user[0].user_id });
                dispatch(finishSettingUser(userData.user[0]));
                dispatch(DismissNotification());
              }
            })
            .catch((e) => {
              console.error(e);
              dispatch(
                AddNotification({
                  type: "danger",
                  message: "Error getting user",
                })
              );
            });
        }
      })
      .catch((e) => {
        console.error(e);
        dispatch(
          AddNotification({
            type: "danger",
            message: "Invalid username or password",
          })
        );
      });
  };
}

export function finishLoggingInUser(jwt) {
  return {
    type: Action.FinishLoggingInUser,
    payload: jwt,
  };
}

export function finishSettingUser(user) {
  return {
    type: Action.FinishSettingUser,
    payload: user,
  };
}

export function startEditingUser(first_name, last_name, email, password, jwt) {
  const user = {
    first_name,
    last_name,
    email,
    password,
  };
  const options = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  return (dispatch) => {
    fetch(`${host}/user/edit`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          dispatch(FinishEditingUser(user));
          dispatch(
            AddNotification({
              type: "success",
              message: "User information successfully updated!",
            })
          );
        }
      })
      .catch((e) => {
        console.error(e);
        dispatch(
          AddNotification({
            type: "danger",
            message: "User information failed to be edited!",
          })
        );
      });
  };
}

export function FinishEditingUser(user) {
  return {
    type: Action.FinishEditingUser,
    payload: user,
  };
}

/*********************************** User Logout ***********************************/

export function startLoggingOutUser(socket, history, message) {
  return (dispatch) => {
    document.cookie = "jwt= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    socket.emit("logout");
    dispatch(finishLoggingOutUser());
    if (message) {
      dispatch(AddNotification({ type: "danger", message: message }));
    }
    history.push("/");
  };
}

export function finishLoggingOutUser() {
  return {
    type: Action.FinishLoggingOutUser,
    payload: "",
  };
}

/*********************************** User Signup ***********************************/

export function startAddingUser(
  first_name,
  last_name,
  email,
  password,
  history
) {
  const user = {
    first_name,
    last_name,
    email,
    password,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  return (dispatch) => {
    fetch(`${host}/user/signup`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          user.user_id = data.id;
          dispatch(finishAddingUser(user));
          history.push("/");
          dispatch(
            AddNotification({
              type: "success",
              message: "User Created Successfully!",
            })
          );
        }
      })
      .catch((e) => {
        console.error(e);
        dispatch(
          AddNotification({
            type: "danger",
            message: "Warning! This email is already in use!",
          })
        );
      });
  };
}

export function finishAddingUser(user) {
  return {
    type: Action.FinishAddingUser,
    payload: user,
  };
}

/************************************** Admin **************************************/
/* Get Users */
export function startGettingUsers(jwt) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  return (dispatch) => {
    fetch(`${host}/admin/user/all`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          dispatch(FinishLoadingUsers(data.users));
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
}

export function FinishLoadingUsers(users) {
  return {
    type: Action.FinishLoadingUsers,
    payload: users,
  };
}

export function startEditingUserAdmin(
  user_id,
  first_name,
  last_name,
  email,
  account_type,
  last_used,
  jwt
) {
  const user = {
    user_id,
    first_name,
    last_name,
    email,
    account_type,
  };
  const options = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  return (dispatch) => {
    fetch(`${host}/admin/user/edit`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          user.last_used = last_used;
          dispatch(FinishEditingUserAdmin(user));
          dispatch(
            AddNotification({
              type: "success",
              message: "User information successfully updated!",
            })
          );
        }
      })
      .catch((e) => {
        console.error(e);
        dispatch(
          AddNotification({
            type: "danger",
            message: "User information failed to be edited!",
          })
        );
      });
  };
}

export function FinishEditingUserAdmin(user) {
  return {
    type: Action.FinishEditingUserAdmin,
    payload: user,
  };
}

/********************************* Forgot Password *********************************/
export function startSendingEmail(email, history) {
  const user = { email: email };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  return (dispatch) => {
    fetch(`${host}/user/forgotpassword`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          history.push("/emailconfirmation");
          dispatch(
            AddNotification({
              type: "success",
              message: "Email sent!",
            })
          );
        }
      })
      .catch((e) => {
        console.error(e);
        dispatch(
          AddNotification({
            type: "danger",
            message: "Invalid email address",
          })
        );
      });
  };
}

export function startResettingPassword(password, jwt, history) {
  const userPassword = { password: password };
  const options = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userPassword),
  };

  return (dispatch) => {
    fetch(`${host}/user/resetpassword`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          history.push("/");
          dispatch(
            AddNotification({
              type: "success",
              message: "User password updated successfully!",
            })
          );
        }
      })
      .catch((e) => {
        console.error(e);
        dispatch(
          AddNotification({
            type: "danger",
            message: "Failed to update password!",
          })
        );
      });
  };
}

/********************************** Notifications **********************************/

export function AddNotification(notification) {
  return {
    type: Action.AddNotification,
    payload: notification,
  };
}

export function DismissNotification() {
  return {
    type: Action.DismissNotification,
    payload: {},
  };
}

/********************************** Sockets **********************************/

export function setSocket() {
  const socket = io(host);
  //const socket = io("http://localhost:3445");
  return {
    type: Action.SetSocket,
    payload: socket,
  };
}

export function setPlayerCount(playerCount) {
  return {
    type: Action.SetPlayerCount,
    payload: playerCount,
  };
}

export function setGameUsers(data) {
  return {
    type: Action.SetGameUsers,
    payload: data,
  };
}

export function setGamePolicies(data) {
  return {
    type: Action.SetGamePolicies,
    payload: data,
  };
}
