import {createSlice, Middleware, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {Story} from '../../protos_v2';
import {addStoryToStorage, clearStoryFromStorage, fetchInitialStateFromStorage, writeStory} from './storyListPersistence';

export interface StoryMap {
  [key: string]: Story;
}

export interface StoryMapInState {
  [key: string]: any
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
    createStory(state, action: PayloadAction<Story>) {
      state.storyMap[action.payload.id] = action.payload.toJSON();
    },
    updateStory(state, action: PayloadAction<Story>) {
      state.storyMap[action.payload.id] = action.payload.toJSON();
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

export const { createStory, updateStory, removeStory } = storyListSlice.actions;
export default storyListSlice.reducer;
