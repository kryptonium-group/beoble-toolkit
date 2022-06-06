import { css } from 'styled-components';

export interface SizeProps {
  size?: number;
}

export const SizeCss = css<SizeProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

export const Truncate = css`
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  white-space: nowrap !important;
`;

export const Colors = {
  text: {
    normal: '#000000e6', // 0, 0, 0, 0.9
    lowEmphasis: '#00000099', // 0, 0, 0, 0.6
    action: '#0a66c2',
  },
  background: {
    noneTintHover: '#00000014', // 0, 0, 0, 0.08
    white: '#ffffff',
    shadow: '#0000004d',
  },
};

export const FontWeights = {
  normal: 400,
  bold: 600,
};
