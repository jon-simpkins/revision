import {characterDurationSec, checkIsCharacter} from './FountainCharacterComponent';
import {ONE_LINE_DURATION_SEC} from './usefulConstants';

describe('Fountain Character', () => {
  it('parses characters correctly', () => {
    expect(checkIsCharacter(true, false, 'SOMEONE')).toBeTruthy();
    expect(checkIsCharacter(true, false, '@McClane')).toBeTruthy();
    expect(checkIsCharacter(false, false, 'SOMEONE')).toBeFalsy();
    expect(checkIsCharacter(true, true, 'SOMEONE')).toBeFalsy();
  });

  it('should parse duration correctly', () => {
    expect(characterDurationSec('SOMEONE')).toEqual(ONE_LINE_DURATION_SEC);
  });
});
