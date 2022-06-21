import { Story, Meta } from '@storybook/react';
import { ChatRoomModal, ChatRoomModalProps } from './index';

export default {
  component: ChatRoomModal,
  title: 'ChatRoomModal',
} as Meta;

const Template: Story<ChatRoomModalProps> = (args) => (
  <ChatRoomModal {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
};
