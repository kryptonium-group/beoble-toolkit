import { Story, Meta } from '@storybook/react';
import { LoremIpsum } from '../../constants';
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
  content: LoremIpsum,
  timestamp: 1654852163180,
};

export const MyMessageFollowing = Template.bind({});
MyMessageFollowing.args = {
  isMine: true,
  isFollowing: true,
  content: 'hi',
  timestamp: 1654852163180,
};

export const OthersMessage = Template.bind({});
OthersMessage.args = {
  userName: '0xcC847f25746Aee67bA796E26D108AF44D0DA4173',
  isMine: false,
  isFollowing: false,
  content: LoremIpsum,
  timestamp: 1654852163180,
};

export const OthersMessageFollowing = Template.bind({});
OthersMessageFollowing.args = {
  isMine: false,
  isFollowing: true,
  content: 'hi',
  timestamp: 1654852163180,
};
