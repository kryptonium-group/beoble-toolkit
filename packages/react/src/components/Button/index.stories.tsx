import { Story, Meta } from '@storybook/react';
import { BeobleBlack } from '../Svg';
import { Button, ButtonProps } from './index';
import { ReactComponent as Logo } from '../../assets/svg/beoble_white.svg';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <Button {...args}>
    <Logo width={20} style={{ marginRight: 4 }} />
    Connect
  </Button>
);

export const IconButton = (
  <Button>
    <Logo width={20} />
  </Button>
);
export const Primary = Template.bind({});
Primary.args = {};
