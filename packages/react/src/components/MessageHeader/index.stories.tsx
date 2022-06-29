import { Story, Meta } from '@storybook/react';
import { BeobleProvider } from '../../contexts';
import {
  MessageHeader,
  MessageHeaderProps,
  NewMessageHeader,
  NewMessageHeaderProps,
  ChatHeader,
  ChatHeaderProps,
  ModalHeaderProps,
  ModalHeader,
} from './index';

export default {
  component: MessageHeader,
  title: 'components/MessageHeader',
} as Meta;

const Template: Story<MessageHeaderProps> = (args) => (
  <MessageHeader {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  status: 'online',
};

const NewMessageTemplate: Story<NewMessageHeaderProps> = (args) => (
  <NewMessageHeader {...args} />
);

export const NewMsgHeader = NewMessageTemplate.bind({});
NewMsgHeader.args = {};

const ChatHeaderTemplate: Story<ChatHeaderProps> = (args) => (
  <ChatHeader {...args} />
);

export const ChatHeaderPrimary = ChatHeaderTemplate.bind({});
ChatHeaderPrimary.args = {
  userName: 'bamnenim.eth',
  account: 'bamnenim',
  status: 'online',
  isMinimized: false,
};

const ModalHeaderTemplate: Story<ModalHeaderProps> = (args) => (
  <ModalHeader {...args} />
);

export const ModalHeaderPrimary = ModalHeaderTemplate.bind({});
ModalHeaderPrimary.args = {
  title: 'invite',
};
