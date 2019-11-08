import {ScrapPile} from '../types/ScrapPile';
import ViewContentBlock, {
  buildHeader,
  buildParagraphsFromTextArea
} from '../app/story-details/view-panel-content/ViewContentBlock';
import ScrapPrototype from '../types/ScrapPrototype';

function generateIndividualScriptScrap(scrapPile: ScrapPile, scrapId: string, refId: string): ViewContentBlock[] {
  let blocks = [];

  blocks.push(buildHeader('Script Scrap'));

  const scriptScrap = scrapPile.getByRefId(refId, ScrapPrototype.SCRIPT);

  blocks = buildParagraphsFromTextArea(scriptScrap.content.script.rawText, blocks);

  return blocks;
}

export default generateIndividualScriptScrap;
