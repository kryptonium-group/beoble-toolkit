import { Story, Meta } from '@storybook/react';
import { ConnectButton } from './index';

export default {
  component: ConnectButton,
  title: 'components/ConnectButton',
} as Meta;

const Template: Story = (args) => <ConnectButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
