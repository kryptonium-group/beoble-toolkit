import { SVGAttributes } from 'react';

import styled, { css, DefaultTheme, keyframes } from 'styled-components';
export interface SvgProps extends SVGAttributes<HTMLOrSVGElement> {
  theme?: DefaultTheme;
  spin?: boolean;
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const spinStyle = css`
  animation: ${rotate} 2s linear infinite;
`;

const Svg = styled.svg<SvgProps>`
  align-self: center; // Safari fix
  flex-shrink: 0;
  ${({ spin }) => spin && spinStyle}
`;

Svg.defaultProps = {
  color: 'text',
  xmlns: 'http://www.w3.org/2000/svg',
  spin: false,
};

export default Svg;
