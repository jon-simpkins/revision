import {ScrapPile, StructureIterationContent} from '../types/ScrapPile';
import ViewContentBlock, {
  buildHeader, buildListEntry,
  buildParagraph,
  buildParagraphsFromTextArea,
  buildScrapDetailsSection,
  buildSubheader, ViewContentBlockType
} from '../app/story-details/view-panel-content/ViewContentBlock';
import Character from '../types/Character';
import {ScrapPrototype} from '../types/Scrap';
import {FountainElements, FountainElementType} from '../app/story-details/edit-panel-content/script-edit-panel/FountainElements';
import {StructureBlock} from '../types/StoryStructure/StoryStructure';
import ViewOption, {ViewOptionGenerators} from '../types/ViewOption';

function fetchScenePresence(scrapPile: ScrapPile, characterRefId: string, blocks: ViewContentBlock[]): ViewContentBlock[] {
  const allSections = [];

  const characterMap = scrapPile.buildCharacterMap();

  scrapPile.iterateOverStructure((contents: StructureIterationContent) => {
    if (!contents.substructureScrap) {
      const section = {
        durationSec: contents.durationSec,
        mentionsCharacter: false,
        sectionScrapId: null
      };

      if (contents.scriptScrap) {
        section.sectionScrapId = contents.scriptScrap.id;
        const parsedScript = FountainElements.fromFullText(contents.scriptScrap.content.script.rawText, characterMap);

        parsedScript.lines.forEach(line => {
          if (line.type === FountainElementType.CHARACTER) {
            const characterName = parsedScript.getDialogueNameFromLine(line.text);
            if (characterName === characterRefId) {
              section.mentionsCharacter = true;
            }
          }
        });
      } else if (contents.summaryScrap) {
        section.sectionScrapId = contents.summaryScrap.id;
      } else {
        section.sectionScrapId = contents.parentStructureScrap.id;
      }

      allSections.push(section);
    }
  });

  blocks.push(buildSubheader('Script Appearances'));

  let idx = 0;
  while (idx < allSections.length) {
    if (allSections[idx].mentionsCharacter) {
      blocks.push(buildListEntry(
        `Appears: ${StructureBlock.convertDurationToStr(allSections[idx].durationSec)}`,
        new ViewOption(
          ViewOptionGenerators.SCRAP_DETAILS,
          null,
          allSections[idx].sectionScrapId
        )
      ));
    } else {
      blocks.push(buildListEntry(
        StructureBlock.convertDurationToStr(allSections[idx].durationSec),
        new ViewOption(
          ViewOptionGenerators.SCRAP_DETAILS,
          null,
          allSections[idx].sectionScrapId
        )
      ));
    }

    idx += 1;
  }

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

  blocks = fetchScenePresence(scrapPile, refId, blocks);

  return blocks;
}

export default generateCharacterDetails;
