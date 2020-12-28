import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {IStructureTemplate, StructureTemplate} from '../protos';
import {StorageService} from './storage.service';
import {zip} from 'rxjs';
import StructureTemplateBeat = StructureTemplate.StructureTemplateBeat;

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

    const allTemplates: StructureTemplate[] = [];
    for (const entry of allEntries) {
      const fetchedTemplate = await this.getStructureTemplate(entry.id);
      if (fetchedTemplate != null) {
        allTemplates.push(
          fetchedTemplate
        );
      }
    }

    return allTemplates.filter((value) => !!value);
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

  cancelSubscription(subscription: string): void {
    this.storageService.cancelSubscription(subscription);
  }

  getTemplateKey(uuid: string): string {
    return STRUCTURE_TEMPLATE_KEY_PREFIX + uuid;
  }

  async getStructureTemplate(uuid: string): Promise<StructureTemplate|null> {
    const fetchedData = (await this.storageService.get(this.getTemplateKey(uuid))) as Uint8Array;

    if (!fetchedData) {
      console.error('Could not find structure template: ' + uuid);
      return null;
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
      await this.refreshAllTemplatesListView();
    }
  }

  subscribeToTemplate(templateId: string, handler: (newTemplate: StructureTemplate) => void): string {
    return this.storageService.generateSubscription(this.getTemplateKey(templateId), (fetchedValue) => {
      handler(
        StructureTemplate.decode(
          fetchedValue as Uint8Array
        )
      );
    });
  }

  async refreshAllTemplatesListView(): Promise<void> {
    const allTemplates = await this.getAllStructureTemplates();

    await this.setAllTemplatesListView(
      allTemplates.filter((template) => !!template)
    );
  }

  async deleteTemplate(templateId: string): Promise<void> {
    await this.storageService.delete(
      this.getTemplateKey(templateId)
    );

    const listViewEligible = (await this.getAllTemplatesListView())
      .filter((structureTemplate) => {
        return structureTemplate.id !== templateId;
    });

    await this.setAllTemplatesListView(listViewEligible);
  }

  // Creates a new structure template, and returns the uuid of the new entry
  async createNewStructureTemplate(): Promise<string> {
    const uuid = uuidv4();

    const newStructureTemplate = StructureTemplate.create({
      id: uuid,
      name: 'My new template',
      description: 'Description goes here',
      beats: [
        StructureTemplateBeat.create({
          description: 'This is the first beat',
          intendedDurationMs: 5
        })
      ]
    });

    await this.setStructureTemplate(newStructureTemplate);

    const allStructureTemplates = await this.getAllStructureTemplates();
    allStructureTemplates.push(newStructureTemplate);

    await this.setAllTemplatesListView(allStructureTemplates);

    return uuid;
  }

}
