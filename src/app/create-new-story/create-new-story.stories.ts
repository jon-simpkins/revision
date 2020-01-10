import { storiesOf, moduleMetadata } from '@storybook/angular';

import { Component } from '@angular/core';

import { AppModule } from '../app.module';
import { HackUpdateService } from '../services/hack-update.service';
import { WorkspaceService } from '../services/workspace.service';
import { Workspace } from '../../storyStructures';
import { RoutingService } from '../services/routing.service';
import { ROUTES } from '../v2-router/routes';

const TEMPLATE = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <create-new-story></create-new-story>
`;

@Component({
    template: TEMPLATE
})
class CreateNewStoryStory {
    constructor(workspaceService: WorkspaceService, routingService: RoutingService, hackUpdateService: HackUpdateService) {
        workspaceService.currentWorkspace = new Workspace();

        routingService.navigateToUrl = (route: ROUTES) => {
            console.log('Navigated to route: ' + route);
            console.log('Current story id: ' + workspaceService.getCurrentStoryId());
        }
    }
}


storiesOf('V2 / Create New Story', module)
    .addDecorator(
        moduleMetadata({
            declarations: [],
            imports: [AppModule],
            providers: [],
        }),
    ).add('Renders blank', () => {
        return {
            component: CreateNewStoryStory
        };
    });