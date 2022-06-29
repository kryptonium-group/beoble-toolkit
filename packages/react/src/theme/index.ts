import { darkColors, defaultColors, lightColors } from './Colors';
import { Colors } from './types';

export interface BeobleTheme {
  colors: Colors;
}

export const lightTheme = {
  ...lightColors,
  ...defaultColors,
};

export const darkTheme = {
  ...defaultColors,
  ...darkColors,
};
