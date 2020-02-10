import { storiesOf, moduleMetadata } from '@storybook/angular';

import { Component } from '@angular/core';

import { AppModule } from '../../app.module';
import { HackUpdateService } from '../../services/hack-update.service';
import { WorkspaceService } from '../../services/workspace.service';

import { serializedWorkspace001 } from 'src/storyStructures/data';
import { PlotStructureElement, PlotTemplateBeat } from 'src/storyStructures';

const TEMPLATE = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <sequence-beat-card
    [beatSequenceId]="beatSequenceId"
    [templateBeat]="templateBeat"
    [beatDurationMin]="beatDurationMin"
    [attachCallback]="attachCallback"
    [detachCallback]="detachCallback"
  ></sequence-beat-card>
`;

const BEAT_SEQUENCE_ID_1 = 'beatSequenceId1';

const TemplateBeat: PlotTemplateBeat = new PlotTemplateBeat();
TemplateBeat.oneLiner = 'Act 1';
TemplateBeat.description = 'This is where you setup everything, and maybe have a montage?'

@Component({ template: TEMPLATE })
class BeatCard {
    constructor(workspaceService: WorkspaceService, hackUpdateService: HackUpdateService) {
        workspaceService.importWorkspaceFromString(serializedWorkspace001);
        workspaceService.setCurrentStoryId('ba9e97b7337e4f7480742837eba8a20e');

        workspaceService.getCurrentStory().structureElements.set(BEAT_SEQUENCE_ID_1, new PlotStructureElement());
        workspaceService.getCurrentStory().structureElements.get(BEAT_SEQUENCE_ID_1).id = BEAT_SEQUENCE_ID_1;
        workspaceService.getCurrentStory().structureElements.get(BEAT_SEQUENCE_ID_1).oneLiner = 'This is the one-liner';
        workspaceService.getCurrentStory().structureElements.get(BEAT_SEQUENCE_ID_1).parentId = workspaceService.getCurrentStory().plotElementId;
    }
}


storiesOf('V2 / Sequence Beat Card', module)
    .addDecorator(
        moduleMetadata({
            declarations: [],
            imports: [AppModule],
            providers: [],
        }),
    ).add('Renders with a template and no assigned beat', () => {
        return {
            component: BeatCard,
            props: {
                beatSequenceId: null,
                templateBeat: TemplateBeat,
                beatDurationMin: 14.05,
                attachCallback: (newId: string) => {
                    console.log('parent got attach call for: ' + newId);
                }
            }
        };
    }).add('Renders with a template and an assigned beat', () => {
        return {
            component: BeatCard,
            props: {
                beatSequenceId: BEAT_SEQUENCE_ID_1,
                templateBeat: TemplateBeat,
                beatDurationMin: 14.05,
                detachCallback: () => {
                    console.log('Would have detached!');
                }
            }
        };
    })