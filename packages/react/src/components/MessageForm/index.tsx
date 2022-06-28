import styled from 'styled-components';
import { AiOutlinePaperClip, AiOutlinePicture } from 'react-icons/ai';
import dynamic from 'next/dynamic';
import { MdGif, MdMoreHoriz } from 'react-icons/md';
import { BsEmojiSmile } from 'react-icons/bs';
import { IEmojiData } from 'emoji-picker-react';
import { Colors } from '../../styles';
import IconButton from '../IconButton';
import Button from '../Button';
import React, {
  ChangeEvent,
  FC,
  SyntheticEvent,
  useState,
  KeyboardEvent,
  MouseEvent,
  useRef,
} from 'react';

/* eslint-disable-next-line */
export interface MessageFormProps {
  onSend: (value: string) => void;
  disabled?: boolean;
}

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

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
  background-color: #fff;
  color: ${Colors.text.normal};

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

const PickerContainer = styled.div`
  position: fixed;
  transform: translateY(calc(-100% - 8px)) translateX(-30%);
`;

const IconContainer = styled.div``;

const UploadInput = styled.input`
  display: none;
`;

export const MessageForm: FC<MessageFormProps> = ({ onSend, disabled }) => {
  const [isFocused, setIsFoucesd] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pictureInputRef = useRef<HTMLInputElement>(null);

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

  const handleEmojiClick = (e: MouseEvent, emoji: IEmojiData) => {
    setIsEmojiPickerOpen(false);
    setMessageContent((prev) => prev + emoji.emoji);
  };

  const toggleEmojiPicker = () => {
    setIsEmojiPickerOpen((prev) => !prev);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target?.files);
  };

  const handlePictureUpload = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target?.files);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <TextEditorContainer {...{ isFocused }}>
        <TextEditor
          placeholder="Write a message..."
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
          <UploadInput
            ref={pictureInputRef}
            type="file"
            accept="image/png, image/jpeg, image/gif"
            name="image_upload"
            onChange={handlePictureUpload}
          />
          <IconButton
            size={32}
            {...{ disabled }}
            type="button"
            onClick={() => pictureInputRef.current?.click()}
          >
            <AiOutlinePicture />
          </IconButton>
          <UploadInput
            ref={fileInputRef}
            type="file"
            name="file_upload"
            onChange={handleFileUpload}
          />
          <IconButton
            size={32}
            {...{ disabled }}
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <AiOutlinePaperClip />
          </IconButton>
          {/**
             * 
          <IconButton size={32} {...{ disabled }} type="button">
            <MdGif />
          </IconButton>
             */}
          <IconContainer>
            {isEmojiPickerOpen && (
              <PickerContainer>
                <Picker onEmojiClick={handleEmojiClick} />
              </PickerContainer>
            )}
            <IconButton
              size={32}
              {...{ disabled }}
              type="button"
              onClick={toggleEmojiPicker}
            >
              <BsEmojiSmile />
            </IconButton>
          </IconContainer>
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
