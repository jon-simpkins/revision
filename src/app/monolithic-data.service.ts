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

  // Function to load workspace
  loadWorkspace(workspace: WritingWorkspace, next: () => void): void {
    this.setWorkspaceName(workspace.name).then(() => {
      next();
    });
  }

  saveWorkspace(next: (workspace: WritingWorkspace) => void): void {
    const workspace = WritingWorkspace.create();
    this.getWorkspaceName().then((name: string) => {
      workspace.name = name;
    }).then(() => {
      next(workspace);
    });
  }

  setWorkspaceName(name: string): Promise<any> {
    return this.storage.set(WORKSPACE_NAME_KEY, name).toPromise();
  }

  getWorkspaceName(): Promise<any> {
    return this.storage.get(WORKSPACE_NAME_KEY).toPromise();
  }


  clear(next: () => void): void {
    this.storage.clear().subscribe(next);
  }
}
