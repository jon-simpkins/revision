export enum SYNTHESIS_ACTIONS {
    CREATE_NEW_STORY = 'Create New Story', // Page to create a new story
    ASSIGN_SIMILAR_MOVIES = 'Assign Similar Movies', // Page to assign similar movies to a story
    LOGLINE_EDIT_PAGE = 'Edit Logline', // Page to modify the logline of a story
    RUNTIME_EDIT = 'Edit Runtime', // Page to modify the runtime of the story
    ADD_SEQUENCE = 'Add Sequence', // Page to introduce a new sequence
    SUMMARIZE_SEQUENCE = 'Summarize Sequence', // Page to edit a particular sequence
    SPEC_SUBSTRUCTURE = 'Break Sequence into Beats', // Page to break a big story into smaller chunks
}

export enum ANALYSIS_ACTIONS {
    DETAIL_SIMILAR_MOVIES = 'Detail Similar Movies', // Editor for listing details about existing reference movies
    REVISION_HISTORY = 'Revision History', // Page to review history of changes
    STORY_VIEW_PAGE = 'Story Summary', // Page to see high-level story details
    STRUCTURE_ANALYSIS = 'Analyze Exisiting Plot Structure', // Page to add analysis of existing plots and sequences
    VIEW_SEQUENCE_PAGE = 'View Sequence', // Page to see details about a sequence
}

const SynthesisActionsSet = new Set<string>(Object.values(SYNTHESIS_ACTIONS));

// Convenience function to see if an action is synthesis or analysis
export function isSynthesisRoute(action: SYNTHESIS_ACTIONS | ANALYSIS_ACTIONS): boolean {
    return SynthesisActionsSet.has(action);
}