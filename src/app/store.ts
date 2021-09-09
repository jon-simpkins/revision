import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import workspaceMetadataReducer from '../features/workspaceMetadata/workspaceMetadataSlice';
import storyListReducer from '../features/storyList/storyListSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    metadata: workspaceMetadataReducer,
    storyList: storyListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
