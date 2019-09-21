
import {ScrapContent} from './ScrapContent';
import UserEdit from '../UserEdit';
import {Script} from '../Script/Script';

class ScriptContent extends ScrapContent {
  script: Script;

  constructor() {
    super();

    this.script = new Script();
  }

  static parse(stringified: string): ScriptContent {
    const retVal = new ScriptContent();

    if (!stringified) {
      return retVal;
    }

    retVal.script = Script.fromString(stringified);

    return retVal;
  }

  toString() {
    return this.script.toString();
  }

  clone(): ScriptContent {
    const newContent = new ScriptContent();
    newContent.script = Script.fromString(this.script.toString());
    return newContent;
  }

  receiveEdit(userEdit: UserEdit) {
    // I *think* we can skip this, just leverage the shared reference to the script object
  }

}

export {ScriptContent};
