import storySliceReducer, {updateStory, removeStory, selectStoryMap, handleStoryListPersistence, createStory} from './storyListSlice';
import {Story} from '../../protos_v2';
import {RootState} from '../../app/store';
import {addStoryToStorage, clearStoryFromStorage, fetchInitialStateFromStorage, readAllStoriesFromStorage, writeStory} from './storyListPersistence';

describe('storyList reducer', () => {
  it('should handle initial state', () => {
    const resultingState = storySliceReducer(undefined, {type: 'unknown'});

    expect(Object.keys(resultingState.storyMap).length).toEqual(0);
  });

  it('should properly add story on create', () => {
    const fakeStory = Story.create({
      id: 'abc123',
      name: 'My new story'
    });

    const resultingState = storySliceReducer(undefined, createStory(fakeStory));

    expect(resultingState.storyMap['abc123']).toBeTruthy();
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
    }).toJSON();

    const fakeStory2 = Story.create({
      id: 'def456',
      name: 'My new story 2'
    }).toJSON();

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

  it('should correctly parse out the story map', () => {
    const state = {
      storyList: {
        storyMap: {
          'a': {id: 'a'}
        }
      }
    } as unknown as RootState;

    const selected = selectStoryMap(state);

    expect(selected['a'].id).toEqual('a');
  });
});

describe('storyList persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('writes and reads and removes stories as expected', () => {
    const initialStories = readAllStoriesFromStorage();
    expect(initialStories.length).toEqual(0);

    addStoryToStorage(Story.create({
      id: 'abc123'
    }));

    const updatedStories = readAllStoriesFromStorage();
    expect(updatedStories.length).toEqual(1);

    writeStory(Story.create({
      id: 'abc123',
      name: 'My Story'
    }));

    const finalStories = readAllStoriesFromStorage();
    expect(finalStories.length).toEqual(1);
    expect(finalStories[0].name).toEqual('My Story');
    expect(finalStories[0].id).toEqual('abc123');

    clearStoryFromStorage('abc123');

    const storiesAfterRemoval = readAllStoriesFromStorage();
    expect(storiesAfterRemoval.length).toEqual(0);
  });

  test('fetchInitialStateFromStorage loads from storage', () => {
    addStoryToStorage(Story.create({
      id: 'abc123',
      name: 'My Story'
    }));

    const initialState = fetchInitialStateFromStorage();

    expect(initialState.storyMap['abc123']).toBeTruthy();
  });

  test('handleStoryListPersistence works as expected', () => {
    handleStoryListPersistence(createStory(Story.create({
      id: 'abc123',
      name: 'my name'
    })));

    handleStoryListPersistence(updateStory(Story.create({
      id: 'abc123',
      name: 'My Story 2'
    })));

    const finalStories = readAllStoriesFromStorage();
    expect(finalStories.length).toEqual(1);
    expect(finalStories[0].name).toEqual('My Story 2');
    expect(finalStories[0].id).toEqual('abc123');

    handleStoryListPersistence(removeStory('abc123'));

    const storiesAfterRemoval = readAllStoriesFromStorage();
    expect(storiesAfterRemoval.length).toEqual(0);
  });
});
