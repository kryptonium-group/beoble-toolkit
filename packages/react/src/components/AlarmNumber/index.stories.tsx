import { Story, Meta } from '@storybook/react';
import { AlarmNumber, AlarmNumberProps } from './index';

export default {
  component: AlarmNumber,
  title: 'AlarmNumber',
} as Meta;

const Template: Story<AlarmNumberProps> = (args) => <AlarmNumber {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  count: 1,
};
