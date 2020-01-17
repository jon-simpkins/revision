import { storiesOf, moduleMetadata } from '@storybook/angular';

import { Component } from '@angular/core';

import { AppModule } from '../../app.module';
import { HackUpdateService } from '../../services/hack-update.service';
import { WorkspaceService } from '../../services/workspace.service';
import { Workspace } from '../../../storyStructures';
import { serializedWorkspace001 } from '../../../storyStructures/data';

const TEMPLATE = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <revision-history></revision-history>
`;

@Component({
    template: TEMPLATE
})
class RevisionHistoryBlank {
    constructor(workspaceService: WorkspaceService, hackUpdateService: HackUpdateService) {
        workspaceService.currentWorkspace = new Workspace();
    }
}

@Component({
    template: TEMPLATE
})
class RevisionHistoryWithContent {
    constructor(workspaceService: WorkspaceService, hackUpdateService: HackUpdateService) {
        workspaceService.importWorkspaceFromString(serializedWorkspace001);
    }
}

storiesOf('V2 / Revision History', module)
    .addDecorator(
        moduleMetadata({
            declarations: [],
            imports: [AppModule],
            providers: [],
        }),
    ).add('Renders blank', () => {
        return {
            component: RevisionHistoryBlank
        };
    }).add('Renders with prior content', () => {
        return {
            component: RevisionHistoryWithContent
        };
    });