import assert from 'assert';
import isRgbColor from '../src/lib/isRgbColor';

describe('isRgbColor whitespace regression', () => {
  const valid = [
    'rgb( 255 , 0 , 0 )',
    'rgba(0, 0, 0, 0.5)',
    'rgb(25%, 0%, 0%)',
  ];

  const invalid = [
    'rgb(2 55,0,0)',
    'rgba(0,0,0,0. 5)',
    'rgb(25 %,0%,0%)',
  ];

  valid.forEach((value) => {
    it(`accepts ${value}`, () => {
      assert.strictEqual(
        isRgbColor(value, { allowSpaces: true }),
        true
      );
    });
  });

  invalid.forEach((value) => {
    it(`rejects ${value}`, () => {
      assert.strictEqual(
        isRgbColor(value, { allowSpaces: true }),
        false
      );
    });
  });
});
describe('isRgbColor existing whitespace cases', () => {
  const options = {
    includePercentValues: true,
    allowSpaces: true,
  };

  const valid = [
    'rgb(  5, 5, 5)',
    'rgba(5, 5, 5, .3)',
    'rgb(0, 0, 0)',
    'rgb(255, 255, 255)',
    'rgba(0, 0, 0, 0)',
    'rgba(255, 255, 255, 1)',
    'rgba(255, 255, 255, .1)',
    'rgba(255, 255, 255, 0.1)',
    'rgb(5% ,5% ,5%)',
    'rgba(5%,5%,5%, .3)',
  ];

  const invalid = [
    'r         g    b(   0,         251,       222     )',
    'rgb(4,4,5%)',
    'rgb(101%,101%,101%)',
  ];

  valid.forEach((value) => {
    it(`accepts ${value}`, () => {
      assert.strictEqual(isRgbColor(value, options), true);
    });
  });

  invalid.forEach((value) => {
    it(`rejects ${value}`, () => {
      assert.strictEqual(isRgbColor(value, options), false);
    });
  });
});

