import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { ActionService } from 'src/app/services/action.service';
import { SYNTHESIS_ACTIONS } from 'src/actions/actions';
import { ActionOption } from 'src/actions/action-option';

@Component({
  selector: 'add-sequence-page',
  templateUrl: './add-sequence-page.component.html',
  styleUrls: ['./add-sequence-page.component.scss']
})
export class AddSequencePageComponent implements OnInit {

  constructor(workspaceService: WorkspaceService, actionService: ActionService) {
    setTimeout(() => {
      // Check to see if the plot already has a top-level structure element
      let structureIdToRedirectTo = workspaceService.getCurrentStory().plotElementId;

      if (!structureIdToRedirectTo) {
        // There's no top-level structure element, so create one
        const newStructureId = workspaceService.getCurrentStory().buildNewStructureElement();
        workspaceService.getCurrentStory().plotElementId = newStructureId;
        
        // Update the sequence runtime to match the script runtime
        workspaceService.getCurrentStory().structureElements.get(newStructureId).durationMin = workspaceService.getCurrentStory().runtimeMin;

        structureIdToRedirectTo = newStructureId;
      }

      actionService.startAction(new ActionOption(
        SYNTHESIS_ACTIONS.SUMMARIZE_SEQUENCE,
        null,
        workspaceService.getCurrentStoryId(),
        null,
        structureIdToRedirectTo
      ));
    }, 1500);
  }

  ngOnInit() {
  }


}
