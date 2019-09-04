import Scrap from '../../../types/Scrap';
import ViewContentBlock, {ViewContentBlockType} from './ViewContentBlock';

function generateChangelog(scraps: Map <string, Scrap>): ViewContentBlock[] {
  let blocks = [];
  blocks.push(new ViewContentBlock(ViewContentBlockType.HEADER, 'Change Log'));
  blocks.push(new ViewContentBlock(ViewContentBlockType.PARAGRAPH, 'Content coming soon'));

  return blocks;
}

export default generateChangelog;
