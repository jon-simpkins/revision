import {createSlice, Middleware, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {IStory, Story} from '../../protos_v2';
import {addStoryToStorage, clearStoryFromStorage, fetchInitialStateFromStorage, writeStory} from './storyListPersistence';

export interface StoryMap {
  [key: string]: Story;
}

export interface StoryMapInState {
  [key: string]: IStory
}

interface storyListInState {
  storyList: {
    storyMap: StoryMapInState
  }
}

const initialState = fetchInitialStateFromStorage();

const actionPrefix = 'storyList';

const storyListSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    createStory(state, action: PayloadAction<IStory>) {
      state.storyMap[action.payload.id as string] = action.payload;
    },
    updateStory(state, action: PayloadAction<IStory>) {
      state.storyMap[action.payload.id as string] = action.payload;
    },
    removeStory(state, action: PayloadAction<string>) {
      delete state.storyMap[action.payload];
    }
  }
});

export const storyListPersistenceMiddleware: Middleware<{}, storyListInState>
    = storeAPI => next => action => {
  let result = next(action);

  if (action.type.startsWith(actionPrefix + '/')) {
    handleStoryListPersistence(action);
  }

  return result;
}

export const handleStoryListPersistence = (action: PayloadAction<string|Story>) => {
  switch (action.type) {
    case `${actionPrefix}/createStory`:
      addStoryToStorage(action.payload as Story);
      break;
    case `${actionPrefix}/updateStory`:
      writeStory(action.payload as Story);
      break;
    case `${actionPrefix}/removeStory`:
      clearStoryFromStorage(action.payload as string);
      break;
  }
}

// Selector for fetching full map of stories
export const selectStoryMap = (state: storyListInState|RootState): StoryMap => {
  const compiledStoryMap: StoryMap = {};

  for (const [key, value] of Object.entries(state.storyList.storyMap)) {
    compiledStoryMap[key] = Story.fromObject(value);
  }

  return compiledStoryMap;
}

// Creates selector for particular story
export const selectSpecificStory = (id: string) => (state: storyListInState|RootState): Story|null => {
  const fetchedStory = state.storyList.storyMap[id];

  if (!fetchedStory) {
    return null;
  }

  return Story.create(fetchedStory);
}

export const { createStory, updateStory, removeStory } = storyListSlice.actions;
export default storyListSlice.reducer;
