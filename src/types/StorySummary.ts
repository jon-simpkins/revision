
// Class for storing local details about a story
class StorySummary {
  documentId: string;
  revisionId: string;
  lastFetched: number;

  constructor() {}

  static buildFromJSON(jsonObj: any): StorySummary {
    let newSummary = new StorySummary();
    newSummary.documentId = jsonObj.documentId;
    newSummary.revisionId = jsonObj.revisionId;
    newSummary.lastFetched = jsonObj.lastFetched;

    return newSummary;
  }

  toJSON(): any {
    return {
      documentId: this.documentId,
      revisionId: this.revisionId,
      lastFetched: this.lastFetched
    };
  }

  getLastUpdateStr(): string {
    return new Date(this.lastFetched).toLocaleString();
  }

}

export default StorySummary;
