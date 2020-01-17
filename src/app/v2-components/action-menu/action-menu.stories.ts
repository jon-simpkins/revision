import { storiesOf, moduleMetadata } from '@storybook/angular';


import { Component } from '@angular/core';

import {ActionMenuComponent} from './action-menu.component';
import {AppModule} from '../../app.module';

import { serializedWorkspace001 } from 'src/storyStructures/data';
import { WorkspaceService } from '../../services/workspace.service';
import { HackUpdateService } from '../../services/hack-update.service';

const TEMPLATE = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <action-menu></action-menu>
`;

@Component({
  template: TEMPLATE
})
class ActionMenuWithoutContent {
  constructor(workspaceService: WorkspaceService, hackUpdateService: HackUpdateService) {
    
  }
}

@Component({
    template: TEMPLATE
})
class ActionMenuWithContent {
    constructor(workspaceService: WorkspaceService, hackUpdateService: HackUpdateService) {
        workspaceService.importWorkspaceFromString(serializedWorkspace001);
    }
}

storiesOf('V2 / Action Menu', module)
  .addDecorator(
    moduleMetadata({
      declarations: [],
      imports: [AppModule],
      providers: [],
    }),
  ).add('Renders when workspace is not loaded yet', () => {
    return {
      component: ActionMenuWithoutContent
    };
  }).add('Renders when workspace is loaded', () => {
    return {
      component: ActionMenuWithContent
    };
  });
