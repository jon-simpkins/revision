import storySliceReducer, {updateStory, removeStory, clearAllStories, selectStoryMap} from './storyListSlice';
import {Story} from '../../protos_v2';
import {RootState} from '../../app/store';

describe('storyList reducer', () => {
  it('should handle initial state', () => {
    const resultingState = storySliceReducer(undefined, {type: 'unknown'});

    expect(Object.keys(resultingState.storyMap).length).toEqual(0);
  });

  it('should properly add story on update', () => {
    const fakeStory = Story.create({
      id: 'abc123',
      name: 'My new story'
    });

    const resultingState = storySliceReducer(undefined, updateStory(fakeStory));

    expect(resultingState.storyMap['abc123']).toBeTruthy();
  });

  it('should properly remove stories', () => {
    const fakeStory1 = Story.create({
      id: 'abc123',
      name: 'My new story'
    });

    const fakeStory2 = Story.create({
      id: 'def456',
      name: 'My new story 2'
    });

    const resultingState = storySliceReducer(
        {
          storyMap: {
            'abc123': fakeStory1,
            'def456': fakeStory2
          }
        },
        removeStory('abc123')
    );

    expect(resultingState.storyMap['abc123']).toBeFalsy();
    expect(resultingState.storyMap['def456']).toBeTruthy();
  });

  it('should properly clear stories', () => {
    const fakeStory = Story.create({
      id: 'abc123',
      name: 'My new story'
    });

    const resultingState = storySliceReducer(
        {
          storyMap: {
            'abc123': fakeStory
          }
        },
        clearAllStories()
    );

    expect(Object.keys(resultingState.storyMap).length).toEqual(0);
  });

  it('should correctly parse out the story map', () => {
    const state = {
      storyList: {
        storyMap: {
          'a': Story.create({id: 'a'})
        }
      }
    } as unknown as RootState;

    const selected = selectStoryMap(state);

    expect(selected['a'].id).toEqual('a');
  });
});
