import { Story, Meta } from '@storybook/react';
import { Post, PostProps } from './index';

export default {
  component: Post,
  title: 'Widgets/Post',
} as Meta;

const Template: Story<PostProps> = (args) => <Post {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
