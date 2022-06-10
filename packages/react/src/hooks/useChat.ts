import React, { useContext } from 'react';
import { ChatContext, IChatContext } from '../contexts';

export const useChat = () => {
  const chatContext = useContext(ChatContext);

  if (!ChatContext) {
    throw new Error();
  }

  return chatContext as IChatContext;
};

export default useChat;
