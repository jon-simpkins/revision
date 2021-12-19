import {checkIsSceneHeader, sceneHeaderDurationSec} from './FountainHeaderComponent';
import {ONE_LINE_DURATION_SEC} from './usefulConstants';

describe('Fountain Scene Header', () => {
  it('should parse scene headers correctly', () => {
    expect(checkIsSceneHeader(true, true, 'INT. ROOM - DAY')).toBeTruthy();
    expect(checkIsSceneHeader(true, false, 'INT. ROOM - DAY')).toBeFalsy();
    expect(checkIsSceneHeader(false, true, 'INT. ROOM - DAY')).toBeFalsy();


    expect(checkIsSceneHeader(true, true, 'ext. space - night')).toBeTruthy();
    expect(checkIsSceneHeader(true, true, 'I/E COURTYARD - CONTINUOUS')).toBeTruthy();
    expect(checkIsSceneHeader(true, true, '.POV - something')).toBeTruthy();
  });

  it('should parse duration correctly', () => {
    expect(sceneHeaderDurationSec('INT. ROOM - DAY')).toEqual(ONE_LINE_DURATION_SEC);
  });
});
