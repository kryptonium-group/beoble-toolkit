import { Story, Meta } from '@storybook/react';
import { MessageForm, MessageFormProps } from './index';

export default {
  component: MessageForm,
  title: 'MessageForm',
} as Meta;

const Template: Story<MessageFormProps> = (args) => <MessageForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
