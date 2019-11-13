import ViewOption from './ViewOption';
import {MultiOption} from './MultiOption';
import {ScrapContent} from './ScrapTypes/ScrapContent';
import BlockContentRefOption from './EditContexts/BlockContentRefOption';

enum EditType {
  TEXT_LINE,
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
  characterMap: Map<string, object>;
  traitMap: Map<string, object>;
  prepareContentForEditing: (scrapContent: ScrapContent, editContext: EditContext) => ScrapContent;
  prepareContentForPersistence: (scrapContent: ScrapContent, editContext: EditContext) => ScrapContent;

  constructor(editType: EditType, headerPrompt: string, multiOptions?: MultiOption[], viewOptions?: ViewOption[], userGuidance?: string) {
    this.editType = editType;
    this.headerPrompt = headerPrompt;
    this.multiOptions = multiOptions;
    this.viewOptions = viewOptions;
    this.userGuidance = userGuidance;
    this.constraints = new EditConstraints();
  }
}

export {EditType};

export default EditContext;
