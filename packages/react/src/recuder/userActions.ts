export const UserActions = {
  setUser: 'SET_USER',
  updateFollowers: 'UPDATE_FOLLOWERS',
  updateFollowings: 'UPDATE_FOLLOWINGS',
  updateFriends: 'UPDATE_FRIENDS',

  setChatrooms: 'SET_CHATROOMS',
  updateChatroom: 'UPDATE_CHATROOM',
} as const;

type ActionKeys = keyof typeof UserActions;
export type UserActionTypes = typeof UserActions[ActionKeys];
