import workspaceMetadataReducer, {
  MetadataState,
  addSession,
} from './workspaceMetadataSlice';
import counterReducer, {CounterState} from '../counter/counterSlice';
import {IWritingWorkspaceMetadata, WritingSession} from '../../protos';

describe('counter reducer', () => {
  const initialState = {
    sessionHistory: []
  } as IWritingWorkspaceMetadata;

  it('should handle initial state', () => {
    const resultingState = workspaceMetadataReducer(undefined, {type: 'unknown'});

    expect(resultingState.sessionHistory?.length).toEqual(0);
  });

  it('should handle adding a new session', () => {
    const actual = workspaceMetadataReducer(initialState, addSession(WritingSession.create({})));

    expect(actual.sessionHistory?.length).toEqual(1);
  })
});
