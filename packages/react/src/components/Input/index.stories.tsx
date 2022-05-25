import { Story, Meta } from '@storybook/react';
import { Input, InputProps } from './index';

export default {
  component: Input,
  title: 'components/Input',
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Name',
  placeholder: 'hi',
  name: 'nameInput',
};
