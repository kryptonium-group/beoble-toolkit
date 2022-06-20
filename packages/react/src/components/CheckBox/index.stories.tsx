import { Story, Meta } from '@storybook/react';
import { CheckBox, CheckBoxProps } from './index';

export default {
  component: CheckBox,
  title: 'CheckBox',
} as Meta;

const Template: Story<CheckBoxProps> = (args) => <CheckBox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 30,
};
