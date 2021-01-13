
export function getDurationStr(durationMs: number): string {
  let intendedDurationSec = durationMs / 1000;

  let durationStr = '';

  const min = Math.floor(intendedDurationSec / 60);
  if (min > 0) {
    if (min < 10) {
      durationStr += '0';
    }
    durationStr += min + ':';
    intendedDurationSec -= (60 * min);
  } else {
    durationStr = '00:';
  }

  if (intendedDurationSec < 10) {
    durationStr += '0';
  }

  durationStr += intendedDurationSec;

  return durationStr;
}
