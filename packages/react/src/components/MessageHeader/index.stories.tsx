import { Story, Meta } from '@storybook/react';
import { BeobleProvider } from '../../contexts';
import {
  MessageHeader,
  MessageHeaderProps,
  NewMessageHeader,
  NewMessageHeaderProps,
  ChatHeader,
  ChatHeaderProps,
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
  account: 'bamnenim.eth',
  status: 'online',
  isMinimized: false,
};
