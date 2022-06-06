import { Story, Meta } from '@storybook/react';
import { ConversationPopUp, ConversationPopUpProps } from './index';

export default {
  component: ConversationPopUp,
  title: 'ConversationPopUp',
} as Meta;

const Template: Story<ConversationPopUpProps> = (args) => (
  <ConversationPopUp {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
