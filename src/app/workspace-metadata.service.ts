import { Injectable } from '@angular/core';
import {
  Duration,
  IDuration,
  ITimestamp,
  IWritingSession,
  IWritingWorkspaceMetadata,
  Timestamp,
  WritingSession,
  WritingWorkspaceMetadata} from '../protos';
import {StorageService} from './storage.service';

const CURRENT_SESSION_KEY = 'currentSession';
const LAST_HEARTBEAT_KEY = 'lastHeartbeat';
const LAST_ACTIVE_HEARTBEAT_KEY = 'lastActiveHeartbeat';
const WRITING_WORKSPACE_METADATA_KEY = 'workspaceMetadata';

const SESSION_TIMEOUT_MS = 1000 *  60; // Allow 1 minute of the browser being closed before you mark session as inactive
const SESSION_ACTIVE_TIMEOUT_MS = 5000; // Allow 5 seconds of the tool being not-visible before we mark as inactive

@Injectable({
  providedIn: 'root'
})
export class WorkspaceMetadataService {

  constructor(private storageService: StorageService) { }

  subscribeToWorkspaceMetadata(handler: (workspaceMetadata: WritingWorkspaceMetadata) => void): string {
    return this.storageService.generateSubscription(WRITING_WORKSPACE_METADATA_KEY, (result) => {
      console.log('GOT SUBSCRIBE RESULT');
      if (result) {
        handler(WritingWorkspaceMetadata.decode(result as Uint8Array));
      } else {
        handler(WritingWorkspaceMetadata.create());
      }
    });
  }

  cancelSubscriptionToWorkspaceMetadata(subscriptionKey: string): void {
    this.storageService.cancelSubscription(subscriptionKey);
  }

  async getWorkspaceMetadata(appendCurrentSession: boolean): Promise<WritingWorkspaceMetadata> {
    const fetchedData = (await this.storageService.get(WRITING_WORKSPACE_METADATA_KEY)) as Uint8Array;
    let workspaceMetadata;
    if (fetchedData) {
      workspaceMetadata = WritingWorkspaceMetadata.decode(fetchedData);
    } else {
      workspaceMetadata = WritingWorkspaceMetadata.create();
    }

    if (appendCurrentSession) {
      const currentSession = await this.getCurrentSession() as IWritingSession;

      workspaceMetadata.sessionHistory = [currentSession].concat(workspaceMetadata.sessionHistory);
    }

    return workspaceMetadata;
  }

  async setWorkspaceMetadata(workspaceMetadata: IWritingWorkspaceMetadata|null): Promise<void> {
    if (!workspaceMetadata) {
      workspaceMetadata = WritingWorkspaceMetadata.create();
    }

    await this.storageService.set(
      WRITING_WORKSPACE_METADATA_KEY,
      WritingWorkspaceMetadata.encode(workspaceMetadata).finish(),
      true
    );
  }

  async saveCurrentSessionToHistory(): Promise<void> {
    await this.setWorkspaceMetadata(
      await this.getWorkspaceMetadata(true)
    );
  }

  // Let the app know the current writing session is still active.
  async updateSessionHeartbeat(): Promise<WritingSession> {
    const isActive = document.visibilityState === 'visible';

    let currentSession = await this.getCurrentSession();
    const lastHeartbeat = await this.storageService.get(LAST_HEARTBEAT_KEY) as number;
    const lastActiveHeartbeat = await this.storageService.get(LAST_ACTIVE_HEARTBEAT_KEY) as number;

    if (!currentSession) {
      currentSession = this.createNewWritingSession();
    } else if (Date.now() - lastHeartbeat > SESSION_TIMEOUT_MS) {
      // Last session is stale, add it to history and initialize a new one
      await this.saveCurrentSessionToHistory();

      currentSession = this.createNewWritingSession();
    }

    currentSession.duration = getDurationBetweenTimestamps(
      currentSession.start as ITimestamp,
      getTimestampFromEpochMS(Date.now())
    );

    if (isActive) {
      const activeDelta = Date.now() - lastActiveHeartbeat;
      if (activeDelta < SESSION_ACTIVE_TIMEOUT_MS) {
        const activeDuration = currentSession.activeDuration || Duration.create({seconds: 0, nanos: 0});

        currentSession.activeDuration = incrementDuration(activeDuration, activeDelta);
      }

      await this.storageService.set(LAST_ACTIVE_HEARTBEAT_KEY, Date.now());
    }

    const encoded = WritingSession.encode(currentSession).finish();
    await this.storageService.set(CURRENT_SESSION_KEY, encoded);
    await this.storageService.set(LAST_HEARTBEAT_KEY, Date.now());

    return currentSession;
  }

  createNewWritingSession(): WritingSession {
    const session = WritingSession.create();
    session.start = getTimestampFromEpochMS(Date.now());
    return session;
  }

  async getCurrentSession(): Promise<WritingSession|null> {
    const current = await this.storageService.get(CURRENT_SESSION_KEY);
    if (!current) {
      return null;
    }

    return WritingSession.decode(current as Uint8Array);
  }
}


function getTimestampFromEpochMS(epochMS: number): Timestamp {
  return Timestamp.create({
    seconds: Math.floor(epochMS / 1000),
    nanos: (epochMS % 1000) * 1e6
  });
}

function getDurationBetweenTimestamps(start: ITimestamp, end: ITimestamp): Duration {
  let nanosDiff = (end.nanos as number) - (start.nanos as number);
  let secondsDiff = (end.seconds as number) - (start.seconds as number);

  while (nanosDiff < 0) {
    secondsDiff -= 1;
    nanosDiff += 1e9;
  }
  while (nanosDiff > 1e9) {
    nanosDiff -= 1e9;
    secondsDiff += 1;
  }
  return Duration.create({
    seconds: secondsDiff,
    nanos: nanosDiff
  });
}

function incrementDuration(duration: IDuration, deltaMs: number): IDuration {
  let nanos = (duration.nanos || 0) + (deltaMs * 1e6);
  let seconds = (duration.seconds || 0);

  while (nanos > 1e9) {
    nanos -= 1e9;
    seconds = (seconds as number) + 1;
  }
  return Duration.create({
    seconds,
    nanos
  });
}
