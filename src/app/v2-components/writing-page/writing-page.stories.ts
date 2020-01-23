import { storiesOf, moduleMetadata } from '@storybook/angular';

import { Component } from '@angular/core';

import { AppModule } from '../../app.module';
import { HackUpdateService } from '../../services/hack-update.service';
import { WorkspaceService } from '../../services/workspace.service';

import { serializedWorkspace001 } from 'src/storyStructures/data';
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
        workspaceService.setCurrentStoryId('68e63ce4ea5644edb5257e5bf23615fc');
        actionService.startAction(new ActionOption(SYNTHESIS_ACTIONS.CREATE_NEW_STORY));
    }
}

@Component({ template: TEMPLATE })
class WritingLoglineEdit {
    constructor(workspaceService: WorkspaceService, actionService: ActionService, hackUpdateService: HackUpdateService) {
        workspaceService.importWorkspaceFromString(serializedWorkspace001);
        workspaceService.setCurrentStoryId('68e63ce4ea5644edb5257e5bf23615fc');
        actionService.startAction(new ActionOption(ANALYSIS_ACTIONS.STORY_VIEW_PAGE));
        actionService.startAction(new ActionOption(SYNTHESIS_ACTIONS.LOGLINE_EDIT_PAGE));
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
    });