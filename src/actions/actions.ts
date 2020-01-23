export enum SYNTHESIS_ACTIONS {
    CREATE_NEW_STORY = 'create-new-story', // Page to create a new story
    ASSIGN_SIMILAR_MOVIES = 'assign-similar-movies', // Page to assign similar movies to a story
    LOGLINE_EDIT_PAGE = 'logline-edit', // Page to modify the logline of a story
}

export enum ANALYSIS_ACTIONS {
    DETAIL_SIMILAR_MOVIES = 'detail-similar-movies', // Editor for listing details about existing reference movies
    REVISION_HISTORY = 'revision-history', // Page to review history of changes
    STORY_VIEW_PAGE = 'story-view', // Page to see high-level story details
}

const SynthesisActionsSet = new Set<string>(Object.values(SYNTHESIS_ACTIONS));

// Convenience function to see if an action is synthesis or analysis
export function isSynthesisRoute(action: SYNTHESIS_ACTIONS | ANALYSIS_ACTIONS): boolean {
    return SynthesisActionsSet.has(action);
}