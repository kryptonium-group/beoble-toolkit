export const AppActions = {
  setUser: 'SET_USER',
  updateFollowers: 'UPDATE_FOLLOWERS',
  updateFollowings: 'UPDATE_FOLLOWINGS',
  updateFriends: 'UPDATE_FRIENDS',

  setChatrooms: 'SET_CHATROOMS',
  updateChatroom: 'UPDATE_CHATROOM',
} as const;

type ActionKeys = keyof typeof AppActions;
export type AppActionTypes = typeof AppActions[ActionKeys];
