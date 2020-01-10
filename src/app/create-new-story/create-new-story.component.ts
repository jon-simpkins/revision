import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../services/workspace.service';
import { RoutingService } from '../services/routing.service';
import { ROUTES } from '../v2-router/routes';

@Component({
  selector: 'create-new-story',
  templateUrl: './create-new-story.component.html',
  styleUrls: ['./create-new-story.component.scss']
})
export class CreateNewStoryComponent implements OnInit {

  constructor(workspaceService: WorkspaceService, routingService: RoutingService) {
    setTimeout(() => {
      const newStoryId = workspaceService.currentWorkspace.buildNewStory();
      workspaceService.setCurrentStoryId(newStoryId);
      routingService.navigateToUrl(ROUTES.ASSIGN_SIMILAR_MOVIES);
    }, 1500)
  }

  ngOnInit() {
  }

}
