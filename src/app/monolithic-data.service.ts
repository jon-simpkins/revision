import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import {WritingWorkspace} from '../protos';

const WORKSPACE_NAME_KEY = 'workspaceName';

// This is the monolithic service that'll handle all the story data.
//
// This will certainly get broken up into smaller bits later on.
@Injectable({
  providedIn: 'root'
})
export class MonolithicDataService {

  constructor(private storage: StorageMap) { }

  async newWorkspace(name: string): Promise<void> {
    await this.clear();
    await this.setWorkspaceName(name);
  }

  // Function to load workspace into local memory.
  async loadWorkspace(workspace: WritingWorkspace): Promise<void> {
    await this.clear();
    await this.setWorkspaceName(workspace.name);
  }

  // Function to pull workspace from local memory.
  async saveWorkspace(): Promise<WritingWorkspace> {
    const workspace = WritingWorkspace.create();

    workspace.name = await this.getWorkspaceName();

    return Promise.resolve(workspace);
  }

  async setWorkspaceName(name: string): Promise<void> {
    await this.storage.set(WORKSPACE_NAME_KEY, name).toPromise();
  }

  async getWorkspaceName(): Promise<string> {
    return (await this.storage.get(WORKSPACE_NAME_KEY, { type: 'string'}).toPromise())
      || '';
  }

  async clear(): Promise<void> {
    await this.storage.clear().toPromise();
  }
}
