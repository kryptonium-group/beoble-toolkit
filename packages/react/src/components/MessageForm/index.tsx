import styled from 'styled-components';
import { AiOutlinePaperClip, AiOutlinePicture } from 'react-icons/ai';
import { MdGif, MdMoreHoriz } from 'react-icons/md';
import { BsEmojiSmile } from 'react-icons/bs';
import { Colors } from '../../styles';
import IconButton from '../IconButton';
import Button from '../Button';
import React, {
  ChangeEvent,
  FC,
  SyntheticEvent,
  useState,
  KeyboardEvent,
} from 'react';

/* eslint-disable-next-line */
export interface MessageFormProps {
  onSend: (value: string) => void;
  disabled?: boolean;
}

const FormContainer = styled.form`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  max-height: 100%;
  position: static;
  width: 100%;

  transition: all 132ms cubic-bezier(0.34, 0, 0.21, 1);
`;

const TextEditorContainer = styled.div<{ isFocused: boolean }>`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  max-height: 100%;
  overflow: hidden;

  position: relative;
  flex-grow: 1 !important;

  &::before {
    content: '';
    height: 2px;
    transition-property: transform;
    transform: translateX(${({ isFocused }) => (isFocused ? '0' : '-50%')});
    transition-duration: 132ms;
    top: 0;
    width: 200%;
    position: absolute;
    background: linear-gradient(
      to right,
      ${Colors.signal.positive} 50%,
      ${Colors.border.faint} 50%
    );
  }
`;

const TextEditor = styled.textarea`
  outline: none;
  border: none;
  min-height: 60px;
  overflow: auto;
  padding: 12px 48px 0 12px;
  resize: none;

  &:disabled {
    cursor: not-allowed;
  }
`;

const FormFooter = styled.footer`
  display: flex;
  align-items: center;
  flex-shrink: 0 !important;
  border-top: 1px solid ${Colors.background.noneTintHover};
  justify-content: space-between;
  margin-top: auto;
  padding: 4px 8px;
  background-color: ${Colors.background.containerTint};
`;

const FooterActionButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SendButton = styled(Button)`
  margin-right: 8px;
`;

export const MessageForm: FC<MessageFormProps> = ({ onSend, disabled }) => {
  const [isFocused, setIsFoucesd] = useState(false);
  const [messageContent, setMessageContent] = useState('');

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessageContent(e.target.value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleSendMessage = () => {
    onSend(messageContent);
    setMessageContent('');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <TextEditorContainer {...{ isFocused }}>
        <TextEditor
          placeholder="Write a mesage..."
          onFocus={() => setIsFoucesd(true)}
          onBlur={() => setIsFoucesd(false)}
          onChange={handleMessageChange}
          value={messageContent}
          onKeyDown={handleKeyDown}
          {...{ disabled }}
        />
      </TextEditorContainer>
      <FormFooter>
        <FooterActionButtonContainer>
          <IconButton size={32} {...{ disabled }} type="button">
            <AiOutlinePicture />
          </IconButton>
          <IconButton size={32} {...{ disabled }} type="button">
            <AiOutlinePaperClip />
          </IconButton>
          <IconButton size={32} {...{ disabled }} type="button">
            <MdGif />
          </IconButton>
          <IconButton size={32} {...{ disabled }} type="button">
            <BsEmojiSmile />
          </IconButton>
        </FooterActionButtonContainer>
        <FooterActionButtonContainer>
          <SendButton disabled={!messageContent || disabled} type="submit">
            Send
          </SendButton>
          <IconButton size={32} {...{ disabled }} type="button">
            <MdMoreHoriz />
          </IconButton>
        </FooterActionButtonContainer>
      </FormFooter>
    </FormContainer>
  );
};

export default MessageForm;
