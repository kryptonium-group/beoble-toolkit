import { Story, Meta } from '@storybook/react';
import ProfileDrawer from './Drawer';
import { Profile, ProfileProps } from './index';
import ProfileModal from './Modal';
import StatusButton from './StatusButton';

export default {
  component: Profile,
  title: 'Widgets/Profile',
} as Meta;

const Template: Story<ProfileProps> = (args) => <Profile {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  detailElement: 'modal',
};

export const Status = () => <StatusButton />;
export const Modal = () => <ProfileModal />;
export const Drawer = () => <ProfileDrawer />;
