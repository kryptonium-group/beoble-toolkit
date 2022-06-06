import { convertTimestampTo } from './timeUtil';

describe('timestamp utility test', () => {
  it('', () => {
    const current = Date.now();
    const formattedTime = convertTimestampTo(current);
    console.log(formattedTime);
  });
});
