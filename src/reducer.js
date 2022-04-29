import { Action } from "./actions";

const initialState = {
  isWaiting: false,
  authenticated: false,
  jwt: "",
  socket: null,
  user: {},
  email: "",
  admin: false,
  notification: {},
  users: [],
  topPolicy: {},
  playerCount: 0,
  gameUsers: [],
  gamePolicies: [],
  drawPolicies: [],
  deckPolicies: [],
  discardedPolicies: [],
  enactedPolicies: [],
  gameHost: false,
  fascist: false,
  hitler: false,
  liberals: [],
  fascists: [],
  game: {},
  gameUser: {},
  joinableGames: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    /**** Game  ****/
    case Action.FinishCreatingGame:
      return {
        ...state,
        game: action.payload,
        joinableGames: [action.payload],
      };
    case Action.FinishJoiningGame:
      return {
        ...state,
        game: state.joinableGames.filter(
          (joinableGame) => joinableGame.game_id === action.payload.game_id
        )[0],
        gameUser: action.payload,
        gameUsers: [action.payload],
      };
    case Action.FinishLoadingJoinableGames:
      return {
        ...state,
        joinableGames: action.payload,
      };
    /**** User Login  ****/
    case Action.FinishLoggingInUser:
      return {
        ...state,
        jwt: action.payload,
        authenticated: true,
      };
    case Action.FinishSettingUser:
      return {
        ...state,
        user: action.payload,
        admin: action.payload.account_type === 1,
        authenticated: true,
      };
    case Action.FinishEditingUser:
      return {
        ...state,
        user: action.payload,
      };
    /**** User Logout  ****/
    case Action.FinishLoggingOutUser:
      return {
        ...state,
        authenticated: false,
        jwt: "",
        user: {},
        admin: false,
        email: action.payload,
        users: [],
      };
    /**** User Signup  ****/
    case Action.FinishAddingUser:
      return {
        ...state,
        email: action.payload,
      };
    /**** Admin ****/
    case Action.FinishLoadingUsers:
      return {
        ...state,
        users: action.payload,
      };
    case Action.FinishEditingUserAdmin:
      return {
        ...state,
        users: state.users.map((user) =>
          user.user_id === action.payload.user_id ? action.payload : user
        ),
        user:
          state.user.user_id === action.payload.user_id
            ? action.payload
            : state.user,
        admin:
          state.user.user_id === action.payload.user_id
            ? action.payload.account_type === 1
            : state.admin,
      };
    /**** Notifications ****/
    case Action.AddNotification:
      return {
        ...state,
        notification: action.payload,
      };
    case Action.DismissNotification:
      return {
        ...state,
        notification: {},
      };
    /**** Sockets ****/
    case Action.SetSocket:
      return {
        ...state,
        socket: action.payload,
      };
    case Action.SetPlayerCount:
      return {
        ...state,
        playerCount: action.payload,
      };
    case Action.SetGameUsers:
      return {
        ...state,
        gameUser: action.payload.result.filter(
          (gameUser) => gameUser.user_id === state.user.user_id
        )[0],
        gameUsers: action.payload.result,
        fascists: action.payload.result.filter(
          (gameUser) => gameUser.party_membership
        ),
        liberals: action.payload.result.filter(
          (gameUser) => !gameUser.party_membership
        ),
        gameHost: action.payload.result[0].user_id === state.user.user_id,
        fascist:
          action.payload.result.filter(
            (gameUser) => gameUser.user_id === state.user.user_id
          )[0].party_membership === 1,
        hitler:
          action.payload.result.filter(
            (gameUser) => gameUser.user_id === state.user.user_id
          )[0].role_id === 1,
      };
    case Action.SetGamePolicies:
      return {
        ...state,
        gamePolicies: action.payload.gamePolicies,
        drawPolicies: action.payload.gamePolicies.filter(
          (policy) =>
            policy.deck_order <= 3 &&
            policy.discarded === 0 &&
            policy.enacted === 0
        ),
        deckPolicies: action.payload.gamePolicies.filter(
          (policy) => policy.discarded === 0 && policy.enacted === 0
        ),
        discardedPolicies: action.payload.gamePolicies.filter(
          (policy) => policy.discarded === 1 && policy.enacted === 0
        ),
        enactedPolicies: action.payload.gamePolicies.filter(
          (policy) => policy.enacted === 1
        ),
      };
    default:
      return state;
  }
}

export default reducer;
