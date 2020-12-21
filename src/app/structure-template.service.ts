import { Injectable } from '@angular/core';
import {StorageMap} from '@ngx-pwa/local-storage';
import { v4 as uuidv4 } from 'uuid';
import {IStructureTemplate, StructureTemplate} from '../protos';

const ALL_STRUCTURE_TEMPLATE_UUIDS_KEY = 'allStructureTemplateIds';
const STRUCTURE_TEMPLATE_KEY_PREFIX = 'structureTemplate-';

@Injectable({
  providedIn: 'root'
})
export class StructureTemplateService {

  constructor(private storage: StorageMap) { }

  async getAllStructureTemplates(): Promise<StructureTemplate[]> {
    const allUuids = await this.getAllTemplateKeys();

    const allTemplates = [];
    for (const uuid of allUuids) {
      allTemplates.push(
        await this.getStructureTemplate(uuid)
      );
    }

    return allTemplates;
  }

  async getAllTemplateKeys(): Promise<string[]> {
    return (await this.storage.get(ALL_STRUCTURE_TEMPLATE_UUIDS_KEY).toPromise() || []) as string[];
  }

  async setAllTemplateKeys(allUuids: string[]): Promise<void> {
    await this.storage.set(ALL_STRUCTURE_TEMPLATE_UUIDS_KEY, allUuids).toPromise();
  }

  getTemplateKey(uuid: string): string {
    return STRUCTURE_TEMPLATE_KEY_PREFIX + uuid;
  }

  async getStructureTemplate(uuid: string): Promise<StructureTemplate> {
    const fetchedData = (await this.storage.get(this.getTemplateKey(uuid)).toPromise()) as Uint8Array;

    if (!fetchedData) {
      throw Error('Could not find structure template: ' + uuid);
    }

    return StructureTemplate.decode(
      fetchedData
    );
  }

  async setAllStructureTemplates(structureTemplates: IStructureTemplate[]): Promise<void> {
    const allUuids = structureTemplates.map((structureTemplate: IStructureTemplate): string => {
      return structureTemplate.name as string;
    });

    await this.setAllTemplateKeys(allUuids);

    for (const structureTemplate of structureTemplates) {
      await this.setStructureTemplate(structureTemplate as StructureTemplate);
    }
  }

  async setStructureTemplate(structureTemplate: StructureTemplate): Promise<void> {
    await this.storage.set(
      this.getTemplateKey(structureTemplate.name),
      StructureTemplate.encode(structureTemplate).finish()
    ).toPromise();
  }

  // Creates a new structure template, and returns the uuid of the new entry
  async createNewStructureTemplate(): Promise<string> {
    const uuid = uuidv4();

    const newStructureTemplate = StructureTemplate.create({
      name: uuid
    });

    await this.setStructureTemplate(newStructureTemplate);

    const allUuids = await this.getAllTemplateKeys();
    allUuids.push(uuid);
    await this.setAllTemplateKeys(allUuids);

    return uuid;
  }

}
