

export function durationSecondsToString(durationSeconds: number): string {
  let durationStr = '';

  const hours = Math.floor(durationSeconds / 3600);
  durationSeconds -= 3600 * hours;
  durationStr += hours.toString().padStart(2, '0') + ':';

  const minutes = Math.floor(durationSeconds / 60);
  durationSeconds -= 60 * minutes;
  durationStr += minutes.toString().padStart(2, '0') + ':';

  durationStr += durationSeconds.toString().padStart(2, '0');

  return durationStr;
}

export function durationStringToSeconds(durationString: string): number {
  const expectedRegex = new RegExp('^[0-9:]+$');
  if (!expectedRegex.test(durationString)) {
    throw Error('Invalid duration string');
  }

  const splitDurationStr = durationString.split(':').filter(Boolean);

  if (splitDurationStr.length > 3) {
    throw Error('Invalid duration string');
  }

  let durationSec = 0;
  for (let i = 0; i < splitDurationStr.length; i++) {
    durationSec = (60 * durationSec) + parseInt(splitDurationStr[i], 10);
  }

  return durationSec;
}
