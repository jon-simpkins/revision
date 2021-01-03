import {ITimestamp, Timestamp} from '../protos';

export function timestampToEpochMs(timestampValue: ITimestamp|null|undefined): number {
  if (!timestampValue) {
    return 0;
  }

  const seconds = timestampValue.seconds as number;
  const nanos = timestampValue.nanos as number;

  return (seconds * 1000) + (nanos / 1e6);
}

export function epochMsToTimestamp(epochMs: number): Timestamp {
  const seconds = Math.floor(epochMs / 1000);
  const nanos = (epochMs - (1000 * seconds)) * 1e6;

  return Timestamp.create({
    seconds,
    nanos,
  });
}

