import { storiesOf, moduleMetadata } from '@storybook/angular';

import { Component } from '@angular/core';

import { AppModule } from '../../app.module';
import { HackUpdateService } from '../../services/hack-update.service';
import { WorkspaceService } from '../../services/workspace.service';

import { serializedWorkspace001 } from 'src/storyStructures/data';

const TEMPLATE = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <assign-similar-movies></assign-similar-movies>
`;

@Component({
    template: TEMPLATE
})
class AssignSimilarMoviesBlank {
    constructor(workspaceService: WorkspaceService, hackUpdateService: HackUpdateService) {
        workspaceService.importWorkspaceFromString(serializedWorkspace001);
        workspaceService.setCurrentStoryId('d95887e51683417e8201495a59aa2d44');
    }
}


storiesOf('V2 / Assign Similar Movies', module)
    .addDecorator(
        moduleMetadata({
            declarations: [],
            imports: [AppModule],
            providers: [],
        }),
    ).add('Renders blank', () => {
        return {
            component: AssignSimilarMoviesBlank
        };
    });