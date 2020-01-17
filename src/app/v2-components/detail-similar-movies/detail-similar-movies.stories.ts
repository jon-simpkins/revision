import { storiesOf, moduleMetadata } from '@storybook/angular';

import { Component } from '@angular/core';

import { AppModule } from '../../app.module';
import { HackUpdateService } from '../../services/hack-update.service';
import { WorkspaceService } from '../../services/workspace.service';
import { Workspace } from '../../../storyStructures';
import { serializedWorkspace001 } from 'src/storyStructures/data';

const TEMPLATE = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <detail-similar-movies></detail-similar-movies>
`;

@Component({
    template: TEMPLATE
})
class SimilarMoviesBlank {
    constructor(workspaceService: WorkspaceService, hackUpdateService: HackUpdateService) {
        workspaceService.currentWorkspace = new Workspace();
    }
}

@Component({
    template: TEMPLATE
})
class SimilarMoviesWithContent {
    constructor(workspaceService: WorkspaceService, hackUpdateService: HackUpdateService) {
        workspaceService.importWorkspaceFromString(serializedWorkspace001);
    }
}

storiesOf('V2 / Detail Similar Movies', module)
    .addDecorator(
        moduleMetadata({
            declarations: [],
            imports: [AppModule],
            providers: [],
        }),
    ).add('Renders blank', () => {
        return {
            component: SimilarMoviesBlank
        };
    }).add('Renders with prior content', () => {
        return {
            component: SimilarMoviesWithContent
        };
    });