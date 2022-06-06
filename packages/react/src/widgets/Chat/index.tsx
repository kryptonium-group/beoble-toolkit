import { useState } from 'react';
import styled from 'styled-components';
import MessageOverlay, { Conversation } from '../../components/MessageOverlay';

/* eslint-disable-next-line */
export interface ChatProps {}

export function Chat(props: ChatProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  return <MessageOverlay {...{ conversations }} />;
}

export default Chat;
