import { Story, Meta } from '@storybook/react';
import { MdArrowBack } from 'react-icons/md';
import { IconButton, IconButtonProps } from './index';

export default {
  component: IconButton,
  title: 'IconButton',
} as Meta;

const Template: Story<IconButtonProps> = (args) => (
  <IconButton {...args}>
    <MdArrowBack />
  </IconButton>
);

export const Primary = Template.bind({});
Primary.args = {
  size: 32,
  onClick: () => {
    console.log('hi');
  },
};
