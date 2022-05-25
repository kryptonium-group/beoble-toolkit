import { Story, Meta } from '@storybook/react';
import { ProfileDrawer } from './index';

export default {
  component: ProfileDrawer,
  title: 'components/ProfileDrawer',
} as Meta;

const Template: Story = (args) => <ProfileDrawer {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
