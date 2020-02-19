import { storiesOf, moduleMetadata } from '@storybook/angular';

import { Component } from '@angular/core';

import { AppModule } from '../../app.module';
import { HackUpdateService } from '../../services/hack-update.service';
import { WorkspaceService } from '../../services/workspace.service';

import { serializedWorkspace001, serializedWorkspace002 } from 'src/storyStructures/data';
import { ActionService } from 'src/app/services/action.service';
import { ActionOption } from 'src/actions/action-option';
import { SYNTHESIS_ACTIONS, ANALYSIS_ACTIONS } from 'src/actions/actions';

const TEMPLATE = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <writing-page></writing-page>
`;

@Component({ template: TEMPLATE })
class WritingCreateStoryPage {
    constructor(workspaceService: WorkspaceService, actionService: ActionService, hackUpdateService: HackUpdateService) {
        workspaceService.importWorkspaceFromString(serializedWorkspace001);
        workspaceService.setCurrentStoryId('ba9e97b7337e4f7480742837eba8a20e');
        actionService.startAction(new ActionOption(SYNTHESIS_ACTIONS.CREATE_NEW_STORY));
    }
}

@Component({ template: TEMPLATE })
class WritingLoglineEdit {
    constructor(workspaceService: WorkspaceService, actionService: ActionService, hackUpdateService: HackUpdateService) {
        workspaceService.importWorkspaceFromString(serializedWorkspace001);
        workspaceService.setCurrentStoryId('ba9e97b7337e4f7480742837eba8a20e');
        actionService.startAction(new ActionOption(ANALYSIS_ACTIONS.STORY_VIEW_PAGE));
        actionService.startAction(new ActionOption(SYNTHESIS_ACTIONS.LOGLINE_EDIT_PAGE));
    }
}

@Component({ template: TEMPLATE })
class WritingRuntimeEdit {
    constructor(workspaceService: WorkspaceService, actionService: ActionService, hackUpdateService: HackUpdateService) {
        workspaceService.importWorkspaceFromString(serializedWorkspace001);
        workspaceService.setCurrentStoryId('ba9e97b7337e4f7480742837eba8a20e');
        actionService.startAction(new ActionOption(ANALYSIS_ACTIONS.STORY_VIEW_PAGE));
        actionService.startAction(new ActionOption(SYNTHESIS_ACTIONS.RUNTIME_EDIT));
    }
}

@Component({ template: TEMPLATE })
class WritingStructureAnalysis {
    constructor(workspaceService: WorkspaceService, actionService: ActionService, hackUpdateService: HackUpdateService) {
        workspaceService.importWorkspaceFromString(serializedWorkspace001);
        actionService.startAction(new ActionOption(ANALYSIS_ACTIONS.STRUCTURE_ANALYSIS));
    }
}

@Component({ template: TEMPLATE })
class WritingAddSequence {
    constructor(workspaceService: WorkspaceService, actionService: ActionService, hackUpdateService: HackUpdateService) {
        workspaceService.importWorkspaceFromString(serializedWorkspace001);
        workspaceService.setCurrentStoryId('ba9e97b7337e4f7480742837eba8a20e');
        actionService.startAction(new ActionOption(SYNTHESIS_ACTIONS.ADD_SEQUENCE));
    }
}

@Component({ template: TEMPLATE })
class WritingBeatSequence {
    constructor(workspaceService: WorkspaceService, actionService: ActionService, hackUpdateService: HackUpdateService) {
        workspaceService.importWorkspaceFromString(serializedWorkspace001);
        workspaceService.setCurrentStoryId('ba9e97b7337e4f7480742837eba8a20e');
        workspaceService.setCurrentEditSequenceId('2f8d738ad7c2471aa297d73a89304536');
        workspaceService.setCurrentViewSequenceId('2f8d738ad7c2471aa297d73a89304536');
        actionService.startAction(new ActionOption(ANALYSIS_ACTIONS.VIEW_SEQUENCE_PAGE));
        actionService.startAction(new ActionOption(SYNTHESIS_ACTIONS.SPEC_SUBSTRUCTURE));
    }
}

@Component({ template: TEMPLATE })
class WritingTimelineNoTimeline {
    constructor(workspaceService: WorkspaceService, actionService: ActionService, hackUpdateService: HackUpdateService) {
        workspaceService.importWorkspaceFromString(serializedWorkspace002);
        workspaceService.setCurrentStoryId('6af39c3036e4490aac4e3d1542bb8a36');
        workspaceService.getCurrentStory().plotElementId = null;
        actionService.startAction(new ActionOption(ANALYSIS_ACTIONS.VIEW_FULL_TIMELINE));
    }
}

@Component({ template: TEMPLATE })
class WritingTimeline {
    constructor(workspaceService: WorkspaceService, actionService: ActionService, hackUpdateService: HackUpdateService) {
        workspaceService.importWorkspaceFromString(serializedWorkspace002);
        workspaceService.setCurrentStoryId('6af39c3036e4490aac4e3d1542bb8a36');
        actionService.startAction(new ActionOption(ANALYSIS_ACTIONS.VIEW_FULL_TIMELINE));
    }
}

@Component({ template: TEMPLATE })
class WritingIdentifyCharacters {
    constructor(workspaceService: WorkspaceService, actionService: ActionService, hackUpdateService: HackUpdateService) {
        workspaceService.importWorkspaceFromString(serializedWorkspace001);
        workspaceService.setCurrentStoryId('ba9e97b7337e4f7480742837eba8a20e');
        workspaceService.setCurrentEditSequenceId('2f8d738ad7c2471aa297d73a89304536');
        workspaceService.setCurrentViewSequenceId('2f8d738ad7c2471aa297d73a89304536');
        actionService.startAction(new ActionOption(ANALYSIS_ACTIONS.VIEW_SEQUENCE_PAGE));
        actionService.startAction(new ActionOption(SYNTHESIS_ACTIONS.IDENTIFY_CHARACTERS_IN_SEQUENCE));
    }
}


storiesOf('V2 / Writing Page', module)
    .addDecorator(
        moduleMetadata({
            declarations: [],
            imports: [AppModule],
            providers: [],
        }),
    ).add('Renders Create Story', () => {
        return {
            component: WritingCreateStoryPage
        };
    }).add('Renders Logline editing', () => {
        return {
            component: WritingLoglineEdit
        };
    }).add('Renders runtime editing', () => {
        return {
            component: WritingRuntimeEdit
        };
    }).add('Renders structure analysis', () => {
        return {
            component: WritingStructureAnalysis
        };
    }).add('Renders adding new sequence', () => {
        return {
            component: WritingAddSequence
        };
    }).add('Renders breaking sequence into beats', () => {
        return {
            component: WritingBeatSequence
        };
    }).add('Renders timeline page, when no timeline can be rendered', () => {
        return {
            component: WritingTimelineNoTimeline
        };
    }).add('Renders timeline', () => {
        return {
            component: WritingTimeline
        };
    }).add('Renders identifying characters', () => {
        return {
            component: WritingIdentifyCharacters
        };
    });