
class Script {
  rawText = '';

  constructor() {
    this.rawText = '';
  }

  static fromString(strContent: string): Script {
    const parsed = JSON.parse(strContent);

    const script = new Script();
    script.rawText = parsed.r;

    return script;
  }

  toString(): string {
    return JSON.stringify({
      r: this.rawText
    });
  }
}

export {Script};
