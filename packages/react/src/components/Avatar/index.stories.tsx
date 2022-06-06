import { Story, Meta } from '@storybook/react';
import { Avatar, AvatarProps } from './index';

export default {
  component: Avatar,
  title: 'components/Avatar',
} as Meta;

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 50,
};

export const WithStatus = Template.bind({});
WithStatus.args = {
  status: 'online',
  size: 50,
};
