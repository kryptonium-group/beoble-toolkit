import { css, keyframes } from 'styled-components';

export const mountAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
   to {
    opacity: 1;
    transform: translateY(0);
   }
`;

export const Appear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const BrightnessAnimation = keyframes`
  0% {
    filter: brightness(1) 
  }
  50% {
    filter: brightness(1.2)
  }
  100% {
    filter: brightness(1) 
  }
`;

export const flexStretch = css`
  vertical-align: inherit;
  max-width: 100%;
  min-height: 0px;
  min-width: 0px;
  flex-shrink: 0;
  flex-direction: column;
  flex-basis: auto;
  display: flex;
  -webkit-box-align: stretch;
  align-items: stretch;
`;

export const noBorder = css`
  border-width: 0px;
  border-style: solid;
  border-color: rgb(255, 255, 255);
`;
