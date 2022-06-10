import { Story, Meta } from '@storybook/react';
import { BeobleProvider } from '../../contexts';
import { ConversationPopUp, ConversationPopUpProps } from './index';

export default {
  component: ConversationPopUp,
  title: 'components/ConversationPopUp',
} as Meta;

const Template: Story<ConversationPopUpProps> = (args) => (
  <BeobleProvider>
    <ConversationPopUp {...args} />
  </BeobleProvider>
);

const TestChatRooms = {
  1: '16d2fc54-b2f3-49cb-8b96-fc8759755fce',
  2: '1c55462f-8746-4fa4-a6df-4d0265d53311',
  3: '36fff3fc-13e2-4ca6-844a-909fa0d753e8',
  4: '5635d92a-aea4-4408-96ee-7a3e25c4c540',
  5: '5a14b21d-f474-4ee9-945e-3a6d317b969c',
  6: '617c7215-8c1a-4dc6-b6ed-c5b102bd8462', // group chat
  7: '763bc8a9-a4fc-4f1b-98e0-52d994aacfcc',
  8: 'a0c26f80-4840-4a69-8c32-3a2196e311aa',
  9: 'a96e17ff-22ca-4267-907c-296af05f5217',
  10: 'db37bfff-6c40-4a21-b2df-b23b6f6d7811',
  11: 'e4937750-a3ff-43ee-bfbc-2e6c5e39e707',
};

export const Primary = Template.bind({});
Primary.args = {
  chatroomId: TestChatRooms[1],
};
