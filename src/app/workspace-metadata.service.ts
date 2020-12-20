import { Injectable } from '@angular/core';
import {StorageMap} from '@ngx-pwa/local-storage';
import {Duration, ITimestamp, Timestamp, WritingSession} from '../protos';

const CURRENT_SESSION_KEY = 'currentSession';
const LAST_HEARTBEAT_KEY = 'lastHeartbeat';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceMetadataService {

  constructor(private storage: StorageMap) { }

  async saveSessionToHistory(session: WritingSession): Promise<void> {
    console.log(session);
    console.log('^^ need to save that to history');
  }

  // Let the app know the current writing session is still active.
  async updateSessionHeartbeat(): Promise<WritingSession> {
    let currentSession = await this.getCurrentSession();
    const lastHeartbeat = await this.storage.get(LAST_HEARTBEAT_KEY).toPromise() as number;

    if (!currentSession) {
      console.log('no current session!');
      currentSession = this.createNewWritingSession();
    } else if (Date.now() - lastHeartbeat > 5000) {
      // Last session is stale, add it to history and initialize a new one
      await this.saveSessionToHistory(currentSession);

      currentSession = this.createNewWritingSession();
    }

    currentSession.duration = getDurationBetweenTimestamps(
      currentSession.start as ITimestamp,
      getTimestampFromEpochMS(Date.now())
    );

    const encoded = WritingSession.encode(currentSession).finish();
    await this.storage.set(CURRENT_SESSION_KEY, encoded).toPromise();
    await this.storage.set(LAST_HEARTBEAT_KEY, Date.now()).toPromise();

    return currentSession;
  }

  createNewWritingSession(): WritingSession {
    const session = WritingSession.create();
    session.start = getTimestampFromEpochMS(Date.now());
    return session;
  }

  async getCurrentSession(): Promise<WritingSession|null> {
    const current = await this.storage.get(CURRENT_SESSION_KEY).toPromise();
    if (!current) {
      return null;
    }

    try {
      return WritingSession.decode(current as Uint8Array);
    } catch (e) {
      console.error(e);
      return null;
    }
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
