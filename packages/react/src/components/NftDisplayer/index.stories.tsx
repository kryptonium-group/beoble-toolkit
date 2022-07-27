import { Story, Meta } from '@storybook/react';
import { INFT } from '@beoble/js-sdk';
import { NftDisplayer, NftDisplayerProps } from './index';

export default {
  component: NftDisplayer,
  title: 'NftDisplayer',
} as Meta;

const Template: Story<NftDisplayerProps> = (args) => <NftDisplayer {...args} />;

const TestNft: INFT = {
  token_address: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
  token_id:
    '58074305445421951291411413232726457410631245272779603708938916800509042242796',
  name: 'bamnenim.eth',
  description: 'bamnenim.eth, an ENS name.',
  image_url:
    'https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x8064e45d8cf389e9bae3b7a420d83956f8c4a5d89de790e0f5825aa9d94434ec/image',
  chain: 'ETHEREUM',
};

const TestNftHeight: INFT = {
  ...TestNft,
  image_url:
    'https://thumbs.gfycat.com/ActiveDentalIberianlynx-size_restricted.gif',
};

const TestNftLongerWidth: INFT = {
  ...TestNft,
  image_url:
    'http://i2.tcafe2a.com/220121/e567c5213604279a9257c4d004fccd1d_1642747086_8635.gif',
};

export const Primary = Template.bind({});
Primary.args = {
  nft: TestNft,
};

export const Secondary = Template.bind({});
Secondary.args = {
  nft: TestNftHeight,
};

export const Third = Template.bind({});
Third.args = {
  nft: TestNftLongerWidth,
};
