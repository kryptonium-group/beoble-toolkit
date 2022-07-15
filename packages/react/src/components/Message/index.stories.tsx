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
  created_at: '2022-07-14T23:58:10Z',
};

export const MyMessageFollowing = Template.bind({});
MyMessageFollowing.args = {
  isMine: true,
  isFollowing: true,
  content: 'hi',
  created_at: '2022-07-14T23:58:10Z',
};

export const OthersMessage = Template.bind({});
OthersMessage.args = {
  userName: '0xcC847f25746Aee67bA796E26D108AF44D0DA4173',
  isMine: false,
  isFollowing: false,
  content: LoremIpsum,
  created_at: '2022-07-14T23:58:10Z',
};

export const OthersMessageFollowing = Template.bind({});
OthersMessageFollowing.args = {
  isMine: false,
  isFollowing: true,
  content: 'hi',
  created_at: '2022-07-14T23:58:10Z',
};

export const ImageMessage = Template.bind({});
ImageMessage.args = {
  isMine: false,
  isFollowing: true,
  content: (
    <img
      style={{ objectFit: 'cover', margin: '-8px -12px' }}
      alt=""
      src="https://1.bp.blogspot.com/-RmJHrxaA5Zo/XTadowYaxQI/AAAAAAAAFBk/agxMBGgenRwuuUGs3kCpL-Xs2riqezPDwCLcBGAs/s1600/4.gif"
    ></img>
  ),
  created_at: '2022-07-14T23:58:10Z',
};
