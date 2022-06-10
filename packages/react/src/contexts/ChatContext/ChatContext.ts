import { createContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IChatContext {
  openedChat: string[];
  openChat: (chatroom_id: string) => void;
  closeChat: (chatroom_id: string) => void;
}

export const ChatContext = createContext<IChatContext | null>(null);
