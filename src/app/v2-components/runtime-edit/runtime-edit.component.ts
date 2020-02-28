import { Component, OnInit } from '@angular/core';

import { WorkspaceService } from 'src/app/services/workspace.service';
import { ActionOption } from 'src/actions/action-option';
import { ANALYSIS_ACTIONS } from 'src/actions/actions';

@Component({
  selector: 'runtime-edit',
  templateUrl: './runtime-edit.component.html',
  styleUrls: ['./runtime-edit.component.scss']
})
export class RuntimeEditComponent implements OnInit {
  public getStoryViewAction: () => ActionOption;
  public currentRuntimeMin: number;
  public errorMsg: string = '';

  constructor(private workspaceService: WorkspaceService) {
    this.getStoryViewAction = () => new ActionOption(ANALYSIS_ACTIONS.STORY_VIEW_PAGE);
    this.updateRuntimeValue(this.workspaceService.getCurrentStory().runtimeMin);
  }

  updateRuntimeValue(newValue: number): void {
    if (!!newValue && !isNaN(newValue) && newValue > 0) {
      if (newValue > 600) {
        this.errorMsg = 'Woah, please enter a value less than 10 hrs (600 minutes)';
      } else if (newValue !== Math.round(newValue)) {
        this.errorMsg = 'Alright, no need for decimals, just stick with whole numbers';
      } else {
        this.errorMsg = '';
        let maxSimilarRuntime = this.getMaxSimilarRuntime();
        let minSimilarRuntime = this.getMinSimilarRuntime();
        if (minSimilarRuntime && newValue < minSimilarRuntime) {
          this.errorMsg = `Fair warning: this is less than the smallest runtime (${minSimilarRuntime}) of the movies similar to this one.`
        }
        if (maxSimilarRuntime && newValue > maxSimilarRuntime) {
          this.errorMsg = `Fair warning: this is more than the largest runtime (${maxSimilarRuntime}) of the movies similar to this one.`
        }
      }
      this.workspaceService.getCurrentStory().setNewRuntimeMin(newValue);
    } else {
      this.errorMsg = 'Please enter a valid integer greater than zero';
    }

    this.currentRuntimeMin = this.workspaceService.getCurrentStory().runtimeMin || 0;
  }

  getMinSimilarRuntime(): number {
    let minSimilarRuntime = 0;
    this.workspaceService.getCurrentStory().similarMovieIds.forEach((similarMovieId: string) => {
      let similarRuntime = this.workspaceService.currentWorkspace.similarMovies.get(similarMovieId).runtimeMin;
      if (similarRuntime && (!minSimilarRuntime || similarRuntime < minSimilarRuntime)) {
        minSimilarRuntime = similarRuntime;
      }
    });

    return minSimilarRuntime;
  }

  getMaxSimilarRuntime(): number {
    let maxSimilarRuntime = 0;
    this.workspaceService.getCurrentStory().similarMovieIds.forEach((similarMovieId: string) => {
      let similarRuntime = this.workspaceService.currentWorkspace.similarMovies.get(similarMovieId).runtimeMin;
      if (similarRuntime && (!maxSimilarRuntime || similarRuntime > maxSimilarRuntime)) {
        debugger;
        maxSimilarRuntime = similarRuntime;
      }
    });

    debugger;

    return maxSimilarRuntime;
  }

  inputHandler(e) {
    const newValue = Number.parseFloat(e.target.value);
    this.updateRuntimeValue(newValue);
  }

  interceptFormSubmit(formSubmitEvent: Event) {
    formSubmitEvent.preventDefault();
  }

  ngOnInit() {
  }

}
