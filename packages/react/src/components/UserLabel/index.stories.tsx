import { Story, Meta } from '@storybook/react';
import { UserLabel, UserLabelProps } from './index';

export default {
  component: UserLabel,
  title: 'UserLabel',
} as Meta;

const Template: Story<UserLabelProps> = (args) => <UserLabel {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  display_context: '0xb033fB14cF7Dc769488Ad34Ae90D4b3AD810BB25',
};

export const Secondary = Template.bind({});
Secondary.args = {
  display_context: 'bamnenim.eth',
};
