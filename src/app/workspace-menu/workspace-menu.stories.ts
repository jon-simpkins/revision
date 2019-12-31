import { storiesOf, moduleMetadata } from '@storybook/angular';


import { Component } from '@angular/core';

import { WorkspaceMenuComponent } from './workspace-menu.component';
import { AppModule } from '../app.module';
import { WorkspaceService, WorkspaceOption } from '../services/workspace.service';

@Component({
  template: '<workspace-menu></workspace-menu>'
})
class WorkspaceMenuWithoutOptions {
  constructor(workspaceService: WorkspaceService) {
    workspaceService.getRecentWorkspaceOptions = () => {
      return [];
    }
  }
}

@Component({
  template: '<workspace-menu></workspace-menu>'
})
class WorkspaceMenuWithOptions {
  constructor(workspaceService: WorkspaceService) {
    const option1 = new WorkspaceOption();
    option1.lastOpened = Date.now();
    option1.id = 'abc123';
    option1.title = 'My writing group';

    const option2 = new WorkspaceOption();
    option2.lastOpened = Date.now() - (1000 * 24 * 3600 * 3) + 40301;
    option2.id = 'def456';
    option2.title = 'My writing group 2';

    workspaceService.getRecentWorkspaceOptions = () => {
      return [
        option1,
        option2
      ];
    }
  }
}

storiesOf('V2 / Workspace Menu', module)
  .addDecorator(
    moduleMetadata({
      declarations: [],
      imports: [AppModule],
      providers: [],
    }),
  ).add('Renders without options', () => {
    return {
      component: WorkspaceMenuWithoutOptions
    };
  }).add('Renders with options', () => {
    return {
      component: WorkspaceMenuWithOptions
    };
  });
