import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import workspaceMetadataReducer from '../features/workspaceMetadata/workspaceMetadataSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    metadata: workspaceMetadataReducer
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
