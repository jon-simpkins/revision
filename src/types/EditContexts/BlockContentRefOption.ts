import {TARGET_CONTENT_TYPE} from '../ScrapTypes/ScrapContent';

class BlockContentRefOption {
  constructor(
    public type: TARGET_CONTENT_TYPE,
    public label: string,
    public refId: string,
    public existingScrapId: string,
  ) {}
}

export default BlockContentRefOption;
