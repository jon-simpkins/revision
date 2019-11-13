import {ScrapPile, StructureIterationContent} from '../types/ScrapPile';
import ViewContentBlock, {
  buildHeader,
  buildListEntry,
  buildParagraph,
  buildSubheader
} from '../app/story-details/view-panel-content/ViewContentBlock';
import ScrapPrototype from '../types/ScrapPrototype';
import {FountainElements, FountainElementType} from '../app/story-details/edit-panel-content/script-edit-panel/FountainElements';
import {StructureBlock} from '../types/StoryStructure/StoryStructure';
import ViewOption, {ViewOptionGenerators} from '../types/ViewOption';

function fetchScenePresence(scrapPile: ScrapPile, traitRefId: string, blocks: ViewContentBlock[]): ViewContentBlock[] {
  const allSections = [];

  scrapPile.iterateOverStructure((contents: StructureIterationContent) => {
    if (!contents.substructureScrap) {
      const section = {
        durationSec: contents.durationSec,
        mentionsTrait: false,
        sectionScrapId: null
      };

      if (contents.scriptScrap) {
        section.sectionScrapId = contents.scriptScrap.id;

        const parsedScript = FountainElements.fromFullText(contents.scriptScrap.content.script.rawText);

        parsedScript.lines.forEach(line => {
          if (line.type === FountainElementType.ACTION) {
            if (line.text.includes(`{#${traitRefId}}`)) {
              section.mentionsTrait = true;
            }
          }
        });
      } else if (contents.summaryScrap) {
        section.sectionScrapId = contents.summaryScrap.id;

        const parsedScript = FountainElements.fromFullText(contents.summaryScrap.content.script.rawText);

        parsedScript.lines.forEach(line => {
          if (line.type === FountainElementType.ACTION) {
            if (line.text.includes(`{#${traitRefId}}`)) {
              section.mentionsTrait = true;
            }
          }
        });
      } else {
        section.sectionScrapId = contents.parentStructureScrap.id;
      }

      allSections.push(section);
    }
  });

  blocks.push(buildSubheader('Script Appearances'));

  let idx = 0;
  while (idx < allSections.length) {
    if (allSections[idx].mentionsTrait) {
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

function generateTraitDetails(scrapPile: ScrapPile, scrapId: string, refId: string): ViewContentBlock[] {
  let blocks = [];

  blocks.push(buildHeader('Trait Details'));

  const traitListingScrap = scrapPile.newestScrapBySingularPrototype.get(ScrapPrototype.TRAITS);
  traitListingScrap.content.lines.forEach(line => {
    if (line.refId === refId && line.active) {
      blocks.push(buildParagraph(`#${line.text}:`));
    }
  });

  blocks = fetchScenePresence(scrapPile, refId, blocks);

  return blocks;
}

export default generateTraitDetails;
