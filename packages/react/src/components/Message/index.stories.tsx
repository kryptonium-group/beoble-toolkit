import { Story, Meta } from '@storybook/react';
import { Message, MessageProps } from './index';

export default {
  component: Message,
  title: 'components/Message',
} as Meta;

const Template: Story<MessageProps> = (args) => <Message {...args} />;

export const MyMessage = Template.bind({});
MyMessage.args = {
  isMine: true,
  isFollowing: false,
};

export const MyMessageFollowing = Template.bind({});
MyMessage.args = {
  isMine: true,
  isFollowing: true,
};

export const OthersMessage = Template.bind({});
OthersMessage.args = {
  isMine: false,
  isFollowing: false,
};

export const OthersMessageFollowing = Template.bind({});
OthersMessage.args = {
  isMine: false,
  isFollowing: true,
};
