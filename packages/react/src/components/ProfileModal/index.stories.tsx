import { Story, Meta } from '@storybook/react';
import { BeobleProvider } from '../../contexts';
import { ProfileModal, ProfileModalProps } from './index';

export default {
  component: ProfileModal,
  title: 'components/ProfileModal',
} as Meta;

const Template: Story<ProfileModalProps> = (args: ProfileModalProps) => {
  return <ProfileModal {...args} />;
};

export const Profile = Template.bind({});
Profile.args = {
  isOpen: true,
};
