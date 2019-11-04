import * as uuid from 'uuid/v4';
import {isNumber} from 'util';

class StructureBlock {
  startTime: number;
  label: string;
  description: string;
  refId: string = uuid();

  static convertTimeFromStr(timeStr: string): number {
    const parsed = timeStr.trim().split(':').map(subStr => {
      return parseInt(subStr, 10);
    });

    let value = 0;
    let scale = 1;
    while (parsed.length) {
      const nextValue = parsed.pop();
      if (isNumber(nextValue)) {
        value += (scale * nextValue);
        scale *= 60;
      }
    }

    return value;
  }

  static convertSecToStr(sec: number): string {
    const hrs = Math.floor(sec / 3600);
    sec -= 3600 * hrs;
    const minutes = Math.floor(sec / 60);
    sec -= 60 * minutes;
    sec = Math.floor(sec);

    return `${String(hrs).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }

  static convertDurationToStr(sec: number): string {
    if (!sec) {
      return '0 min';
    }

    const hrs = Math.floor(sec / 3600);
    sec -= 3600 * hrs;
    const minutes = Math.floor(sec / 60);
    sec -= 60 * minutes;
    sec = Math.floor(sec);

    const output = [];
    if (hrs) {
      output.push(`${hrs} hrs`);
    }
    if (minutes) {
      output.push(`${minutes} min`);
    }
    if (sec) {
      output.push(`${sec} sec`);
    }
    return output.join(', ');
  }

  static fromJSON(json: any): StructureBlock {
    const newBlock = new StructureBlock();
    newBlock.startTime = parseFloat(json.startTime);
    newBlock.label = json.label;
    newBlock.description = json.description;
    newBlock.refId = json.refId;
    return newBlock;
  }

  toJSON() {
    return {
      startTime: this.startTime,
      label: this.label,
      description: this.description,
      refId: this.refId
    };
  }
}

// Convenience class for defining the major beats of a story / song / narrative
class StoryStructure {

  totalDurationSecStr = '1:40:00';
  totalDurationSec = StructureBlock.convertTimeFromStr(this.totalDurationSecStr);
  blocks: StructureBlock[] = [];

  constructor() {
    const newBlock = new StructureBlock();
    newBlock.startTime = 0;
    newBlock.label = 'First Beat';
    newBlock.description = 'This would be the first beat';
    this.blocks.push(newBlock);
  }

  name = 'My Story Structure';
  id = uuid();

  static fromString(strContent: string): StoryStructure {
    const parsed = JSON.parse(strContent);

    const structure = new StoryStructure();
    structure.name = parsed.name;
    structure.id = parsed.id;
    structure.totalDurationSec = parsed.totalDurationSec;
    structure.totalDurationSecStr = StructureBlock.convertSecToStr(parsed.totalDurationSec);
    structure.blocks = parsed.blocks.map(jsonObj => {
      return StructureBlock.fromJSON(jsonObj);
    });

    return structure;
  }

  toString(): string {
    return JSON.stringify({
      totalDurationSec: this.totalDurationSec,
      blocks: this.blocks.map(block => {
        return block.toJSON();
      }),
      name: this.name,
      id: this.id
    }, null, 4);
  }

  clone(): StoryStructure {
    return StoryStructure.fromString(this.toString());
  }

  duplicate(): StoryStructure {
    const cloned = this.clone();
    cloned.name = 'Clone of ' + cloned.name;
    cloned.id = uuid();
    cloned.blocks.forEach(block => {
      block.refId = uuid();
    });

    return cloned;
  }

  updateDurationStr(str) {
    this.totalDurationSecStr = str;
    const parsedValue = StructureBlock.convertTimeFromStr(str);
    if (parsedValue) {
      this.rescaleToDuraction(parsedValue);
    }
  }

  getTimeRangeStr(idx: number): string {
    const startRangeStr = StructureBlock.convertSecToStr(this.blocks[idx].startTime);
    const endRangeStr = StructureBlock.convertSecToStr(this.getBlockEndSec(idx));
    const durationStr = this.getBlockDurationStr(idx);

    return `${startRangeStr} - ${endRangeStr} (${durationStr})`;
  }

  getBlockDurationSec(idx: number): number {
    return this.getBlockEndSec(idx) - this.blocks[idx].startTime;
  }

  getBlockDurationStr(idx: number): string {
    return StructureBlock.convertDurationToStr(this.getBlockDurationSec(idx));
  }

  getBlockEndSec(idx: number): number {
    if (idx + 1 < this.blocks.length) {
      return this.blocks[idx + 1].startTime;
    }

    return this.totalDurationSec;
  }

  // Determine if a new beat can be created after a particular index
  canCreateAfter(idx: number): boolean {
    return (this.blocks[idx].startTime < this.getBlockEndSec(idx));
  }

  // Creates a new story beat by splitting the time allotted for `idx` in half
  createAfter(idx: number) {
    const newBlock = new StructureBlock();
    newBlock.startTime = Math.ceil((this.blocks[idx].startTime + this.getBlockEndSec(idx)) * 0.5);
    newBlock.label = 'New Block';
    newBlock.description = 'Description goes here';

    this.blocks.splice(idx + 1, 0, newBlock);
  }

  canDelete(idx: number): boolean {
    return idx > 0;
  }

  delete(idx: number) {
    this.blocks.splice(idx, 1);
  }

  canChangeStart(idx) {
    if (idx === 0) {
      return false; // First block is pinned
    }
    let surroundingStartTime = this.blocks[idx - 1].startTime;
    let surroundingEndTime = this.getBlockEndSec(idx);

    return surroundingEndTime > surroundingStartTime;
  }

  getFractionalStart(idx) {
    if (idx === 0) {
      return 0;
    }
    let surroundingStartTime = this.blocks[idx - 1].startTime;
    let surroundingEndTime = this.getBlockEndSec(idx);

    let actualStartTime = this.blocks[idx].startTime;

    return (actualStartTime - surroundingStartTime) / (surroundingEndTime - surroundingStartTime);
  }

  updateBlockLabel(newLabel, idx) {
    this.blocks[idx].label = newLabel;
  }

  updateBlockDescription(newDescription, idx) {
    this.blocks[idx].description = newDescription;
  }

  updateBlockStart(fraction, idx) {
    let surroundingStartTime = this.blocks[idx - 1].startTime;
    let surroundingEndTime = this.getBlockEndSec(idx);

    let newStartTime = Math.floor(surroundingStartTime + fraction * (surroundingEndTime - surroundingStartTime));

    this.blocks[idx].startTime = newStartTime;
  }

  rescaleToDuraction(newDurationSec) {
    let fraction = newDurationSec / this.totalDurationSec;

    this.blocks.forEach(block => {
      block.startTime = Math.round(block.startTime * fraction);
    });

    this.totalDurationSec = newDurationSec;
  }
}

export {StructureBlock, StoryStructure};
