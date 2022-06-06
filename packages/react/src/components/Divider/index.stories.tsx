import { Story, Meta } from '@storybook/react';
import { Divider, DividerProps } from './index';

export default {
  component: Divider,
  title: 'components/Divider',
} as Meta;

const Template: Story<DividerProps> = (args) => <Divider {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const WithText = Template.bind({});
WithText.args = {
  children: 'Today',
};
