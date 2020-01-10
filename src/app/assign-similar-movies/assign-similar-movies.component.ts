import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../services/workspace.service';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'assign-similar-movies',
  templateUrl: './assign-similar-movies.component.html',
  styleUrls: ['./assign-similar-movies.component.scss']
})
export class AssignSimilarMoviesComponent implements OnInit {

  lastLoadedStoryId?: string = null;

  constructor(private workspaceService: WorkspaceService, private routingService: RoutingService) {
    this.getStoryId();
  }

  ngOnInit() {
  }

  getStoryId(): string {    
    this.lastLoadedStoryId = this.workspaceService.getCurrentStoryId();
    
    return this.lastLoadedStoryId;
  }
  

}
