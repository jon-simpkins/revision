import { Component, OnInit } from '@angular/core';
import { ActionService } from '../../services/action.service';
import { WorkspaceService } from '../../services/workspace.service';
import { ActionOption } from '../../../actions/action-option';

/**
 * Component for selecting an action within a workspace
 * 
 * This would be the entry point for return users, and
 * the point where users would come back to every time they completed a
 * challenge / task.
 */

@Component({
  selector: 'action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss']
})
export class ActionMenuComponent implements OnInit {

  public allOptions: ActionOption[];
  public actionOptionDataSource: ActionOption[];
  public actionOptionColumns = ['label', 'storyId', 'synthesisAnalysis', 'needsCompletion']
  public storyOptions: any[];


  public showSynthesis = true;
  public showAnalysis = true;
  public showUnfinishedOnly = true;
  public currentSelectedStoryId: string;

  constructor(private actionService: ActionService, workspaceService: WorkspaceService) {
    this.allOptions = [];
    this.actionService.getAllActionOptions().then((options) => {
      this.allOptions = options;
      this.buildActionOptionDataSource();
      this.storyOptions = this.actionService.getAllStoryOptions();
    });
    this.currentSelectedStoryId = workspaceService.getCurrentStoryId() || 'any';
  }

  ngOnInit() {
  }

  buildActionOptionDataSource() {
    this.actionOptionDataSource = this.allOptions.filter(option => {
      const actionIsSynthesis = option.getIsSynthesis();
      if (!option.needsCompletion && this.showUnfinishedOnly) {
        return false;
      }
      if ((!actionIsSynthesis && !this.showAnalysis) || (actionIsSynthesis && !this.showSynthesis)) {
        return false;
      }
      if (this.currentSelectedStoryId !== 'any' && this.currentSelectedStoryId !== option.storyId) {
        return false;
      }

      return true;
    });
  }

  handleShowAnalysisClick(e) {
    e.preventDefault();
    this.showAnalysis = !this.showAnalysis;
    this.buildActionOptionDataSource();
  }

  handleShowSynthesisClick(e) {
    e.preventDefault();
    this.showSynthesis = !this.showSynthesis;
    this.buildActionOptionDataSource();
  }

  handleShowUnfinishedToggle(e) {
    e.preventDefault();
    this.showUnfinishedOnly = !this.showUnfinishedOnly;
    this.buildActionOptionDataSource();
  }

  changeSelectedStory(e) {
    this.currentSelectedStoryId = e;
    this.buildActionOptionDataSource();
  }

  selectRandomOption() {
    const randomIdx = Math.floor(Math.random() * this.actionOptionDataSource.length);
    this.executeOption(this.actionOptionDataSource[randomIdx]);
  }

  executeOption(option: ActionOption) {
    this.actionService.startAction(option);
  }

}
