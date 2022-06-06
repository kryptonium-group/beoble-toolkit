import { Story, Meta } from '@storybook/react';
import { BeobleProvider } from '../../contexts';
import { MessageOverlay, MessageOverlayProps } from './index';

export default {
  component: MessageOverlay,
  title: 'components/MessageOverlay',
} as Meta;

const Template: Story<MessageOverlayProps> = (args) => (
  <BeobleProvider>
    <MessageOverlay {...args} />
  </BeobleProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
