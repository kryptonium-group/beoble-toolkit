import { Story, Meta } from '@storybook/react';
import { SearchModal, ModalProps } from './index';

export default {
  component: SearchModal,
  title: 'SearchModal',
} as Meta;

const Template: Story<ModalProps> = (args) => <SearchModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
};
