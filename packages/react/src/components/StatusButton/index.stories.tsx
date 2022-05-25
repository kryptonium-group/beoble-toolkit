import { Story, Meta } from '@storybook/react';
import { BeobleProvider } from '../../contexts';
import { StatusButton } from './index';

export default {
  component: StatusButton,
  title: 'components/StatusButton',
} as Meta;

const Template: Story = (args) => (
  <BeobleProvider>
    <StatusButton {...args} />
  </BeobleProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
