import {checkIsDialogue, dialogueDurationSec} from './FountainDialogueComponent';
import {ONE_LINE_DURATION_SEC} from './usefulConstants';

describe('Fountain Dialogue', () => {
  it('parses dialogue correctly', () => {
    expect(checkIsDialogue('', 'Oh hi Mark')).toBeFalsy();
    expect(checkIsDialogue('THE PROTAGONIST', 'Oh hi Mark')).toBeTruthy();
    expect(checkIsDialogue('THE PROTAGONIST', '(whispers)')).toBeFalsy();
  });

  it('should parse duration correctly', () => {
    expect(dialogueDurationSec('Oh hi Mark')).toEqual(ONE_LINE_DURATION_SEC);
  });
});
