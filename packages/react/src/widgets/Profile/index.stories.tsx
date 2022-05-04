import { Story, Meta } from '@storybook/react';
import { Profile, ProfileProps } from './index';

export default {
  component: Profile,
  title: 'Widgets/Profile',
} as Meta;

const Template: Story<ProfileProps> = (args) => <Profile {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
