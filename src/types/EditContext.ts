import {ScrapPrototype} from './Scrap';
import ViewOption, {buildCharacterDetailsViewOption, buildStorySummaryViewOption, ViewOptionGenerators} from './ViewOption';
import {ScrapPile} from './ScrapPile';
import {GENDER_OPTIONS} from './GenderOptions';
import {MultiOption} from './MultiOption';
import {ScrapContent} from './ScrapTypes/ScrapContent';
import {StructureBlock} from './StoryStructure/StoryStructure';
import {buildBlockContentContext} from './EditContexts/buildBlockContentContext';
import {buildScriptContentContext} from './EditContexts/buildScriptContentContext';
import {buildStructureContext} from './EditContexts/buildStructureContext';
import BlockContentRefOption from './EditContexts/BlockContentRefOption';

enum EditType {
  TEXT_LINE,
  TEXT_AREA,
  N_LINES,
  MULTI_CHOICE,
  STRUCTURE_SELECTION,
  CONTENT_ASSIGNMENT,
  SCRIPT,
}

class EditConstraints {
  durationSec: number;
}

class EditContext {
  editType: EditType; // What type of input to display to accept edits
  headerPrompt: string; // What header to display to guide edits
  userGuidance: string; // Any extra stuff to guide the user
  multiOptions: MultiOption[]; // For selection entries, define the set of options
  viewOptions: ViewOption[]; // Optional, list of view options for the bottom of the edit
  constraints: EditConstraints;
  contentRefOptions: BlockContentRefOption[];
  characterMap: Map<string, string>;

  constructor(editType: EditType, headerPrompt: string, multiOptions?: MultiOption[], viewOptions?: ViewOption[], userGuidance?: string) {
    this.editType = editType;
    this.headerPrompt = headerPrompt;
    this.multiOptions = multiOptions;
    this.viewOptions = viewOptions;
    this.userGuidance = userGuidance;
    this.constraints = new EditConstraints();
  }

  static fromPrototype(prototype: ScrapPrototype, scrapPile: ScrapPile, refId: string): EditContext {
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
          EditType.TEXT_AREA,
          'Log Line',
          null,
          [buildStorySummaryViewOption()]
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
        ctx.userGuidance = 'Give a quick summary of who\'s in the story. "The main spy" or "Marine biologist, love interest" is all the granularity you need for now. You\'ll get to come back and revise later';
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

        ctx = new EditContext(
          EditType.TEXT_AREA,
          `Summarize the Story Beat: "${parentStructureBlockLabel}"`,
          null,
          [
            new ViewOption(ViewOptionGenerators.STORY_STRUCTURE, 'Story Structure', null, parentStructureRefId)
          ],
          'What happens in this beat? What arc happens, where does it start and end?'
        );

        return ctx;
      case ScrapPrototype.CHARACTER_GENDER:
        return new EditContext(
          EditType.MULTI_CHOICE,
          'Character Gender',
          GENDER_OPTIONS,
          [buildCharacterDetailsViewOption(refId)]
        );
      case ScrapPrototype.CHARACTER_DRIVE:
        ctx = new EditContext(
          EditType.TEXT_AREA,
          'Character Drive',
          null,
          [buildCharacterDetailsViewOption(refId)]
        );
        ctx.userGuidance = 'What drives this character? What do they want / need?';
        return ctx;
      case ScrapPrototype.STRUCTURE_SPEC:
        return buildStructureContext(refId, scrapPile);
    }
  }

  static applyConstraints(scrapContent: ScrapContent, editConstraints: EditConstraints): ScrapContent {
    if (editConstraints && editConstraints.durationSec && scrapContent.storyStructure) {
      scrapContent.storyStructure.rescaleToDuraction(editConstraints.durationSec);
    }

    return scrapContent;
  }
}

export {EditType};

export default EditContext;
