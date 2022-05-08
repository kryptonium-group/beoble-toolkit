import styled, { css } from 'styled-components';
import { setMediaQuery, zIndex } from '.';
import { BreakPoints } from './breakpoint';

export const Body = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexCenterDiv = styled.div`
  ${FlexCenter}
`;

export const Container = styled.div`
  width: 100%;
  max-width: ${BreakPoints.Mobile}px;
  margin: 0 auto;

  ${setMediaQuery(css`
    max-width: ${BreakPoints.Desktop}px;
  `)}
`;

export const MobileOnlyWrapper = styled.div`
  ${setMediaQuery(css`
    display: none;
  `)}
`;
export const DesktopOnlyWrapper = styled.div`
  display: none;
  ${setMediaQuery(css`
    display: initial;
  `)}
`;

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(10, 30, 66, 0.4);
  z-index: ${zIndex.backdrop};
  transition: opacity 0.2s ease-in-out;
`;
