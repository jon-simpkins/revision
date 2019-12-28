import { Injectable } from '@angular/core';

import { createDoc, fetchDoc, updateBatch } from '../../docsApi/docsApiHelpers';
import { generateV2HeaderCommands } from '../../docsApi/docsContentHelpers';

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
      this.workspaceId = workspaceId;
      return Promise.resolve(true); // Just nulling out
    }

    return fetchDoc(workspaceId).then((response) => {
      this.workspaceId = workspaceId;

      const docName = response.result.title;

      this.persistOpenedOption(workspaceId, docName);

      response.result.body.content.forEach((section) => {
        let textContent = null;
        try {
          textContent = section.paragraph.elements[0].textRun.content;

          // TODO: parse from text content
        } catch (e) { }
      });


      console.log('Changed workspace to ' + this.workspaceId);

      return Promise.resolve(true);
    });
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
