import { storiesOf, moduleMetadata } from '@storybook/angular';

import { Component } from '@angular/core';

import { AppModule } from '../../app.module';
import { ActionService, ActionOption } from '../../services/action.service';
import { ROUTES } from '../v2-router/routes';
import { HackUpdateService } from '../../services/hack-update.service';

const TEMPLATE = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <action-bar></action-bar>
`;

@Component({
    template: TEMPLATE
})
class ActionBarWhenNoAction {
    constructor(actionService: ActionService, hackUpdateService: HackUpdateService) {
        actionService.currentOption = null;
    }
}

@Component({
    template: TEMPLATE
})
class ActionBarWhenSimpleActionInProgress {
    constructor(actionService: ActionService, hackUpdateService: HackUpdateService) {
        const newActionOption = new ActionOption(
            ROUTES.DETAIL_SIMILAR_MOVIES
        );

        actionService.currentOption = newActionOption;
        actionService.currentEpochStarted = Date.now() - (1000 * 72);
    }
}


storiesOf('V2 / Action Bar', module)
    .addDecorator(
        moduleMetadata({
            declarations: [],
            imports: [AppModule],
            providers: [],
        }),
    ).add('Renders without current action', () => {
        return {
            component: ActionBarWhenNoAction
        };
    }).add('Renders with basic current action', () => {
        return {
            component: ActionBarWhenSimpleActionInProgress
        };
    });
