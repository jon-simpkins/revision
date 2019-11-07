
// Class for storing local details about a story
class StorySummary {
  documentId: string;
  revisionId: string;
  lastFetched: number;
  timeSpentSec: number;
  percentComplete: number;

  constructor(documentId: string, revisionId: string, lastFetched: number, timeSpentSec: number, percentComplete: number) {
    this.documentId = documentId;
    this.revisionId = revisionId;
    this.lastFetched = lastFetched;
    this.timeSpentSec = timeSpentSec;
    this.percentComplete = percentComplete;
  }

  static buildFromJSON(jsonObj: any): StorySummary {
    return new StorySummary(
      jsonObj.documentId,
      jsonObj.revisionId,
      jsonObj.lastFetched,
      jsonObj.timeSpentSec || 0,
      jsonObj.percentComplete || 0
    );
  }

  toJSON(): any {
    return {
      documentId: this.documentId,
      revisionId: this.revisionId,
      lastFetched: this.lastFetched,
      timeSpentSec: this.timeSpentSec,
      percentComplete: this.percentComplete
    };
  }
}

export default StorySummary;
