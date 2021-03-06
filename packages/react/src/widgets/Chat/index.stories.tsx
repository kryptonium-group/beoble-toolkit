import { Story, Meta } from '@storybook/react';
import { BeobleProvider } from '../../contexts';
import { Chat, ChatProps } from './index';

export default {
  component: Chat,
  title: 'Widgets/Chat',
} as Meta;

const Template: Story<ChatProps> = (args) => (
  <BeobleProvider>
    <Chat {...args} />
  </BeobleProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
