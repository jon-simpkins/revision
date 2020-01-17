import { Component, OnInit } from '@angular/core';
import { ActionOption, ActionService } from '../../services/action.service';
import { ROUTE_TYPE } from '../v2-router/routes';
import { WorkspaceService } from '../../services/workspace.service';

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

  constructor(private actionService: ActionService, private workspaceService: WorkspaceService) {
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
      const actionType = option.getActionType();
      if (!option.needsCompletion && this.showUnfinishedOnly) {
        return false;
      }
      if (actionType === ROUTE_TYPE.ANALYSIS && !this.showAnalysis || actionType === ROUTE_TYPE.SYNTHESIS && !this.showSynthesis) {
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
