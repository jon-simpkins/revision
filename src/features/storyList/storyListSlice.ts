import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {Story} from '../../protos_v2';

export interface StoryMap {
  [key: string]: Story;
}

const initialState = {
  storyMap: {} as StoryMap
};

const storyListSlice = createSlice({
  name: 'storyList',
  initialState,
  reducers: {
    updateStory(state, action: PayloadAction<Story>) {
      state.storyMap[action.payload.id] = action.payload;
    },
    removeStory(state, action: PayloadAction<string>) {
      delete state.storyMap[action.payload];
    },
    clearAllStories(state) {
      state.storyMap = {} as StoryMap;
    }
  }
});

// Selector for fetching full map of stories
export const selectStoryMap = (state: RootState) => state.storyList.storyMap;

export const { updateStory, removeStory, clearAllStories } = storyListSlice.actions;
export default storyListSlice.reducer;
