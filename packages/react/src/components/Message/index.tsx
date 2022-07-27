import { FC, ReactNode } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { IAttachment, IUser } from '@beoble/js-sdk';
import { Colors, FontWeights, Truncate } from '../../styles';
import { convertTime, getUTCTimeStamp } from '../../utils';
import Avatar from '../Avatar';
import { Status } from '../OnlineStatus';
import { lineHeight } from 'styled-system';

/* eslint-disable-next-line */
export type ContentType = 'TEXT' | 'IMAGE';
export interface MessageProps {
  isMine: boolean;
  isFollowing: boolean;
  content: ReactNode;
  contentType: ContentType;
  created_at: string;
  profileImage?: string;
  account: string;
  userName: string;
  chatId: string;
  creator_user_id: string;
  user?: IUser;
  onUserClick?: () => void;
  status: Status;
}

const mountAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
   to {
     opacity: 1;
    transform: translateY(0);

   }
`;

const MessageContainer = styled.div<{ isMine: boolean }>`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  display: flex;
  flex-direction: row;
  justify-content: ${({ isMine }) => (isMine ? 'end' : 'start')};
  animation: ${mountAnimation} 500ms;
`;

const ProfileContainer = styled.div`
  width: 32px;
`;

const MessageContentContainer = styled.div<{ isMine: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 4px;
  align-items: ${({ isMine }) => (isMine ? 'end' : 'start')};
  max-width: 70%;
`;

const MessageInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
  padding: 0px 4px;
  width: 100%;
`;

const MessageBox = styled.div<{ isMine: boolean; contentType: ContentType }>`
  ${({ isMine }) => (isMine ? MyMessage : OthersMessage)}
  font-size: 14px;
  padding: ${({ contentType }) =>
    contentType === 'IMAGE' ? '0px' : '8px 12px'};
  ${({ contentType }) =>
    contentType === 'IMAGE' &&
    css`
      line-height: 0;
      background-color: transparent;
    `}
  block-size: fit-content;
  min-width: 10px;
  max-width: 100%;
  overflow-wrap: break-word;
  overflow: hidden;
`;

const MyMessage = css`
  background-color: ${Colors.background.messageTint};
  color: ${Colors.text.white};
  border-radius: 10px 0px 10px 10px;
`;

const OthersMessage = css`
  background-color: ${Colors.background.noneTintHover};
  color: ${Colors.text.normal};
  border-radius: 0px 10px 10px 10px;
`;

const UserName = styled.p`
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: ${FontWeights.bold};
  color: ${({ theme }) => theme.text.normal};
  margin-right: 8px;
  flex: 1;
  ${Truncate}
  cursor: pointer;
`;

const TimePhrase = styled.time`
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 12px;
  color: ${Colors.text.lowEmphasis};
`;

const MessageImage = styled.img`
  object-fit: cover;
  width: 100%;
`;

export const getImageContent = (attachment: IAttachment, chatId: string) => {
  return <MessageImage alt={chatId} src={attachment.asset_url} />;
};

export const Message: FC<MessageProps> = ({
  isMine,
  isFollowing,
  content,
  contentType,
  profileImage,
  account,
  userName,
  created_at,
  onUserClick,
  user,
  chatId,
  status,
}) => {
  return (
    <MessageContainer {...{ isMine }}>
      {!isMine && (
        <ProfileContainer>
          {!isFollowing && (
            <Avatar
              size={32}
              profileImg={profileImage}
              status={status}
              account={account}
              onClick={onUserClick}
            />
          )}
        </ProfileContainer>
      )}
      <MessageContentContainer {...{ isMine }}>
        {!isFollowing && (
          <MessageInfoContainer>
            <UserName onClick={onUserClick}>
              {isMine ? 'You' : userName}
            </UserName>
            <TimePhrase>{convertTime(getUTCTimeStamp(created_at))}</TimePhrase>
          </MessageInfoContainer>
        )}
        <MessageBox {...{ isMine, contentType }}>{content}</MessageBox>
      </MessageContentContainer>
    </MessageContainer>
  );
};

export default Message;
