import { Colors } from '../styles';

export interface Colors {
  primary: string;
  secondary: string;
}

export interface Theme extends Colors {
  text: {
    normal: string; // 0, 0, 0, 0.9
    lowEmphasis: string; // 0, 0, 0, 0.6
    action: string;
    white: string;
  };
  background: {
    noneTintHover: string; // 0, 0, 0, 0.08
    white: string;
    shadow: string; // 0, 0, 0, 0.3
    containerTint: string;
    notification: string;
  };
  signal: {
    positive: string;
    positiveActive: string;
  };
  border: {
    faint: string;
    highlight: string;
  };
}
