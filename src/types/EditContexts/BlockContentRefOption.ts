import {TARGET_CONTENT_TYPE} from '../ScrapTypes/ScrapContent';

class BlockContentRefOption {
  constructor(
    public type: TARGET_CONTENT_TYPE,
    public label: string,
    public refId: string,
    public exists: boolean
  ) {}
}

export default BlockContentRefOption;
