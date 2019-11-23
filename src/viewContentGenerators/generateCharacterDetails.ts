import {ScrapPile} from '../types/ScrapPile';
import ViewContentBlock, {
  buildHeader, buildListEntry,
  buildParagraph,
  buildScrapDetailsSection,
  buildSubheader, buildTimeline, ViewContentBlockType
} from '../app/story-details/view-panel-content/ViewContentBlock';
import Character from '../types/Character';
import ScrapPrototype from '../types/ScrapPrototype';

function fetchScenePresence(scrapPile: ScrapPile, characterRefId: string, characterName: string, blocks: ViewContentBlock[]): ViewContentBlock[] {
  blocks.push(buildSubheader('Script Appearances'));
  blocks.push(buildTimeline(scrapPile.buildScriptAppearanceBlocks(
    `{@${characterRefId}}`,
    characterName
  )));


  return blocks;
}

function generateCharacterDetails(scrapPile: ScrapPile, scrapId: string, refId: string): ViewContentBlock[] {
  let blocks = [];

  const myCharacter = Character.buildFromScrapPile(refId, scrapPile);

  blocks.push(buildHeader('Character Details'));
  blocks.push(buildParagraph(myCharacter.refId));

  blocks = blocks.concat(
    buildScrapDetailsSection(scrapPile,
      ScrapPrototype.CHARACTER_NAME,
      refId,
      blocks,
      'Name',
      (nameScrap) => {
        return [
          buildParagraph(nameScrap.content.text)
        ];
      }
    )
  );

  blocks = blocks.concat(
    buildScrapDetailsSection(scrapPile,
      ScrapPrototype.CHARACTER_GENDER,
      refId,
      blocks,
      'Gender',
      (genderScrap) => {
        return [
          buildParagraph(genderScrap.content.text)
        ];
      }
    )
  );

  blocks.push(buildSubheader('Summary:', scrapPile.newestScrapBySingularPrototype.get(ScrapPrototype.CHARACTER_LISTING)));
  const listingScrap = scrapPile.newestScrapBySingularPrototype.get(ScrapPrototype.CHARACTER_LISTING);
  listingScrap.content.lines.forEach(line => {
    if (line.refId === refId && line.active) {
      blocks.push(buildParagraph(line.text));
    }
  });

  blocks = blocks.concat(
    buildScrapDetailsSection(scrapPile,
      ScrapPrototype.CHARACTER_DRIVE,
      refId,
      blocks,
      'Motivation',
      (driveScrap) => {
        return [new ViewContentBlock(ViewContentBlockType.SCRIPT_SECTION,
          driveScrap.content.script.rawText
        )];
      }
    )
  );

  blocks = fetchScenePresence(scrapPile, refId, myCharacter.name, blocks);

  return blocks;
}

export default generateCharacterDetails;
