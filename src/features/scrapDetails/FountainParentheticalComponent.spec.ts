import {ONE_LINE_DURATION_SEC} from './usefulConstants';
import {checkIsParenthetical, parentheticalDurationSec} from './FountainParentheticalComponent';

describe('Fountain Parentheticals', () => {
  it('parses parentheticals correctly', () => {
    expect(checkIsParenthetical('', '(whispers)')).toBeFalsy();
    expect(checkIsParenthetical('THE PROTAGONIST', 'Oh hi Mark')).toBeFalsy();
    expect(checkIsParenthetical('THE PROTAGONIST', '(whispers)')).toBeTruthy();
  });

  it('should parse duration correctly', () => {
    expect(parentheticalDurationSec('Oh hi Mark')).toEqual(ONE_LINE_DURATION_SEC);
  });
});
