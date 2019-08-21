
// Class for storing local details about a story
class StorySummary {
  documentId: string;
  revisionId: string;
  lastFetched: number;

  constructor(documentId: string, revisionId: string, lastFetched: number) {
    this.documentId = documentId;
    this.revisionId = revisionId;
    this.lastFetched = lastFetched;
  }

  static buildFromJSON(jsonObj: any): StorySummary {
    return new StorySummary(
      jsonObj.documentId,
      jsonObj.revisionId,
      jsonObj.lastFetched
    );
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
