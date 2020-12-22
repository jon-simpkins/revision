import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {IStructureTemplate, StructureTemplate} from '../protos';
import {StorageService} from './storage.service';

// Minimal details about a template to show in list view
export interface StructureTemplateListView {
  id: string;
  name: string;
}

const ALL_STRUCTURE_TEMPLATE_LIST_VIEW_KEY = 'allStructureTemplatesListView';
const STRUCTURE_TEMPLATE_KEY_PREFIX = 'structureTemplate-';

@Injectable({
  providedIn: 'root'
})
export class StructureTemplateService {

  constructor(private storageService: StorageService) { }

  async getAllStructureTemplates(): Promise<StructureTemplate[]> {
    const allEntries = await this.getAllTemplatesListView();

    const allTemplates = [];
    for (const entry of allEntries) {
      allTemplates.push(
        await this.getStructureTemplate(entry.id)
      );
    }

    return allTemplates;
  }

  async getAllTemplatesListView(): Promise<StructureTemplateListView[]> {
    return (await this.storageService.get(ALL_STRUCTURE_TEMPLATE_LIST_VIEW_KEY) || []) as StructureTemplateListView[];
  }

  async setAllTemplatesListView(structureTemplates: IStructureTemplate[]): Promise<void> {
    const listView = structureTemplates.map((structureTemplate: IStructureTemplate) => {
      return {
        id: structureTemplate.id,
        name: structureTemplate.name,
      } as StructureTemplateListView;
    });

    await this.storageService.set(ALL_STRUCTURE_TEMPLATE_LIST_VIEW_KEY, listView, true);
  }

  subscribeToTemplateListView(handler: (newTemplateListView: StructureTemplateListView[]) => void): string {
    return this.storageService.generateSubscription(ALL_STRUCTURE_TEMPLATE_LIST_VIEW_KEY, (fetchedValue) => {
      handler((fetchedValue || []) as StructureTemplateListView[]);
    });
  }

  cancelSubscriptionToTemplateListView(subscription: string): void {
    this.storageService.cancelSubscription(subscription);
  }

  getTemplateKey(uuid: string): string {
    return STRUCTURE_TEMPLATE_KEY_PREFIX + uuid;
  }

  async getStructureTemplate(uuid: string): Promise<StructureTemplate> {
    const fetchedData = (await this.storageService.get(this.getTemplateKey(uuid))) as Uint8Array;

    if (!fetchedData) {
      throw Error('Could not find structure template: ' + uuid);
    }

    return StructureTemplate.decode(
      fetchedData
    );
  }

  async setAllStructureTemplates(structureTemplates: IStructureTemplate[]): Promise<void> {
    await this.setAllTemplatesListView(structureTemplates);

    for (const structureTemplate of structureTemplates) {
      await this.setStructureTemplate(structureTemplate as StructureTemplate);
    }
  }

  async setStructureTemplate(structureTemplate: StructureTemplate, affectsListView: boolean = false): Promise<void> {
    await this.storageService.set(
      this.getTemplateKey(structureTemplate.id),
      StructureTemplate.encode(structureTemplate).finish(),
      true
    );

    if (affectsListView) {
      await this.setAllTemplatesListView(
        await this.getAllStructureTemplates()
      );
    }
  }

  // Creates a new structure template, and returns the uuid of the new entry
  async createNewStructureTemplate(): Promise<string> {
    const uuid = uuidv4();

    const newStructureTemplate = StructureTemplate.create({
      id: uuid
    });

    await this.setStructureTemplate(newStructureTemplate);

    const allStructureTemplates = await this.getAllStructureTemplates();
    allStructureTemplates.push(newStructureTemplate);

    await this.setAllTemplatesListView(allStructureTemplates);

    return uuid;
  }

}
