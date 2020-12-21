import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import {WritingWorkspace} from '../protos';
import {WorkspaceMetadataService} from './workspace-metadata.service';
import {StructureTemplateService} from './structure-template.service';

const WORKSPACE_NAME_KEY = 'workspaceName';

// This is the monolithic service that'll handle all the story data.
//
// This will certainly get broken up into smaller bits later on.
@Injectable({
  providedIn: 'root'
})
export class MonolithicDataService {

  constructor(private storage: StorageMap,
              private workspaceMetadataService: WorkspaceMetadataService,
              private structureTemplateService: StructureTemplateService) { }

  async newWorkspace(name: string): Promise<void> {
    await this.clear();
    await this.setWorkspaceName(name);
  }

  // Function to load workspace into local memory.
  async loadWorkspace(workspace: WritingWorkspace): Promise<void> {
    await this.clear();
    await this.setWorkspaceName(workspace.name);
    await this.workspaceMetadataService.setWorkspaceMetadata(workspace.metadata || null);
    await this.structureTemplateService.setAllStructureTemplates(workspace.structureTemplates || []);
  }

  // Function to pull workspace from local memory.
  async saveWorkspace(): Promise<WritingWorkspace> {
    const workspace = WritingWorkspace.create();

    workspace.name = await this.getWorkspaceName();
    workspace.metadata = await this.workspaceMetadataService.getWorkspaceMetadata(true);
    workspace.structureTemplates = await this.structureTemplateService.getAllStructureTemplates();

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
