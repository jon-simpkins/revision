import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {StructureTemplateListView, StructureTemplateService} from '../structure-template.service';

@Component({
  selector: 'app-structure-template-page',
  templateUrl: './structure-template-page.component.html',
  styleUrls: ['./structure-template-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StructureTemplatePageComponent implements OnInit, OnDestroy {

  selectedTemplateUuid = '';
  structureTemplateListView: StructureTemplateListView[] = [];
  structureTemplateListViewSubscription = '';

  constructor(private structureTemplateService: StructureTemplateService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.structureTemplateListViewSubscription = this.structureTemplateService.subscribeToTemplateListView((newValue) => {
      this.structureTemplateListView = newValue;
      this.ref.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.structureTemplateService.cancelSubscriptionToTemplateListView(this.structureTemplateListViewSubscription);
  }

  async newTemplate(): Promise<void> {
    this.selectedTemplateUuid = await this.structureTemplateService.createNewStructureTemplate();
    this.selectTemplate(this.selectedTemplateUuid);
  }

  selectTemplate(newId: string): void {
    this.selectedTemplateUuid = newId;
    this.ref.markForCheck();
  }
}
