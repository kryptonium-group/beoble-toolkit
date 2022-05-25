import { Story, Meta } from '@storybook/react';
import { NftPicker, NftPickerProps } from './index';

export default {
  component: NftPicker,
  title: 'components/NftPicker',
} as Meta;

const Template: Story<NftPickerProps> = (args) => <NftPicker {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
