import { getLocalTimeFromUTC, isMinEqual } from './timeUtil';

describe('timestamp utility test', () => {
  it('test room', () => {
    console.log('hi');
    console.log(Date.parse('2022-06-20T08:34:52.238902179Z'));
  });

  it('test utc', () => {
    console.log(getLocalTimeFromUTC('2022-06-20T08:34:52.238902179Z'));
  });
});
