
export function getDurationStr(durationMs: number): string {
  let intendedDurationSec = durationMs * 0.001;

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

  durationStr += intendedDurationSec.toFixed(2);

  return durationStr;
}
