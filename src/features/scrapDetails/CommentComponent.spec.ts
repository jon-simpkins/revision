import {checkIsCommentEnd, checkIsCommentStart} from './CommentComponent';


describe('Comment', () => {
  it('should parse comment start / end correctly', () => {
    expect(checkIsCommentStart('/** my comment')).toBeTruthy();
    expect(checkIsCommentEnd('something something */')).toBeTruthy();
    expect(checkIsCommentStart('INT. ROOM - DAY')).toBeFalsy();
    expect(checkIsCommentEnd('INT. ROOM - DAY')).toBeFalsy();
  });
});
