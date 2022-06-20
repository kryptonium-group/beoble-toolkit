import { Story, Meta } from '@storybook/react';
import { BeobleProvider } from '../../contexts';
import { UserListItem, UserListItemProps } from './index';

export default {
  component: UserListItem,
  title: 'UserListItem',
} as Meta;

const Template: Story<UserListItemProps> = (args) => (
  <BeobleProvider>
    <UserListItem {...args} />
  </BeobleProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  user: {
    user_id: '',
    display_name: '',
    wallets: ['0xb033fB14cF7Dc769488Ad34Ae90D4b3AD810BB25'],
    representative_media_url: [],
    alias: '',
    create_time: 0,
    update_time: 0,
  },
};
