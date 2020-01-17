import { storiesOf, moduleMetadata } from '@storybook/angular';

import { Component } from '@angular/core';

import { AppModule } from '../../app.module';
import { HackUpdateService } from '../../services/hack-update.service';
import { WorkspaceService } from '../../services/workspace.service';

import { serializedWorkspace001 } from 'src/storyStructures/data';

const TEMPLATE = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <story-view-page></story-view-page>
`;

@Component({
    template: TEMPLATE
})
class StoryViewBasic {
    constructor(workspaceService: WorkspaceService, hackUpdateService: HackUpdateService) {
        workspaceService.importWorkspaceFromString(serializedWorkspace001);
        workspaceService.setCurrentStoryId('68e63ce4ea5644edb5257e5bf23615fc');
    }
}


storiesOf('V2 / Story View Page', module)
    .addDecorator(
        moduleMetadata({
            declarations: [],
            imports: [AppModule],
            providers: [],
        }),
    ).add('Renders Basic', () => {
        return {
            component: StoryViewBasic
        };
    });