import {ONE_LINE_DURATION_SEC} from './usefulConstants';
import {checkIsCentered, sceneCenteredDurationSec} from './FountainCenteredComponent';


describe('Fountain Centered', () => {
  it('parses scene transitions correctly', () => {
    expect(checkIsCentered('>this is centered<')).toBeTruthy();
    expect(checkIsCentered('>fast forward...')).toBeFalsy();
  });

  it('should parse duration correctly', () => {
    expect(sceneCenteredDurationSec('>this is some centered stuff<')).toEqual(ONE_LINE_DURATION_SEC);
  });
});
