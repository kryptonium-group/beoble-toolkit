import { Story, Meta } from '@storybook/react';
import ProfileDrawer from './Drawer';
import { Profile, ProfileProps } from './Profile';
import ProfileModal from './Modal/Modal';
import StatusButton from './StatusButton';
import ConnectButton from './ConnectButton';
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

const ProviderTemplate = (prop: ReactNode) => (
  <div style={{ height: '100vh' }}>
    <BeobleProvider>{prop}</BeobleProvider>
  </div>
);

export const Status = () => ProviderTemplate(<StatusButton />);
export const Modal = () => ProviderTemplate(<ProfileModal isOpen />);
export const Drawer = () => ProviderTemplate(<ProfileDrawer />);
export const Connect = () => ProviderTemplate(<ConnectButton />);
