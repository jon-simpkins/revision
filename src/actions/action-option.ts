import { SYNTHESIS_ACTIONS, ANALYSIS_ACTIONS, isSynthesisRoute } from './actions';

export class ActionOption {
  constructor(public action: SYNTHESIS_ACTIONS | ANALYSIS_ACTIONS, public needsCompletion?: boolean, public storyId?: string) { }

  getLabel(): string {
    return this.action;
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