import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import scrapListReducer, {scrapListPersistenceMiddleware} from '../features/scrapList/scrapListSlice';
import headerOptionsReducer from '../features/revision-header/headerOptionsSlice';

export const store = configureStore({
  reducer: {
    scrapList: scrapListReducer,
    headerOptions: headerOptionsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
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
