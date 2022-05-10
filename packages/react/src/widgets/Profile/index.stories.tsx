import { Story, Meta } from '@storybook/react';
import ProfileDrawer from './Drawer';
import { Profile, ProfileProps } from './Profile';
import ProfileModal from './Modal';
import StatusButton from './StatusButton';
import ConnectButton from './ConnectButton';
import { BeobleProvider } from '../../contexts';
import React, { FC, ReactNode } from 'react';

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

const ProviderTemplate = (prop: ReactNode) => (
  <BeobleProvider>{prop}</BeobleProvider>
);

export const Status = () => ProviderTemplate(<StatusButton />);
export const Modal = () => ProviderTemplate(<ProfileModal />);
export const Drawer = () => ProviderTemplate(<ProfileDrawer />);
export const Connect = () => ProviderTemplate(<ConnectButton />);
