import { Story, Meta } from '@storybook/react';
import { Identication, IdenticationProps } from './index';

export default {
  component: Identication,
  title: 'Identication',
} as Meta;

const Template: Story<IdenticationProps> = (args) => <Identication {...args} />;

export const Primary = Template.bind({});
Primary.args = { diameter: 24 };
