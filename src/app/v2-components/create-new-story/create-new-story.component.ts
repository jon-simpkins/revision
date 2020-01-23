import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.service';
import { ActionOption } from 'src/actions/action-option';
import { SYNTHESIS_ACTIONS } from 'src/actions/actions';
import { ActionService } from 'src/app/services/action.service';

@Component({
  selector: 'create-new-story',
  templateUrl: './create-new-story.component.html',
  styleUrls: ['./create-new-story.component.scss']
})
export class CreateNewStoryComponent implements OnInit {

  constructor(workspaceService: WorkspaceService, actionService: ActionService) {
    setTimeout(() => {
      const newStoryId = workspaceService.currentWorkspace.buildNewStory();
      workspaceService.setCurrentStoryId(newStoryId);

      const newAction = new ActionOption(SYNTHESIS_ACTIONS.ASSIGN_SIMILAR_MOVIES, true, newStoryId);
      actionService.startAction(newAction);
    }, 1500)
  }

  ngOnInit() {
  }

}
