import { Injectable } from '@angular/core';

import { createDoc, fetchDoc, updateBatch } from '../../docsApi/docsApiHelpers';
import { generateV2HeaderCommands } from '../../docsApi/docsContentHelpers';
import { Workspace } from 'src/storyStructures';
import {applyDiffs, generateDiffToSave} from 'src/storyStructures/serialization';

/**
 * Locally-stored information about a workspace
 */
export class WorkspaceOption {
  id: string;
  lastOpened: number;
  title: string;
}

const WORKSPACE_LOCAL_STORAGE_KEY = 'workspace-options';

/**
 * Service for managing:
 *   * What workspace am I in right now?
 *   * Creating a new workspace
 *   * What workspaces can I open?
 */

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  private workspaceId?: string;
  public currentWorkspace: Workspace;
  private lastLoadedWorkspace: Workspace; // We keep a separate copy, so we know what changes to save
  // TODO: there *has* to be a more efficient way of tracking changes, but this expedites things for dev

  constructor() { }

  /**
   * Returns a promise that resolves to the id of the new workspace
   */
  createWorkspace(name: string): Promise<string> {
    return createDoc(`Revision Workspace: ${name}`)
      .then((response) => {
        const newDocumentId = response.result.documentId;

        return updateBatch(
          newDocumentId,
          generateV2HeaderCommands(newDocumentId)
        ).then(() => {
          return Promise.resolve(newDocumentId);
        });
      });
  }

  /**
   * Returns a promise that resolves to if the workspace actually changed
   * or not
   */
  openWorkspace(workspaceId: string): Promise<boolean> {
    if (this.workspaceId === workspaceId) {
      // Exit early
      return Promise.resolve(false);
    }

    if (!workspaceId) {
      this.workspaceId = null;
      this.currentWorkspace = null;
      this.lastLoadedWorkspace = null;
      return Promise.resolve(true); // Just nulling out
    }

    return fetchDoc(workspaceId).then((response) => {
      this.workspaceId = workspaceId;

      const docName = response.result.title;

      this.persistOpenedOption(workspaceId, docName);

      let workspaceProxyObject = JSON.parse(new Workspace().toString());

      response.result.body.content.forEach((section) => {
        let textContent = null;
        try {
          textContent = section.paragraph.elements[0].textRun.content;

          workspaceProxyObject = WorkspaceService.applyDiffs(workspaceProxyObject, textContent);
        } catch (e) { }
      });

      this.currentWorkspace = Workspace.parseFromString(JSON.stringify(workspaceProxyObject));
      this.lastLoadedWorkspace = Workspace.parseFromString(JSON.stringify(workspaceProxyObject));
      console.log('Workspace after importing:');
      console.log(this.currentWorkspace);

      return Promise.resolve(true);
    });
  }

  /**
   * Convenience function for applying serialized diffs to a workspace
   * 
   * @param initialWorkspaceProxy JSON object representing the current state of the workspace (before applying diffs)
   * @param base64Diffs Base64-encoded JSON of array of diffs
   * @returns JSON object representing the current state of the workspace after applying diffs
   */
  static applyDiffs(initialWorkspaceProxy: Object, base64Diffs: string): Object {
    let diffString = atob(base64Diffs);
    return applyDiffs(initialWorkspaceProxy, JSON.parse(diffString));
  }

  static determineBase64Diffs(oldWorkspaceStr, newWorkspaceStr): string {
    let diffJSONStr = generateDiffToSave(
      oldWorkspaceStr,
      newWorkspaceStr
    );
    return btoa(diffJSONStr);
  }

  persistOpenedOption(id: string, title: string) {
    const options = this.getRecentWorkspaceOptions().filter(option => {
      return option.id !== id; // Filter out the new one we're adding
    });

    const newOption = new WorkspaceOption;
    newOption.id = id;
    newOption.lastOpened = Date.now();
    newOption.title = title;

    options.unshift(newOption);

    localStorage.setItem(WORKSPACE_LOCAL_STORAGE_KEY, JSON.stringify(options));
  }

  /**
   * Returns the ID of the current workspace
   */
  getCurrentWorkspaceId(): string {
    return this.workspaceId;
  }

  getRecentWorkspaceOptions(): WorkspaceOption[] {
    let options: WorkspaceOption[] = [];
    if (localStorage.getItem(WORKSPACE_LOCAL_STORAGE_KEY)) {
      options = JSON.parse(localStorage.getItem(WORKSPACE_LOCAL_STORAGE_KEY))
        .map(entry => entry as WorkspaceOption);
    }

    return options;
  }

}