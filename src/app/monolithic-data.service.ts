import { Injectable } from '@angular/core';
import {WritingWorkspace} from '../protos';
import {WorkspaceMetadataService} from './workspace-metadata.service';
import {StructureTemplateService} from './structure-template.service';
import {StorageService} from './storage.service';

const WORKSPACE_NAME_KEY = 'workspaceName';

// This is the monolithic service that'll handle all the story data.
//
// This will certainly get broken up into smaller bits later on.
@Injectable({
  providedIn: 'root'
})
export class MonolithicDataService {

  constructor(private storageService: StorageService,
              private workspaceMetadataService: WorkspaceMetadataService,
              private structureTemplateService: StructureTemplateService) { }

  async newWorkspace(name: string): Promise<void> {
    await this.clear();
    await this.loadWorkspace(WritingWorkspace.create({
      name,
    }));
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
    await this.storageService.set(WORKSPACE_NAME_KEY, name, true);
  }

  async getWorkspaceName(): Promise<string> {
    return (await this.storageService.get(WORKSPACE_NAME_KEY) as string)
      || '';
  }

  subscribeToWorkspaceName(handler: (workspaceName: string) => void): string {
    return this.storageService.generateSubscription(WORKSPACE_NAME_KEY, (result) => {
      handler(result as string);
    });
  }

  cancelSubscriptionToWorkspaceName(subscriptionId: string): void {
    this.storageService.cancelSubscription(subscriptionId);
  }

  async clear(): Promise<void> {
    await this.storageService.clearAll();
  }
}
