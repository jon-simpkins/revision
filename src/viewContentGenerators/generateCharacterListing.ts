import {ScrapPile, StructureIterationContent} from '../types/ScrapPile';
import ViewContentBlock, {
  buildHeader,
  buildListEntry, buildParagraph,
  buildSubheader, buildTimeline
} from '../app/story-details/view-panel-content/ViewContentBlock';
import ViewOption, {ViewOptionGenerators} from '../types/ViewOption';
import ScrapPrototype from '../types/ScrapPrototype';
import Character from '../types/Character';

function buildTimelineBlock(scrapPile: ScrapPile, characters): ViewContentBlock | null {

  const timelineBlocks = scrapPile.buildStoryTimelineBlocks();

  scrapPile.iterateOverStructure((contents: StructureIterationContent) => {
    if (contents.substructureScrap) {
      return; // Only consider the deepest level
    }

    characters.forEach(character => {
      const substring = `{@${character.refId}}`;
      if (contents.summaryContainsSubstring(substring) || contents.scriptContainsSubstring(substring)) {
        timelineBlocks.push(
          contents.buildTimelineBlock(character.name, character.name)
        );
      }
    });
  });

  if (!timelineBlocks.length) {
    return null;
  }

  return buildTimeline(timelineBlocks);
}

function generateCharacterListing(scrapPile: ScrapPile): ViewContentBlock[] {
  let blocks = [];

  const listingScrap = scrapPile.newestScrapBySingularPrototype.get(ScrapPrototype.CHARACTER_LISTING);

  blocks.push(buildSubheader('Character Listing', listingScrap));
  if (!listingScrap) {
    blocks.push(buildParagraph('No characters listed yet'));
    return blocks;
  }

  const characterListBlocks = [];
  const characters = [];
  const characterCountByGender = {
    male: 0,
    female: 0,
    'non-binary': 0,
    unknown: 0
  };

  listingScrap.content.lines.forEach(line => {
    if (!line.active) {
      return;
    }

    const detailViewOption = new ViewOption(
      ViewOptionGenerators.CHARACTER_DETAILS,
      null,
      null,
      line.refId
    );

    const thisCharacter = Character.buildFromScrapPile(line.refId, scrapPile);

    const nameToDisplay = thisCharacter.name ? thisCharacter.name : thisCharacter.summary;

    characters.push({
      refId: line.refId,
      name: nameToDisplay
    });

    if (thisCharacter.gender) {
      characterCountByGender[thisCharacter.gender] += 1;
    } else {
      characterCountByGender.unknown += 1;
    }

    characterListBlocks.push(buildListEntry(nameToDisplay, detailViewOption));
  });

  blocks.push(buildHeader('Character Count by Gender:'));
  Object.keys(characterCountByGender).forEach(key => {
    if (characterCountByGender[key]) {
      blocks.push(buildListEntry(`${key}: ${characterCountByGender[key]}`));
    }
  });

  blocks.push(buildHeader('List of Characters:'));
  blocks = blocks.concat(characterListBlocks);

  const timelineBlock = buildTimelineBlock(scrapPile, characters);
  if (timelineBlock) {
    blocks.push(buildHeader('Timeline:'));
    blocks.push(timelineBlock);
  }

  return blocks;
}

export default generateCharacterListing;
