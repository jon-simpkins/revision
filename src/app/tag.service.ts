import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {StorageService} from './storage.service';
import {ITag, Tag} from '../protos';

// Minimal details about a template to show in list view
export interface TagListView {
  id: string;
  name: string;
}

const ALL_TAG_LIST_KEY = 'allTagList';
const TAG_KEY_PREFIX = 'tag-';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private storageService: StorageService) { }

  async getAllTags(): Promise<Tag[]> {
    const allEntries = await this.getAllTagsListView();

    const allTags: Tag[] = [];

    for (const entry of allEntries) {
      const fetchedTag = await this.getTag(entry.id);
      if (fetchedTag != null) {
        allTags.push(
          fetchedTag
        );
      }
    }

    return allTags;
  }

  async getAllTagsListView(): Promise<TagListView[]> {
    return (await this.storageService.get(ALL_TAG_LIST_KEY) || []) as TagListView[];
  }

  getTagKey(uuid: string): string {
    return TAG_KEY_PREFIX + uuid;
  }

  async getTag(uuid: string): Promise<Tag|null> {
    const fetchedData = (await this.storageService.get(this.getTagKey(uuid))) as Uint8Array;

    if (!fetchedData) {
      console.error('Could not find structure template: ' + uuid);
      return null;
    }

    return Tag.decode(
      fetchedData
    );
  }

  subscribeToTagListView(handler: (newTagListView: TagListView[]) => void): string {
    return this.storageService.generateSubscription(ALL_TAG_LIST_KEY, (fetchedValue) => {
      handler((fetchedValue || []) as TagListView[]);
    });
  }

  subscribeToTag(tagId: string, handler: (newTemplate: Tag) => void): string {
    return this.storageService.generateSubscription(this.getTagKey(tagId), (fetchedValue) => {
      handler(
        Tag.decode(
          fetchedValue as Uint8Array
        )
      );
    });
  }

  async deleteTemplate(tagId: string): Promise<void> {
    await this.storageService.delete(
      this.getTagKey(tagId)
    );

    const listViewEligible = (await this.getAllTagsListView())
      .filter((tagListView) => {
        return tagListView.id !== tagId;
      });

    await this.setAllTagsListView(listViewEligible);
  }

  cancelSubscription(subscription: string): void {
    this.storageService.cancelSubscription(subscription);
  }

  async setAllTagsListView(tags: ITag[]): Promise<void> {
    const listView = tags.map((tag: ITag) => {
      return {
        id: tag.id,
        name: tag.name,
      } as TagListView;
    });

    await this.storageService.set(ALL_TAG_LIST_KEY, listView, true);
  }

  async refreshAllTagsListView(): Promise<void> {
    const allTags = await this.getAllTags();

    await this.setAllTagsListView(
      allTags
    );
  }

  async setAllTags(tags: ITag[]): Promise<void> {
    await this.setAllTagsListView(tags);

    for (const tag of tags) {
      await this.setTag(tag as Tag);
    }
  }

  async setTag(tag: Tag, affectsListView: boolean = false): Promise<void> {
    await this.storageService.set(
      this.getTagKey(tag.id),
      Tag.encode(tag).finish(),
      true
    );

    if (affectsListView) {
      await this.refreshAllTagsListView();
    }
  }

  // Creates a new structure template, and returns the uuid of the new entry
  async createNewTag(): Promise<string> {
    const uuid = uuidv4();

    const newTag = Tag.create({
      id: uuid,
      name: 'My new tag',
      description: 'Description goes here',
      hasNumericValue: true,
    });

    await this.setTag(newTag);

    const allTags = await this.getAllTags();
    allTags.push(newTag);

    await this.setAllTagsListView(allTags);

    return uuid;
  }
}
