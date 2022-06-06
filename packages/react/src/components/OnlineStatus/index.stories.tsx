import { Story, Meta } from '@storybook/react';
import { OnlineStatus, OnlineStatusProps } from './index';

export default {
  component: OnlineStatus,
  title: 'OnlineStatus',
} as Meta;

const Template: Story<OnlineStatusProps> = (args) => <OnlineStatus {...args} />;

export const Online = Template.bind({});
Online.args = {
  status: 'online',
  size: 12,
};

export const Mobile = Template.bind({});
Mobile.args = {
  status: 'mobile',
  size: 12,
};

export const Offline = Template.bind({});
Offline.args = {
  status: 'offline',
  size: 12,
};
