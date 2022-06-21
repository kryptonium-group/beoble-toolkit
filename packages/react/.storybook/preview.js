// .storybook/preview.js

import React from 'react';

import { ThemeProvider } from 'styled-components';
import { BeobleProvider } from '../src';

export const decorators = [
  (Story) => (
    <BeobleProvider>
      <Story />
    </BeobleProvider>
  ),
];
