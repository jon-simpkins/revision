import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {TagListView, TagService} from '../tag.service';

@Component({
  selector: 'app-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagPageComponent implements OnInit, OnDestroy {

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
  }

  async newTag(): Promise<void> {
    const newUuid = await this.tagService.createNewTag();
  }

}
