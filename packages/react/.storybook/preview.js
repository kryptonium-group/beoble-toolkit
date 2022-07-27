// .storybook/preview.js

import React from 'react';

import { ThemeProvider } from 'styled-components';
import { Core } from '@beoble/js-sdk';
import { BeobleProvider } from '../src';

const demoAppId = 'ddcd9c84-45c7-4d05-8008-18582d7f91be';
const core = new Core({
  appId: demoAppId,
});

export const decorators = [
  (Story) => (
    <BeobleProvider Beoble={core}>
      <Story />
    </BeobleProvider>
  ),
];
