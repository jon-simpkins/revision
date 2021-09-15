import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import storyListReducer, {storyListPersistenceMiddleware} from '../features/storyList/storyListSlice';
import scrapListReducer, {scrapListPersistenceMiddleware} from '../features/scrapList/scrapListSlice';

export const store = configureStore({
  reducer: {
    storyList: storyListReducer,
    scrapList: scrapListReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    storyListPersistenceMiddleware,
    scrapListPersistenceMiddleware,
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
