import * as uuid from 'uuid/v4';

// Class for a line of text content, that can be toggled on and off as "active"
class LineContent {
  text: string;
  active = true;
  refId: string;

  constructor(text: string, active: boolean, refId?: string) {
    this.text = text;
    this.active = active;
    if (!!refId) {
      this.refId = refId;
    } else {
      this.refId = uuid();
    }
  }

  static parseFromJSON(json: any) {
    return new LineContent(json.t, !!json.a, json.r);
  }

  serializeToJSON() {
    return {t: this.text, a: Number(this.active), r: this.refId};
  }

  clone() {
    return new LineContent(this.text, this.active, this.refId);
  }
}

export {LineContent};
