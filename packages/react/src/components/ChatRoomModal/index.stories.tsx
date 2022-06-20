import { Story, Meta } from '@storybook/react';
import { BeobleProvider } from '../../contexts';
import { ChatRoomModal, ChatRoomModalProps } from './index';

export default {
  component: ChatRoomModal,
  title: 'ChatRoomModal',
} as Meta;

const Template: Story<ChatRoomModalProps> = (args) => (
  <BeobleProvider>
    <ChatRoomModal {...args} />
  </BeobleProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
};
