import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {TagListView, TagService} from '../tag.service';
import {Tag} from '../../protos';

@Component({
  selector: 'app-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagPageComponent implements OnInit, OnDestroy {

  selectedTagId = '';

  selectedTag: Tag|null = null;
  selectedTagSubscription = '';

  tagListView: TagListView[] = [];
  tagListViewSubscription = '';

  constructor(private tagService: TagService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.tagListViewSubscription = this.tagService.subscribeToTagListView((newValue) => {
      this.tagListView = newValue;
      this.ref.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.tagService.cancelSubscription(this.tagListViewSubscription);
    this.tagService.cancelSubscription(this.selectedTagSubscription);
  }

  async newTag(): Promise<void> {
    await this.selectTag(
      await this.tagService.createNewTag()
    );
  }

  async selectTag(tagId: string): Promise<void> {
    this.selectedTagId = tagId;

    // Clear old subscription setup new one
    this.tagService.cancelSubscription(this.selectedTagSubscription);
    if (!!tagId.length) {
      this.selectedTagSubscription = this.tagService.subscribeToTag(tagId, (newValue) => {
        this.selectedTag = newValue;
        this.ref.markForCheck();
      });
    }

    this.ref.markForCheck();
  }

  async deleteTag(): Promise<void> {
    const tagToDelete = this.selectedTagId;
    this.selectedTag = null;
    await this.selectTag('');
    await this.tagService.deleteTag(tagToDelete);
  }

}
