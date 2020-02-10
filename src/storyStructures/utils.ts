export function formatMinutesString(minTime: number): string {
    let strRepresentation = '';


    const minutes = Math.floor(minTime);
    if (minutes < 10) {
      strRepresentation += '0';
    }
    strRepresentation += `${minutes}:`;

    const seconds = Math.round(60 * (minTime - minutes));
    if (seconds < 10) {
      strRepresentation += '0';
    }
    strRepresentation += `${seconds}`;

    return strRepresentation;
  }