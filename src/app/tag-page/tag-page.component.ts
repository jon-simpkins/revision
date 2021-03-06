import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {TagListView, TagService} from '../tag.service';
import {Tag} from '../../protos';
import {TagUpdate} from './tag-details/tag-details.component';
import {ActivatedRoute, Router} from '@angular/router';

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

  constructor(private tagService: TagService, private ref: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Read the selected beat ID from the route
    this.route.params.subscribe(async (value) => {
      const selectedId = value.id as string;
      if (this.selectedTagId !== selectedId && !!selectedId) {
        await this.selectTag(selectedId);
      }
    });

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

    await this.router.navigate(['/tags', { id: tagId }]);

    this.ref.markForCheck();
  }

  async deleteTag(): Promise<void> {
    const tagToDelete = this.selectedTagId;
    this.selectedTag = null;
    await this.selectTag('');
    await this.tagService.deleteTag(tagToDelete);
  }

  async onTagChanges(newValue: TagUpdate): Promise<void> {
    await this.tagService.setTag(newValue.tag, newValue.modifiesListView);
  }
}
