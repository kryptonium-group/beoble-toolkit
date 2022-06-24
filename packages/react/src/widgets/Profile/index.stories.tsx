import { Story, Meta } from '@storybook/react';
import { Profile, ProfileProps } from './Profile';
import { BeobleProvider } from '../../contexts';
import { ReactNode } from 'react';

export default {
  component: Profile,
  title: 'Widgets/Profile',
} as Meta;

const Template: Story<ProfileProps> = (args) => (
  <BeobleProvider>
    <Profile {...args} />
  </BeobleProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  detailElement: 'modal',
};
