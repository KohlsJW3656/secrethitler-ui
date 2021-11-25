export const Action = Object.freeze({
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
});

export const host = "https://secrethitleronline.duckdns.org:8445";

function checkForErrors(response) {
  if (!response.ok) {
    throw Error(`${response.status}: ${response.statusText}`);
  }
  return response;
}

/*********************************** Policies ***********************************/
export function startGettingAllPolicies(jwt) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  return (dispatch) => {
    fetch(`${host}/policy/all`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          dispatch(FinishLoadingAllPolicies(data.allPolicies));
        }
      })
      .catch((e) => console.error(e));
  };
}

export function FinishLoadingAllPolicies(allPolicies) {
  return {
    type: Action.FinishLoadingAllPolicies,
    payload: allPolicies,
  };
}

export function startGettingDrawPolicies(jwt) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  return (dispatch) => {
    fetch(`${host}/policy/draw`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          dispatch(FinishLoadingDrawPolicies(data.drawPolicies));
        }
      })
      .catch((e) => console.error(e));
  };
}

export function FinishLoadingDrawPolicies(drawPolicies) {
  return {
    type: Action.FinishLoadingDrawPolicies,
    payload: drawPolicies,
  };
}

export function startGettingDeckPolicies(jwt) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  return (dispatch) => {
    fetch(`${host}/policy/deck`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          dispatch(FinishLoadingDeckPolicies(data.deckPolicies));
        }
      })
      .catch((e) => console.error(e));
  };
}

export function FinishLoadingDeckPolicies(deckPolicies) {
  return {
    type: Action.FinishLoadingDeckPolicies,
    payload: deckPolicies,
  };
}

export function startGettingDiscardedPolicies(jwt) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  return (dispatch) => {
    fetch(`${host}/policy/discarded`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          dispatch(FinishLoadingDiscardedPolicies(data.discardedPolicies));
        }
      })
      .catch((e) => console.error(e));
  };
}

export function FinishLoadingDiscardedPolicies(discardedPolicies) {
  return {
    type: Action.FinishLoadingDiscardedPolicies,
    payload: discardedPolicies,
  };
}

export function startGettingEnactedPolicies(jwt) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  return (dispatch) => {
    fetch(`${host}/policy/enacted`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          dispatch(FinishLoadingEnactedPolicies(data.enactedPolicies));
        }
      })
      .catch((e) => console.error(e));
  };
}

export function FinishLoadingEnactedPolicies(enactedPolicies) {
  return {
    type: Action.FinishLoadingEnactedPolicies,
    payload: enactedPolicies,
  };
}

export function startGettingNotEnactedPolicies(jwt) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  return (dispatch) => {
    fetch(`${host}/policy/notenacted`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          dispatch(FinishLoadingNotEnactedPolicies(data.notEnactedPolicies));
        }
      })
      .catch((e) => console.error(e));
  };
}

export function FinishLoadingNotEnactedPolicies(notEnactedPolicies) {
  return {
    type: Action.FinishLoadingNotEnactedPolicies,
    payload: notEnactedPolicies,
  };
}

export function startGettingTopPolicy(jwt) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  return (dispatch) => {
    fetch(`${host}/policy/top`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          dispatch(FinishLoadingTopPolicy(data.topPolicy));
        }
      })
      .catch((e) => console.error(e));
  };
}

export function FinishLoadingTopPolicy(topPolicy) {
  return {
    type: Action.FinishLoadingTopPolicy,
    payload: topPolicy,
  };
}

export function startEditingPolicy(policy, jwt) {
  const options = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(policy),
  };

  return (dispatch) => {
    fetch(`${host}/policy/edit`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          dispatch(FinishEditingPolicy(policy));
        }
      })
      .catch((e) => console.error(e));
  };
}

export function FinishEditingPolicy(policy) {
  return {
    type: Action.FinishEditingPolicy,
    payload: policy,
  };
}

/*********************************** User Login ***********************************/

export function startLoggingInUser(email, password, history) {
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
          history.push("/dashboard");

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

export function startEditingUser(
  user_id,
  first_name,
  last_name,
  email,
  primary_num,
  secondary_num,
  password,
  jwt
) {
  const user = {
    user_id,
    first_name,
    last_name,
    email,
    primary_num,
    secondary_num,
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
          user.user_id = user_id;
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

export function startLoggingOutUser(history) {
  return (dispatch) => {
    document.cookie = "jwt= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    dispatch(finishLoggingOutUser());
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
  primary_num,
  secondary_num,
  account_type,
  last_used,
  jwt
) {
  const user = {
    user_id,
    first_name,
    last_name,
    email,
    primary_num,
    secondary_num,
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
