import { createContext } from 'react';
import { MessageConversationProps } from '../../components/MessageConversation';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IChatContext {
  openedChats: string[];
  openChat: (chatroom_id: string) => void;
  closeChat: (chatroom_id: string) => void;
  updateChatrooms: () => Promise<void>;
  conversations: MessageConversationProps[];
  isChatroomsLoading: boolean;
  unreadMessages: number;
}

export const ChatContext = createContext<IChatContext | null>(null);
