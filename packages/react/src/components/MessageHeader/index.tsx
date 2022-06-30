import styled, { css } from 'styled-components';
import { MdMoreHoriz } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs';
import { CgArrowsExpandRight, CgClose } from 'react-icons/cg';
import IconButton from '../IconButton';
import Avatar from '../Avatar';
import { Status } from '../OnlineStatus';
import { FC, MouseEventHandler, MouseEvent } from 'react';
import { Colors, FontWeights, Truncate } from '../../styles';
import { FiMinimize2 } from 'react-icons/fi';
import AlarmNumber from '../AlarmNumber';
import { BrightnessAnimation } from '../../styles/commons';

export interface MessageHeaderProps {
  profileImage?: string;
  status: Status;
  onMinimizeButtonClick?: () => void;
  onHeaderClick?: () => void;
  onNewChatRoomClick?: () => void;
  isMinimized: boolean;
  account: string;
  unreadMessages?: number;
  hasNewMessage: boolean;
}

const StyledMessageHeader = styled.header`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  align-items: center;
  padding: 0px 8px;
  position: relative;
  background-color: ${Colors.background.white};
  color: ${Colors.text.normal};

  border-bottom: 1px solid #00000014;

  min-height: 48px;
  background-clip: padding-box;
  border-radius: 0.8rem 0.8rem 0 0;

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  &:hover {
    background-color: #f9fafb;
    color: ${Colors.text.normal};
  }
`;

/**
 * no idea why linked in has this element
 */
const BadgeContainer = styled.div``;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 4px;
  flex-grow: 1;
  height: 100%;
  margin-right: 4px;
  cursor: pointer;
`;

const HeaderTitle = styled.span`
  font-size: 15px;
  font-weight: 600;
  margin-left: 8px;
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

interface MessageHeaderContainerProps {
  hasNewMessage: boolean;
}

const MessageHeaderContainer = styled(
  StyledMessageHeader
)<MessageHeaderContainerProps>`
  background-color: ${({ hasNewMessage, theme }) =>
    hasNewMessage ? theme.primary : Colors.background.white};
  color: ${({ hasNewMessage, theme }) =>
    hasNewMessage ? Colors.text.white : Colors.text.normal};
  animation: ${BrightnessAnimation} 2s infinite;
`;

export const MessageHeader: FC<MessageHeaderProps> = ({
  profileImage,
  status,
  onMinimizeButtonClick,
  onHeaderClick,
  onNewChatRoomClick,
  isMinimized,
  account,
  unreadMessages,
  hasNewMessage,
}) => {
  const handleMoreButtonClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const handleNewMessageButtonClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onNewChatRoomClick && onNewChatRoomClick();
  };

  return (
    <MessageHeaderContainer onClick={onHeaderClick} {...{ hasNewMessage }}>
      <ProfileContainer>
        <Avatar
          size={32}
          profileImg={profileImage}
          status={status}
          account={account}
        />
        <HeaderTitle>Messaging</HeaderTitle>
        {unreadMessages !== undefined && unreadMessages > 0 && (
          <AlarmNumber count={unreadMessages} style={{ marginLeft: 8 }} />
        )}
      </ProfileContainer>
      <ControlsContainer>
        <IconButton size={32} onClick={handleMoreButtonClick} color="inherit">
          <MdMoreHoriz />
        </IconButton>
        <IconButton
          size={32}
          onClick={handleNewMessageButtonClick}
          color="inherit"
        >
          <BiEdit />
        </IconButton>
        <IconButton size={32} onClick={onMinimizeButtonClick} color="inherit">
          {isMinimized ? <BsChevronCompactUp /> : <BsChevronCompactDown />}
        </IconButton>
      </ControlsContainer>
    </MessageHeaderContainer>
  );
};

export default MessageHeader;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewMessageHeaderProps {}

export const NewMessageHeader: FC<NewMessageHeaderProps> = () => {
  return (
    <StyledMessageHeader>
      <ProfileContainer>
        <HeaderTitle>New message</HeaderTitle>
      </ProfileContainer>
      <ControlsContainer>
        <IconButton size={32}>
          <CgArrowsExpandRight />
        </IconButton>
        <IconButton size={32}>
          <CgClose />
        </IconButton>
      </ControlsContainer>
    </StyledMessageHeader>
  );
};

