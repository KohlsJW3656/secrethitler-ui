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
  allPolicies: [],
  drawPolicies: [],
  deckPolicies: [],
  discardedPolicies: [],
  enactedPolicies: [],
  notEnactedPolicies: [],
  topPolicy: {},
  playerCount: 0,
  gameUsers: [],
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
    /**** Policies  ****/
    case Action.FinishLoadingAllPolicies:
      return {
        ...state,
        allPolicies: action.payload,
        drawPolicies: action.payload.filter(
          (policy) =>
            policy.deckOrder < 3 &&
            policy.isDiscarded === 0 &&
            policy.isEnacted === 0
        ),
        deckPolicies: action.payload.filter(
          (policy) => policy.isDiscarded === 0 && policy.isEnacted === 0
        ),
        discardedPolicies: action.payload.filter(
          (policy) => policy.isDiscarded === 1 && policy.isEnacted === 0
        ),
        enactedPolicies: action.payload.filter(
          (policy) => policy.isEnacted === 1
        ),
        notEnactedPolicies: action.payload.filter(
          (policy) => policy.isEnacted === 0
        ),
        topPolicy: action.payload.filter(
          (policy) =>
            policy.deckOrder === 0 &&
            policy.isDiscarded === 0 &&
            policy.isEnacted === 0
        )[0],
      };
    case Action.FinishLoadingDrawPolicies:
      return {
        ...state,
        drawPolicies: action.payload,
      };
    case Action.FinishLoadingDeckPolicies:
      return {
        ...state,
        deckPolicies: action.payload,
      };
    case Action.FinishLoadingDiscardedPolicies:
      return {
        ...state,
        discardedPolicies: action.payload,
      };
    case Action.FinishLoadingEnactedPolicies:
      return {
        ...state,
        enactedPolicies: action.payload,
      };
    case Action.FinishLoadingNotEnactedPolicies:
      return {
        ...state,
        notEnactedPolicies: action.payload,
      };
    case Action.FinishLoadingTopPolicy:
      return {
        ...state,
        topPolicy: action.payload,
      };
    case Action.FinishEditingPolicy:
      return {
        ...state,
        allPolicies: state.allPolicies.map((policy) => {
          if (policy.policy_id === action.policy_id) {
            return action.payload;
          } else {
            return policy;
          }
        }),
        drawPolicies: state.drawPolicies.map((policy) => {
          if (policy.policy_id === action.policy_id) {
            return action.payload;
          } else {
            return policy;
          }
        }),
        deckPolicies: state.deckPolicies.map((policy) => {
          if (policy.policy_id === action.policy_id) {
            return action.payload;
          } else {
            return policy;
          }
        }),
        discardedPolicies: state.discardedPolicies.map((policy) => {
          if (policy.policy_id === action.policy_id) {
            return action.payload;
          } else {
            return policy;
          }
        }),
        enactedPolicies: state.enactedPolicies.map((policy) => {
          if (policy.policy_id === action.policy_id) {
            return action.payload;
          } else {
            return policy;
          }
        }),
        notEnactedPolicies: state.notEnactedPolicies.map((policy) => {
          if (policy.policy_id === action.policy_id) {
            return action.payload;
          } else {
            return policy;
          }
        }),
        topPolicy:
          state.topPolicy.policy_id === action.policy_id ? {} : state.topPolicy,
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
        fascist: action.payload.result.filter(
          (gameUser) =>
            gameUser.user_id === state.user.user_id && gameUser.party_membership
        )[0],
        hitler: action.payload.result.filter(
          (gameUser) =>
            gameUser.user_id === state.user.user_id && gameUser.role_id === 1
        )[0],
      };
    default:
      return state;
  }
}

export default reducer;
