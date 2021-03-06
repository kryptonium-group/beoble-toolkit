import { MouseEvent, useEffect } from 'react';
import styled from 'styled-components';
import useChat from '../../hooks/useChat';
import { Colors, FontWeights, Truncate } from '../../styles';
import { convertTime } from '../../utils/timeUtil';
import Avatar from '../Avatar';
import { Status } from '../OnlineStatus';
import { mountAnimation } from '../../styles/commons';
import AlarmNumber from '../AlarmNumber';

export interface MessageConversationProps {
  timestamp: number;
  profilePhoto?: string;
  status: Status;
  lastMessage: string;
  userName: string;
  account: string;
  onClick?: React.MouseEventHandler<any>;
  chatroomId: string;
  unreadMessages?: number;
}

const StyledMessageConversation = styled.div`
  height: 66px;
  display: flex !important;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  left: 0;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  &:hover {
    background-color: ${Colors.background.noneTintHover};
  }

  // animation: ${mountAnimation} 500ms;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;

const ConversationContentCard = styled.div`
  height: auto;
  padding: 8px;
  display: flex;
  flex-grow: 1;
  vertical-align: top;
  border-bottom: 1px solid #00000014;
  justify-content: space-between;
  overflow: hidden;
`;

const ConversationContentWrapper = styled.div`
  width: 100%;
  flex-grow: 2;
  float: left !important;
`;

const ConversationRow = styled.div`
  display: flex;
`;

const UserName = styled.h3`
  flex: 1;
  ${Truncate}
  font-size: 14px;
  font-weight: 400;
  color: #000000e6;
  margin: 0;
`;

const LastMessageTime = styled.time`
  margin-left: auto;
  overflow: hidden;
  white-space: nowrap;
  color: ${Colors.text.lowEmphasis};
  font-weight: ${FontWeights.normal};
  font-size: 12px;
`;

const MessageContainer = styled.div`
  margin: 0;
  padding: 0;
  width: calc(100% - 18px);
`;

const MessagePhrase = styled.p`
  overflow: hidden;
  color: ${Colors.text.lowEmphasis};
  text-overflow: ellipsis;
  margin: 0 !important;
  font-size: 12px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  -webkit-font-smoothing: antialiased;
`;

export const MessageConversation: React.FC<MessageConversationProps> = ({
  timestamp,
  lastMessage,
  userName,
  profilePhoto,
  status,
  account,
  onClick,
  chatroomId,
  unreadMessages,
}) => {
  const { openChat } = useChat();

  const handleClick = (e: MouseEvent) => {
    onClick && onClick(e);
    openChat(chatroomId);
  };

  return (
    <StyledMessageConversation onClick={handleClick}>
      <ProfileContainer>
        <Avatar
          size={48}
          profileImg={profilePhoto}
          status={status}
          account={account}
        />
      </ProfileContainer>
      <ConversationContentCard>
        <ConversationContentWrapper>
          <ConversationRow>
            <UserName>{userName}</UserName>
            <LastMessageTime>
              {timestamp ? convertTime(timestamp) : ''}
            </LastMessageTime>
          </ConversationRow>
          <ConversationRow>
            <MessageContainer>
              <MessagePhrase>{lastMessage}</MessagePhrase>
            </MessageContainer>
            {unreadMessages !== undefined && unreadMessages > 0 && (
              <AlarmNumber count={unreadMessages} />
            )}
          </ConversationRow>
        </ConversationContentWrapper>
      </ConversationContentCard>
    </StyledMessageConversation>
  );
};

export default MessageConversation;
