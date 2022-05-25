import { Story, Meta } from '@storybook/react';
import { NftModal, NftModalProps } from './index';

export default {
  component: NftModal,
  title: 'components/NftModal',
} as Meta;

const Template: Story<NftModalProps> = (args) => <NftModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
