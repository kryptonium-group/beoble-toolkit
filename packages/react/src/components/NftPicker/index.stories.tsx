import { Story, Meta } from '@storybook/react';
import { BeobleProvider } from '../../contexts';
import { NftPicker, NftPickerProps } from './index';

export default {
  component: NftPicker,
  title: 'components/NftPicker',
} as Meta;

const Template: Story<NftPickerProps> = (args) => (
  <BeobleProvider>
    <NftPicker {...args} />
  </BeobleProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
