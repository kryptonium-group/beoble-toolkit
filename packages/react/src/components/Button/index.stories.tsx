import { Story, Meta } from '@storybook/react';
import { Button, ButtonProps } from './index';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <Button {...args}>Test Button</Button>
);

export const Primary = Template.bind({});
Primary.args = {};

export const IconButton = <Button />;
