import { Injectable } from '@angular/core';

import { ROUTES } from '../v2-components/v2-router/routes'; // todo: make this an enum of routes?
import { WorkspaceService } from './workspace.service';
import { RoutingService } from './routing.service';
import { HistoryEntry, Story, SimilarMovie, PlotStructureElement, Character, CHARACTER_TYPE } from '../../storyStructures';
import { getLoginEmail } from 'src/docsApi/docsApiHelpers';

import { ActionOption } from '../../actions/action-option';
import { SYNTHESIS_ACTIONS, ANALYSIS_ACTIONS } from '../../actions/actions';

/**
 * A service to determine the list of actions available,
 * help facilitate the beginning of an action,
 * and track the current state of an action
 */
@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private currentViewOption?: ActionOption = null;
  private currentEditOption?: ActionOption = null;

  // The epoch ms when the session started, zero indicates no current session
  private currentSessionStarted: number = 0;

  constructor(private workspaceService: WorkspaceService, private routingService: RoutingService) { }

  getCurrentSessionStarted(): number {
    return this.currentSessionStarted;
  }

  getCurrentViewOption(): ActionOption {
    return this.currentViewOption;
  }

  getCurrentEditOption(): ActionOption {
    return this.currentEditOption;
  }

  getAllActionOptions(): Promise<ActionOption[]> {
    if (!this.workspaceService.currentWorkspace) {
      // Still loading...
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.getAllActionOptions());
        }, 250);
      });
    }

    let similarMoviesHaveAllDetails = true;
    this.workspaceService.currentWorkspace.similarMovies.forEach((similarMovie: SimilarMovie) => {
      if (similarMovie.getNeedsCompletion()) {
        similarMoviesHaveAllDetails = false;
      }
    })

    const options = [ // Initialize to ones that are always options
      new ActionOption(ANALYSIS_ACTIONS.DETAIL_SIMILAR_MOVIES, !similarMoviesHaveAllDetails),
      new ActionOption(SYNTHESIS_ACTIONS.CREATE_NEW_STORY, true),
      new ActionOption(ANALYSIS_ACTIONS.REVISION_HISTORY, false),
      new ActionOption(ANALYSIS_ACTIONS.STRUCTURE_ANALYSIS, true),
    ];

    this.workspaceService.currentWorkspace.stories.forEach((story: Story, storyId: string) => {
      options.push(
        new ActionOption(ANALYSIS_ACTIONS.STORY_VIEW_PAGE, !story.hasContentToShow(), storyId)
      );

      options.push(
        new ActionOption(SYNTHESIS_ACTIONS.ASSIGN_SIMILAR_MOVIES, !story.similarMovieIds.length, storyId)
      );

      options.push(
        new ActionOption(SYNTHESIS_ACTIONS.LOGLINE_EDIT_PAGE, !story.logLine, storyId)
      );

      options.push(
        new ActionOption(SYNTHESIS_ACTIONS.RUNTIME_EDIT, !story.runtimeMin, storyId)
      );

      if (!story.plotElementId) {
        // Need to add a main plot sequence if there isn't one
        options.push(
          new ActionOption(SYNTHESIS_ACTIONS.ADD_SEQUENCE, true, storyId)
        )
      }

      // Yikes, embedded for loops, but: iterate over all sequences in this
      story.structureElements.forEach((plotElement: PlotStructureElement) => {
        options.push(
          new ActionOption(SYNTHESIS_ACTIONS.SUMMARIZE_SEQUENCE, !plotElement.summaryRawText, storyId, plotElement.id)
        );

        options.push(
          new ActionOption(SYNTHESIS_ACTIONS.SPEC_SUBSTRUCTURE, plotElement.anyUnassignedBeats(), storyId, plotElement.id)
        );

        options.push(
          new ActionOption(SYNTHESIS_ACTIONS.IDENTIFY_CHARACTERS_IN_SEQUENCE, !plotElement.characterAppearances.length, storyId, plotElement.id)
        );
      });

      story.characters.forEach((character: Character) => {
        options.push(
          new ActionOption(SYNTHESIS_ACTIONS.CHARACTER_CHARACTERISTICS, !character.type || !character.name, storyId, character.id)
        );

        if (character.type === CHARACTER_TYPE.PRIMARY || character.type === CHARACTER_TYPE.SECONDARY) {
          options.push(
            new ActionOption(SYNTHESIS_ACTIONS.CHARACTER_SUMMARY, !character.summary, storyId, character.id)
          );
        }
      });

    });

    return Promise.resolve(options);
  }

  /**
   * Generate the list of story options for the story-selector dropdown
   */
  getAllStoryOptions() {
    const allStoryOptions = [{
      label: 'Any',
      value: 'any'
    }];

    this.workspaceService.currentWorkspace.stories.forEach((story: Story, storyId: string) => {
      allStoryOptions.push({
        label: storyId,
        value: storyId
      });
    });

    return allStoryOptions;
  }

  startAction(option: ActionOption) {
    if (!this.currentSessionStarted) {
      this.currentSessionStarted = Date.now();
    }

    if (option.storyId) {
      this.workspaceService.setCurrentStoryId(option.storyId);
    }

    let viewEntityId: string = null;
    let editEntityId: string = null;

    if (option.getIsSynthesis()) {
      this.currentEditOption = option;
      editEntityId = option.entityId;
    } else {
      this.currentViewOption = option;
      viewEntityId = option.entityId;
    }

    this.routingService.navigateToUrl(ROUTES.WRITING, option.storyId, viewEntityId, editEntityId);
  }

  completeAction() {
    const newHistoryEntry = new HistoryEntry();
    newHistoryEntry.userEmail = getLoginEmail();
    newHistoryEntry.editStartEpochMs = this.currentSessionStarted;
    newHistoryEntry.editEndEpochMs = Date.now();

    this.workspaceService.saveAdditionalSerialization(newHistoryEntry)
      .then(() => {
        this.resetAction();
      });
  }

  abandonCurrentAction() {
    this.workspaceService.abandonWorkspaceChanges();
    this.resetAction();
  }

  resetAction() {
    this.currentSessionStarted = 0;
    this.currentViewOption = null;
    this.currentEditOption = null;
    this.routingService.navigateToUrl(ROUTES.ACTION_MENU);
  }

}
