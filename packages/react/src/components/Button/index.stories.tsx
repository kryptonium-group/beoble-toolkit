import { Story, Meta } from '@storybook/react';
import { Button, ButtonProps } from './index';
import { ReactComponent as LogoWhite } from '../../assets/svg/beoble_white.svg';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <Button {...args}>
    <LogoWhite width={20} style={{ marginRight: 4 }} />
    Connect
  </Button>
);

export const IconButton = (
  <Button>
    <LogoWhite width={20} />
  </Button>
);

export const Primary = Template.bind({});
Primary.args = {};
