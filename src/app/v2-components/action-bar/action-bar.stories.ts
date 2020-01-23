import { storiesOf, moduleMetadata } from '@storybook/angular';

import { Component } from '@angular/core';

import { AppModule } from '../../app.module';
import { ActionService } from '../../services/action.service';

import { HackUpdateService } from '../../services/hack-update.service';
import { ActionOption } from '../../../actions/action-option';
import { ANALYSIS_ACTIONS } from 'src/actions/actions';

const TEMPLATE = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <action-bar></action-bar>
`;

@Component({
    template: TEMPLATE
})
class ActionBarWhenNoAction {
    constructor(actionService: ActionService, hackUpdateService: HackUpdateService) {
        actionService.resetAction();
    }
}

@Component({
    template: TEMPLATE
})
class ActionBarWhenSimpleActionInProgress {
    constructor(actionService: ActionService, hackUpdateService: HackUpdateService) {
        const newActionOption = new ActionOption(
            ANALYSIS_ACTIONS.DETAIL_SIMILAR_MOVIES
        );

        actionService.startAction(newActionOption);
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
