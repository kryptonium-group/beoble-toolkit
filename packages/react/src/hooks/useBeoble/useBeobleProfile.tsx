import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IuseBeobleProfile {
  alias?: string;
  display_name?: string;
  description?: string;
  representative_media?: string;
}

export const useBeobleProfile = (): IuseBeobleProfile => {
  return {};
};

export default useBeobleProfile;
