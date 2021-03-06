// @flow

jest.mock('./logger.js');

const logger = require('./logger.js');
const asyncUtils = require('./async.js');

describe('asyncUtils.exec()', () => {
  it('should be a function', () => {
    expect(typeof asyncUtils.exec).toBe('function');
  });

  it('should execute the function with the provided args', async () => {
    const fn = jest.fn(() => Promise.resolve());
    const args = ['foo', 'bar'];

    await asyncUtils.exec(fn, ...args);

    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0]).toEqual(args);
  });

  it('should safely fail if the function rejects with a call to the logger.fatal method.', async () => {
    const fn = jest.fn(() => Promise.reject(new Error('Foo bar')));

    await asyncUtils.exec(fn);

    expect(logger.fatal.mock.calls.length).toBe(1);
    expect(logger.fatal.mock.calls).toEqual([['Foo bar']]);
  });
});
