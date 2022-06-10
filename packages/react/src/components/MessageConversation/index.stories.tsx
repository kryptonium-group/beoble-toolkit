import { Story, Meta } from '@storybook/react';
import { BeobleProvider } from '../../contexts';
import { MessageConversation, MessageConversationProps } from './index';

export default {
  component: MessageConversation,
  title: 'components/MessageConversation',
} as Meta;

const Template: Story<MessageConversationProps> = (args) => (
  <BeobleProvider>
    <MessageConversation {...args} />
  </BeobleProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  userName: 'Jungwoo Yun',
  timestamp: 1622801470000,
  lastMessage: 'test',
  profilePhoto:
    'https://media-exp1.licdn.com/dms/image/C5603AQGQJWAskNWE6A/profile-displayphoto-shrink_800_800/0/1647142782272?e=1659571200&v=beta&t=PQH7kySERsYApUM5kh2Mj50IixZtaQMW4xW5jeGxL-Q',
};
