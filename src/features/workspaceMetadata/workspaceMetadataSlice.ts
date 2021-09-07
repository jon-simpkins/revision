import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {IWritingWorkspaceMetadata, WritingSession} from '../../protos';

const initialState = {
  sessionHistory: []
} as IWritingWorkspaceMetadata;

const workspaceMetadataSlice = createSlice({
  name: 'workspace-metadata',
  initialState,
  reducers: {
    addSession(state, action: PayloadAction<WritingSession>) {
      state.sessionHistory?.push(action.payload);
    }
  },
});

export const { addSession } = workspaceMetadataSlice.actions;
export default workspaceMetadataSlice.reducer;
