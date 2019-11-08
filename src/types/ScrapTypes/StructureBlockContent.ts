import {ScrapContent, TARGET_CONTENT_TYPE} from './ScrapContent';
import UserEdit from '../UserEdit';

import * as uuid from 'uuid/v4';
import ScrapPrototype from '../ScrapPrototype';

class StructureBlockContent extends ScrapContent {
  targetRefId: string;
  targetType: TARGET_CONTENT_TYPE;

  constructor(targetRefId?: string, targetType?: TARGET_CONTENT_TYPE) {
    super();

    this.targetRefId = targetRefId ? targetRefId : uuid();
    this.targetType = targetType ? targetType : TARGET_CONTENT_TYPE.SCRIPT_SCRAP;
  }

  static parse(stringified: string): StructureBlockContent {
    const retVal = new StructureBlockContent();

    if (!stringified) {
      return retVal;
    }

    const parsed = JSON.parse(stringified);
    retVal.targetRefId = parsed.rid;
    retVal.targetType = parsed.t;

    return retVal;
  }

  toString() {
    return JSON.stringify({
      rid: this.targetRefId,
      t: this.targetType
    });
  }

  clone(): StructureBlockContent {
    const newContent = new StructureBlockContent();
    newContent.targetRefId = this.targetRefId;
    newContent.targetType = this.targetType;
    return newContent;
  }

  receiveEdit(userEdit: UserEdit) {
    // I *think* we can skip this, just leverage the shared reference to the structure object
  }

  getScrapPrototypeOfTarget() {
    if (this.targetType === TARGET_CONTENT_TYPE.SCRIPT_SCRAP) {
      return ScrapPrototype.SCRIPT;
    }

    return ScrapPrototype.STRUCTURE_SPEC;
  }
}

export {StructureBlockContent};
