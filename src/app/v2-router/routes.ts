export enum ROUTES {
    WORKSPACE_MENU = 'workspace-menu', // Menu for selecting workspace
    ACTION_MENU = 'action-menu', // Menu for selecting what to do within a workspace
    DETAIL_SIMILAR_MOVIES = 'detail-similar-movies', // Editor for listing details about existing reference movies
    CREATE_NEW_STORY = 'create-new-story', // Page to create a new story
    REVISION_HISTORY = 'revision-history', // Page to review history of changes
    ASSIGN_SIMILAR_MOVIES = 'assign-similar-movies', // Page to assign similar movies to a story
}

// Collection of which routes require a storyId
export const storySpecificRoutes: Set<ROUTES> = new Set([
    ROUTES.ASSIGN_SIMILAR_MOVIES
]);

// Each route is either a tool for analysis, or for synthesis
export enum ROUTE_TYPE {
    SYNTHESIS = 'Synthesis',
    ANALYSIS = 'Analysis'
};

const SYNTHESIS_ROUTES: Set<ROUTES> = new Set([
    ROUTES.ASSIGN_SIMILAR_MOVIES, ROUTES.CREATE_NEW_STORY
])

export function getRouteType(route: ROUTES): ROUTE_TYPE {
    if (SYNTHESIS_ROUTES.has(route)) {
        return ROUTE_TYPE.SYNTHESIS;
    }

    return ROUTE_TYPE.ANALYSIS;
}
