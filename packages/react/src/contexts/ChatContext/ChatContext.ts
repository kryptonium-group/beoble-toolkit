import { createContext } from 'react';
import { IChatRoom } from '@beoble/js-sdk';
import { MessageConversationProps } from '../../components/MessageConversation';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IChatContext {
  openedChats: string[];
  openChat: (chatroom_id: string) => void;
  closeChat: (chatroom_id: string) => void;
  updateChatrooms: () => Promise<void>;
  addChatroom: (chatroom: IChatRoom) => void;
  updateChatroomRead: (chatroom: IChatRoom) => void;
  conversations: MessageConversationProps[];
  isChatroomsLoading: boolean;
  unreadMessages: number;
}

export const ChatContext = createContext<IChatContext | null>(null);
