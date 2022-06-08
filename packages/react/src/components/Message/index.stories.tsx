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
};

export const MyMessageFollowing = Template.bind({});
MyMessageFollowing.args = {
  isMine: true,
  isFollowing: true,
  content: 'hi',
};

export const OthersMessage = Template.bind({});
OthersMessage.args = {
  isMine: false,
  isFollowing: false,
  content: 'hi',
};

export const OthersMessageFollowing = Template.bind({});
OthersMessageFollowing.args = {
  isMine: false,
  isFollowing: true,
  content: 'hi',
};
