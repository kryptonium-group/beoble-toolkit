import styled, {
  css,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
} from 'styled-components';
import { BreakPoints } from './breakpoint';

export const AppbarHeight = 60;

export const zIndex = {
  appbar: 90,
  modal: 99,
  popover: 100,
  backdrop: 98,
};

export const Colors = {
  neutral: {
    0: '#FAFCFF',
    1: '#f8fafd',
    2: '#eff2f5',
    3: '#cfd6e4',
    4: '#a6b0c3',
    5: '#808a9d',
    6: '#58667e',
  },
  upColor: '#16c784',
  downColor: '#ea3943',
  favorite: '#f6b87e',
  text: {
    highlight: '#171924',
    normal: '#000000',
    sub: '#808A9D',
    lighten: '#58667E',
  },
  external: {
    twitter: '#1DA1F2',
    google: {
      red: '#EA4335',
      blue: '#4285F4',
      yellow: '#FBBC05',
      green: '#34A853',
    },
    beoble: {
      black: '#040404',
      pink: '#e42464',
      blue: '#0cbcf3',
    },
    discord: {
      bluepurple: '#5865F2',
      green: '#57F287',
      yellow: '#FEE75C',
      pink: '#EB459E',
      red: '#ED4245',
    },
  },
  blockchain: {
    ethereum: {
      purple: {
        1: '#8a92b2',
        2: '#62688f',
        3: '#454a75',
      },
      grey: {
        1: '#00000073',
        2: '#000000c7',
        3: '#000000cc',
        4: '#000000eb',
      },
      color: {
        red: '#ff9c92',
        yellow: '#ffe94d',
        green: '#88d848',
        purple: '#cc71c2',
        blue1: '#53d3e0',
        blue2: '#5a9ded',
      },
    },
    polygon: '#8247e5',
    solana: {
      springgreen: '#00ffa3',
      purple: '#dc1fff',
    },
    terra: {
      luna: {
        blue: '#172852',
        yellow: '#ffd83d',
        orange: '#ff6f03',
      },
      logo: {
        blue1: '#5493f0',
        blue2: '#2845ad',
      },
    },
    klaytn: {
      grey: '',
      red: '#ff9c92',
    },
  },
};

export const Fonts = {
  Poppins: 'Poppins',
  Inter: 'Inter',
};

export const setMediaQuery = (
  cssProperties: FlattenSimpleInterpolation | FlattenInterpolation<any>,
  breakpoint = BreakPoints.Mobile
) => css`
  @media screen and (min-width: ${breakpoint}px) {
    ${cssProperties}
  }
`;
