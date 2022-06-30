export const Paths = {
  wss: {
    chat: (chatroom_id: string) =>
      `wss://dev.api.beoble.app/chatroom/${chatroom_id}/chat`,
    notification: (app_id: string, user_id: string) =>
      `wss://dev.api.beoble.app/user/${app_id}/${user_id}`,
  },
  prod: 'https://api.beoble.app',
  dev: 'https://dev.api.beoble.app',
  user: {
    base: '/user',
    friend: {
      base: '/user/friend',
      request: '/user/friend/request',
      friendship: (user_id: string) => `/user/${user_id}/friend/friendship`,
    },
    follow: {
      base: (user_id: string) => `/user/${user_id}/follow`,
      follower: '/user/follow/follower',
      following: '/user/follow/following',
    },
    chatroom: {
      base: '/user/chatroom',
      membership: (user_id: string) => `/user/${user_id}/chatroom/membership`,
    },
    resport: {
      base: (user_id: string) => `/user/${user_id}/report`,
      reporter: '/user/report/reporter',
      reporting: '/user/report/reporting',
    },
    group: {
      base: '/user/group',
      membership: (user_id: string) => `/user/${user_id}/group/membership`,
    },
  },
  chat: {
    base: '/chat',
    withId: (chat_id: string) => `/chat/${chat_id}`,
    reaction: (chat_id: string) => `/chat/${chat_id}/reaction`,
    report: (chat_id: string) => `/chat/${chat_id}/report`,
  },
  chatroom: {
    base: '/chatroom',
    member: {
      base: '/chatroom/member',
      withId: (chatroom_id: string) => `/chatroom/${chatroom_id}/member`,
    },
    recent: '/chatroom/chat/recent',
    markAsRead: '/chatroom/chat/read',
  },
  auth: {
    login: {
      base: '/auth/login',
      message: '/auth/login/message',
    },
  },
  group: {
    base: '/group',
    withId: (group_id: string) => `/group/${group_id}`,
    member: {
      base: 'group/member',
      withId: (group_id: string) => `/group/${group_id}/member`,
    },
    post: {
      recent: '/group/post/recent',
    },
  },
  post: {
    base: '/post',
    withId: (post_id: string) => `/post/${post_id}`,
    reaction: (post_id: string) => `/post/${post_id}/reaction`,
    report: (post_id: string) => `/post/${post_id}/report`,
  },
};
