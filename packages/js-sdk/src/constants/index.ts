export const Paths = {
  wss: {
    chat: (chatroom_id: string) =>
      `wss://dev.api.beoble.app/chatroom/${chatroom_id}/chat`,
  },
  base: 'api.beoble.app',
  dev: 'https://dev.api.beoble.app',
  user: {
    base: '/user',
    friend: {
      base: '/user/friend',
      request: '/user/friend/request',
      friendship: '/user/friend/friendship',
    },
    follow: {
      base: '/user/follow',
      follower: '/user/follow/follower',
      following: '/user/follow/following',
    },
    chatroom: {
      base: '/user/chatroom',
      membership: (user_id: string) => `/user/${user_id}/chatroom/membership`,
    },
  },
  chat: {
    base: '/chat',
    reaction: (chat_id: string) => `/chat/${chat_id}/reaction`,
    report: (chat_id: string) => `/chat/${chat_id}/report`,
  },
  chatroom: {
    base: '/chatroom',
    member: {
      get: '/chatroom/member',
      put: (chatroom_id: string) => `/chatroom/${chatroom_id}/member`,
    },
    recent: '/chatroom/chat/recent',
  },
  auth: {
    login: {
      base: '/auth/login',
      message: '/auth/login/message',
    },
  },
};
