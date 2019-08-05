// @flow
import * as options from '../options';
import {
  toDependency,
  toYarnInit,
  string,
  boolean,
  number,
  toFilterOpts
} from '../options';

describe('options', () => {
  test('string', () => {
    expect(string(undefined, 'flag')).toBe();
    expect(string('test', 'flag')).toBe('test');
    expect(() => string(123, 'flag')).toThrow();
  });

  test('boolean', () => {
    expect(boolean(true, 'flag')).toEqual(true);
    expect(boolean(false, 'flag')).toEqual(false);
    expect(() => boolean(123, 'flag')).toThrow();
  });

  test('number', () => {
    expect(number(1, 'flag')).toEqual(1);
    expect(number(2.2, 'flag')).toEqual(2.2);
    expect(() => number('number', 'flag')).toThrow();
  });

  test('toFilterOptions', () => {
    expect(toFilterOpts({ only: 'one' })).toEqual({
      only: ['one']
    });
    expect(toFilterOpts({ only: 'one,two' })).toEqual({
      only: ['one', 'two']
    });
    expect(toFilterOpts({ only: ['one', 'two'] })).toEqual({
      only: ['one', 'two']
    });
    expect(toFilterOpts({ onlyFs: 'one' })).toEqual({
      onlyFs: ['one']
    });
    expect(toFilterOpts({ onlyFs: 'one,two' })).toEqual({
      onlyFs: ['one', 'two']
    });
    expect(toFilterOpts({ onlyFs: ['one', 'two'] })).toEqual({
      onlyFs: ['one', 'two']
    });
    expect(toFilterOpts({ ignore: 'one' })).toEqual({
      ignore: ['one']
    });
    expect(toFilterOpts({ ignore: 'one,two' })).toEqual({
      ignore: ['one', 'two']
    });
    expect(toFilterOpts({ ignore: ['one', 'two'] })).toEqual({
      ignore: ['one', 'two']
    });
    expect(toFilterOpts({ ignoreFs: 'one' })).toEqual({
      ignoreFs: ['one']
    });
    expect(toFilterOpts({ ignoreFs: 'one,two' })).toEqual({
      ignoreFs: ['one', 'two']
    });
    expect(toFilterOpts({ ignoreFs: ['one', 'two'] })).toEqual({
      ignoreFs: ['one', 'two']
    });
    expect(toFilterOpts({})).toEqual({});
  });

  test('toDependency', () => {
    let name = 'packageName';
    let version = '1.0.0';
    expect(toDependency(name)).toEqual({ name });
    let nameWithVersion = `packageName@${version}`;
    expect(toDependency(nameWithVersion)).toEqual({ name, version });
    nameWithVersion = `@packageName/${version}`;
    expect(toDependency(nameWithVersion)).toEqual({ name: nameWithVersion });
    nameWithVersion = `@packageName@${version}`;
    expect(toDependency(nameWithVersion)).toEqual({ name, version });
  });

  test('toYarnInit', () => {
    let flag = true;

    expect(toYarnInit({})).toEqual({});

    expect(toYarnInit({ y: flag })).toEqual({ yes: true });
    expect(toYarnInit({ y: !flag })).toEqual({});
    expect(toYarnInit({ yes: flag })).toEqual({ yes: true });
    expect(toYarnInit({ yes: !flag })).toEqual({});
    expect(toYarnInit({ private: flag })).toEqual({ private: true });
    expect(toYarnInit({ private: !flag })).toEqual({});
    expect(toYarnInit({ p: flag })).toEqual({ private: true });
    expect(toYarnInit({ p: !flag })).toEqual({});

    expect(toYarnInit({ y: flag, p: !flag })).toEqual({ yes: true });
    expect(toYarnInit({ private: flag, y: !flag })).toEqual({ private: true });

    expect(toYarnInit({ y: !flag, p: !flag })).toEqual({});
    expect(toYarnInit({ y: flag, p: flag })).toEqual({
      yes: true,
      private: true
    });
  });
});
