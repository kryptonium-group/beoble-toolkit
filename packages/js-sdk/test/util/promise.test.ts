import { until } from '../../src/util';

describe('Promise Uitls test', () => {
  test('until', async () => {
    let testCondition = false;
    setTimeout(() => {
      testCondition = true;
    }, 1000);

    await until(() => testCondition == true);
    expect(testCondition).toBeTruthy();
  });
});
