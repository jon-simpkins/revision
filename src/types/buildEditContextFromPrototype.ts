import ScrapPrototype from './ScrapPrototype';
import {ScrapPile} from './ScrapPile';
import {ScrapContent} from './ScrapTypes/ScrapContent';
import {Script} from './Script/Script';
import EditContext, {EditType} from './EditContext';
import {StructureBlock} from './StoryStructure/StoryStructure';
import ViewOption, {buildCharacterDetailsViewOption, buildStorySummaryViewOption, ViewOptionGenerators} from './ViewOption';
import {buildBlockContentContext} from './EditContexts/buildBlockContentContext';
import {buildScriptContentContext} from './EditContexts/buildScriptContentContext';
import {GENDER_OPTIONS} from './GenderOptions';
import {buildStructureContext} from './EditContexts/buildStructureContext';

function basicFromPrototype(prototype: ScrapPrototype, scrapPile: ScrapPile, refId: string): EditContext {
  let ctx: EditContext;
  let parentStructureRefId: string;
  let parentStructureBlocks: StructureBlock[];
  let parentStructureBlockLabel: string;

  switch (prototype) {
    case ScrapPrototype.MOVIE_TITLE:
      return new EditContext(
        EditType.TEXT_LINE,
        'Movie Title',
        null,
        [buildStorySummaryViewOption()]
      );
    case ScrapPrototype.SIMILAR_MOVIES:
      return new EditContext(
        EditType.N_LINES,
        'Similar Movies',
        null,
        [buildStorySummaryViewOption()]
      );
    case ScrapPrototype.LOG_LINE:
      return new EditContext(
        EditType.SCRIPT,
        'Log Line',
        null,
        [buildStorySummaryViewOption()]
      );
    case ScrapPrototype.QUESTIONS_TO_EXPLORE:
      return new EditContext(
        EditType.SCRIPT,
        'Questions to Explore',
        null,
        [buildStorySummaryViewOption()],
        'What questions do you want the story to explore?'
      );
    case ScrapPrototype.TIME_FRAME:
      return new EditContext(
        EditType.TEXT_LINE,
        'Time Frame',
        null,
        [buildStorySummaryViewOption()]
      );
    case ScrapPrototype.MOVIE_DURATION:
      return new EditContext(
        EditType.TEXT_LINE,
        'Movie Duration (min)',
        null,
        [buildStorySummaryViewOption()],
        '"Similar Movies" can provide guidance here for a typical runtime'
      );
    case ScrapPrototype.CHARACTER_LISTING:
      ctx = new EditContext(
        EditType.N_LINES,
        'List all Characters',
        null,
        null
      );
      ctx.userGuidance = 'Give a quick summary of who\'s in the story. "The main spy" or "Marine biologist, love interest" is all the granularity you need for now. You\'ll get to come back and add / replace / revise later.';
      return ctx;
    case ScrapPrototype.CHARACTER_NAME:
      ctx = new EditContext(
        EditType.TEXT_LINE,
        'Character Name',
        null,
        [buildCharacterDetailsViewOption(refId)]
      );

      return ctx;
    case ScrapPrototype.STRUCTURE_BLOCK_CONTENT:
      return buildBlockContentContext(refId, scrapPile);
    case ScrapPrototype.SCRIPT:
      return buildScriptContentContext(refId, scrapPile);
    case ScrapPrototype.STRUCTURE_BLOCK_SUMMARY:
      parentStructureRefId = scrapPile.fetchStructureBlockParentRefId(refId);

      parentStructureBlocks = scrapPile.getByRefId(
        parentStructureRefId,
        ScrapPrototype.STRUCTURE_SPEC
      ).content.storyStructure.blocks;

      parentStructureBlockLabel = 'NOT FOUND';
      parentStructureBlocks.forEach(block => {
        if (block.refId === refId) {
          parentStructureBlockLabel = block.label;
        }
      });

      return new EditContext(
        EditType.SCRIPT,
        `Summarize the Story Beat: "${parentStructureBlockLabel}"`,
        null,
        [
          new ViewOption(ViewOptionGenerators.STORY_STRUCTURE, 'Story Structure', null, parentStructureRefId)
        ],
        'What happens in this beat? What arc happens, where does it start and end?'
      );
    case ScrapPrototype.CHARACTER_GENDER:
      return new EditContext(
        EditType.MULTI_CHOICE,
        'Character Gender',
        GENDER_OPTIONS,
        [buildCharacterDetailsViewOption(refId)]
      );
    case ScrapPrototype.CHARACTER_DRIVE:
      return new EditContext(
        EditType.SCRIPT,
        'Character Drive',
        null,
        [buildCharacterDetailsViewOption(refId)],
        'What drives this character? What do they want / need?'
      );
    case ScrapPrototype.STRUCTURE_SPEC:
      return buildStructureContext(refId, scrapPile);
    case ScrapPrototype.TRAITS:
      return new EditContext(
        EditType.N_LINES,
        'List Traits',
        null,
        [buildStorySummaryViewOption()],
        'These will help you graph / track usage throughout the script with {#My Trait} notation.'
      );
  }
}

export default function(prototype: ScrapPrototype, scrapPile: ScrapPile, refId: string): EditContext {
  const ctx = basicFromPrototype(prototype, scrapPile, refId);

  if (ctx.editType === EditType.SCRIPT) {
    ctx.characterMap = scrapPile.buildCharacterMap();
    ctx.prepareContentForEditing = (scrapContent: ScrapContent, editContext: EditContext) => {
      scrapContent.script.rawText = Script.convertCharacterRefIdsToNames(scrapContent.script.rawText, editContext.characterMap);
      return scrapContent;
    };
    ctx.prepareContentForPersistence = (scrapContent: ScrapContent, editContext: EditContext) => {
      scrapContent.script.convertCharacterNamesToRefIds(editContext.characterMap);
      return scrapContent;
    };
  }

  return ctx;
}
