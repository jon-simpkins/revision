import {checkIsSceneTransition, sceneTransitionDurationSec} from './FountainTransitionComponent';
import {ONE_LINE_DURATION_SEC} from './usefulConstants';


describe('Fountain Transition', () => {
  it('parses scene transitions correclty', () => {
    expect(checkIsSceneTransition(true, true,'>fast forward...')).toBeTruthy();
    expect(checkIsSceneTransition(false, true,'>fast forward...')).toBeFalsy();
    expect(checkIsSceneTransition(true, false,'>fast forward...')).toBeFalsy();
    expect(checkIsSceneTransition(true, true,'SNAP TO:')).toBeTruthy();
    expect(checkIsSceneTransition(true, true,'and then we cut TO:')).toBeFalsy();
    expect(checkIsSceneTransition(true, true, 'INT. ROOM - DAY')).toBeFalsy();
  });

  it('should parse duration correctly', () => {
    expect(sceneTransitionDurationSec('CUT TO:')).toEqual(ONE_LINE_DURATION_SEC);
  });
});
