import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import storyListReducer, {storyListPersistenceMiddleware} from '../features/storyList/storyListSlice';

export const store = configureStore({
  reducer: {
    storyList: storyListReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
      storyListPersistenceMiddleware,
  ])
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
