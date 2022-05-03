import { Story, Meta } from '@storybook/react';
import { Chat, ChatProps } from './index';

export default {
  component: Chat,
  title: 'Chat',
} as Meta;

const Template: Story<ChatProps> = (args) => <Chat {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
