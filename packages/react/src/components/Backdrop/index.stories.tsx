import { Story, Meta } from '@storybook/react';
import { Backdrop, BackdropProps } from './index';

export default {
  component: Backdrop,
  title: 'components/Backdrop',
} as Meta;

const Template: Story<BackdropProps> = (args) => (
  <>
    <h1>BLUR THIS</h1>
    <Backdrop {...args} />
  </>
);

export const Primary = Template.bind({});
Primary.args = {};
