import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {StorageService} from './storage.service';
import {BrainstormTemplate, IBrainstormTemplate} from '../protos';

// Minimal details about a template to show in list view
export interface BrainstormTemplateListView {
  id: string;
  label: string;
}

const ALL_BRAINSTORM_TEMPLATE_LIST_VIEW_KEY = 'allBrainstormTemplatesListView';
const BRAINSTORM_TEMPLATE_KEY_PREFIX = 'brainstormTemplate-';

@Injectable({
  providedIn: 'root'
})
export class BrainstormTemplateService {

  constructor(private storageService: StorageService) { }

  async getAllBrainstormTemplates(): Promise<BrainstormTemplate[]> {
    const allEntries = await this.getAllTemplatesListView();

    const allTemplates: BrainstormTemplate[] = [];
    for (const entry of allEntries) {
      const fetchedTemplate = await this.getBrainstormTemplate(entry.id);
      if (fetchedTemplate != null) {
        allTemplates.push(
          fetchedTemplate
        );
      }
    }

    return allTemplates.filter((value) => !!value);
  }

  async getAllTemplatesListView(): Promise<BrainstormTemplateListView[]> {
    return (await this.storageService.get(ALL_BRAINSTORM_TEMPLATE_LIST_VIEW_KEY) || []) as BrainstormTemplateListView[];
  }

  async setAllTemplatesListView(brainstormTemplates: IBrainstormTemplate[]): Promise<void> {
    const listView = brainstormTemplates.map((brainstormTemplate: IBrainstormTemplate) => {
      return {
        id: brainstormTemplate.id,
        label: brainstormTemplate.label,
      } as BrainstormTemplateListView;
    });

    await this.storageService.set(ALL_BRAINSTORM_TEMPLATE_LIST_VIEW_KEY, listView, true);
  }

  cancelSubscription(subscription: string): void {
    this.storageService.cancelSubscription(subscription);
  }

  getTemplateKey(uuid: string): string {
    return BRAINSTORM_TEMPLATE_KEY_PREFIX + uuid;
  }

  async getBrainstormTemplate(uuid: string): Promise<BrainstormTemplate|null> {
    const fetchedData = (await this.storageService.get(this.getTemplateKey(uuid))) as Uint8Array;

    if (!fetchedData) {
      console.error('Could not find brainstorm template: ' + uuid);
      return null;
    }

    return BrainstormTemplate.decode(
      fetchedData
    );
  }

  async setAllBrainstormTemplates(brainstormTemplates: IBrainstormTemplate[]): Promise<void> {
    await this.setAllTemplatesListView(brainstormTemplates);

    for (const brainstormTemplate of brainstormTemplates) {
      await this.setBrainstormTemplate(brainstormTemplate as BrainstormTemplate);
    }
  }

  async setBrainstormTemplate(brainstormTemplate: BrainstormTemplate, affectsListView: boolean = false): Promise<void> {
    await this.storageService.set(
      this.getTemplateKey(brainstormTemplate.id),
      BrainstormTemplate.encode(brainstormTemplate).finish(),
      true
    );

    if (affectsListView) {
      await this.refreshAllTemplatesListView();
    }
  }

  async refreshAllTemplatesListView(): Promise<void> {
    const allTemplates = await this.getAllBrainstormTemplates();

    await this.setAllTemplatesListView(
      allTemplates.filter((template) => !!template)
    );
  }

  async deleteTemplate(templateId: string): Promise<void> {
    await this.storageService.delete(
      this.getTemplateKey(templateId),
      true
    );

    const listViewEligible = (await this.getAllTemplatesListView())
      .filter((brainstormTemplate) => {
        return brainstormTemplate.id !== templateId;
      });

    await this.setAllTemplatesListView(listViewEligible);
  }

  // Creates a new structure template, and returns the uuid of the new entry
  async createNewBrainstormTemplate(): Promise<string> {
    const uuid = uuidv4();

    const newBrainstormTemplate = BrainstormTemplate.create({
      id: uuid,
      label: 'My new template',
      template: 'This is the placeholder content that will appear when a user selects this.\n\nYou could pose a question here, or give an exercise to explore'
    });

    await this.setBrainstormTemplate(newBrainstormTemplate);

    const allBrainstormTemplates = await this.getAllBrainstormTemplates();
    allBrainstormTemplates.push(newBrainstormTemplate);

    await this.setAllTemplatesListView(allBrainstormTemplates);

    return uuid;
  }

  subscribeToTemplateListView(handler: (newTemplateListView: BrainstormTemplateListView[]) => void): string {
    return this.storageService.generateSubscription(ALL_BRAINSTORM_TEMPLATE_LIST_VIEW_KEY, (fetchedValue) => {
      handler((fetchedValue || []) as BrainstormTemplateListView[]);
    });
  }

  subscribeToTemplate(templateId: string, handler: (newTemplate: BrainstormTemplate) => void): string {
    return this.storageService.generateSubscription(this.getTemplateKey(templateId), (fetchedValue) => {
      handler(
        BrainstormTemplate.decode(
          fetchedValue as Uint8Array
        )
      );
    });
  }
}
