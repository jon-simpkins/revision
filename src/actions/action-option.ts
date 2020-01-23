import { SYNTHESIS_ACTIONS, ANALYSIS_ACTIONS, isSynthesisRoute } from './actions';

export class ActionOption {
  constructor(public action: SYNTHESIS_ACTIONS | ANALYSIS_ACTIONS, public needsCompletion?: boolean, public storyId?: string) { }

  getLabel(): string {
    switch (this.action as SYNTHESIS_ACTIONS | ANALYSIS_ACTIONS) {
      case SYNTHESIS_ACTIONS.ASSIGN_SIMILAR_MOVIES:
        return 'Assign Similar Movies';
      case SYNTHESIS_ACTIONS.LOGLINE_EDIT_PAGE:
        return 'Edit Logline';
      case SYNTHESIS_ACTIONS.CREATE_NEW_STORY:
        return 'Create New Story';
      case ANALYSIS_ACTIONS.DETAIL_SIMILAR_MOVIES:
        return 'Edit a List of Reference Movies';
      case ANALYSIS_ACTIONS.REVISION_HISTORY:
        return 'Review Revision History';
      case ANALYSIS_ACTIONS.STORY_VIEW_PAGE:
        return 'View Story';
      default:
        return '-';
    }
  }

  getIsSynthesis(): boolean {
    return isSynthesisRoute(this.action);
  }

  getCompletionIcon(): string {
    if (this.needsCompletion) {
      return 'priority_high';
    }
    return 'done';
  }

  getActionTypeIcon(): string {
    if (!this.getIsSynthesis()) {
      return 'menu_book';
    }
    return 'edit';
  }
}