export interface ChatHeaderProps {
  profileImage?: string;
  status: Status;
  account: string;
  userName?: string;
  isMinimized: boolean;
  isExpanded: boolean;
  onHeaderClick?: MouseEventHandler<any>;
  onClose?: MouseEventHandler<any>;
  onExpand?: MouseEventHandler<any>;
  onMore?: MouseEventHandler<any>;
  onProfileClick?: MouseEventHandler<any>;
  unreadMessages?: number;
}

const TitleContainer = styled.div`
  overflow: hidden;
  flex-grow: 1;
  margin-left: 8px;
  padding-left: 4px;
  color: inherit;
  ${Truncate};
`;

const UserName = styled.a<{ isMinimized: boolean }>`
  color: inherit;
  font-weight: ${FontWeights.bold};
  text-decoration: none;

  ${({ isMinimized }) => !isMinimized && linkDecoration}
`;

const linkDecoration = css`
  &:hover {
    color: ${Colors.text.action};
    text-decoration: underline;
  }
`;

const StatusDiv = styled.div`
  ${Truncate}
  color: ${Colors.text.normal};
  font-size: 12px;
`;

const ChatHeaderContainer = styled(
  StyledMessageHeader
)<MessageHeaderContainerProps>`
  background-color: ${({ hasNewMessage, theme }) =>
    hasNewMessage ? theme.primary : Colors.background.white};

  color: ${({ hasNewMessage, theme }) =>
    hasNewMessage ? Colors.text.white : Colors.text.normal};

  ${({ hasNewMessage }) =>
    hasNewMessage &&
    css`
      animation: ${BrightnessAnimation} 2s infinite;
    `}
`;

export const ChatHeader: FC<ChatHeaderProps> = ({
  profileImage,
  status,
  account,
  userName,
  isMinimized,
  isExpanded,
  onHeaderClick,
  onClose,
  onExpand,
  onMore,
  onProfileClick,
  unreadMessages,
}) => {
  const handleExpandButtonClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onExpand && onExpand(e);
  };

  const handleMoreButtonClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onMore && onMore(e);
  };

  const handleCloseClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClose && onClose(e);
  };

  const handleProfileClick = (e: MouseEvent<HTMLElement>) => {
    if (!isMinimized) {
      e.stopPropagation();
      onProfileClick && onProfileClick(e);
    }
  };

  return (
    <ChatHeaderContainer
      onClick={onHeaderClick}
      hasNewMessage={unreadMessages ? unreadMessages > 0 : false}
    >
      <ProfileContainer>
        <Avatar
          size={32}
          profileImg={profileImage}
          status={status}
          account={account}
        />
        <TitleContainer>
          <UserName {...{ isMinimized }} onClick={handleProfileClick}>
            {userName ?? account}
          </UserName>
          {!isMinimized && <StatusDiv>{status}</StatusDiv>}
        </TitleContainer>
      </ProfileContainer>

      <ControlsContainer>
        {!isMinimized && (
          <>
            <IconButton
              size={32}
              onClick={handleMoreButtonClick}
              color="inherit"
            >
              <MdMoreHoriz />
            </IconButton>
            <IconButton
              size={32}
              onClick={handleExpandButtonClick}
              color="inherit"
            >
              {isExpanded ? <FiMinimize2 /> : <CgArrowsExpandRight />}
            </IconButton>
          </>
        )}
        <IconButton size={32} onClick={handleCloseClick} color="inherit">
          <CgClose />
        </IconButton>
      </ControlsContainer>
    </ChatHeaderContainer>
  );
};

export interface ModalHeaderProps {
  onClose: () => void;
  title: string;
}

export const ModalHeader: FC<ModalHeaderProps> = ({ onClose, title }) => {
  return (
    <StyledMessageHeader>
      <ProfileContainer>
        <TitleContainer>
          <HeaderTitle>{title}</HeaderTitle>
        </TitleContainer>
      </ProfileContainer>
      <ControlsContainer>
        <IconButton size={32} onClick={onClose}>
          <CgClose />
        </IconButton>
      </ControlsContainer>
    </StyledMessageHeader>
  );
};
