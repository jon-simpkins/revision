import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {StructureTemplateListView, StructureTemplateService} from '../structure-template.service';
import {StructureTemplate} from '../../protos';
import {StructureTemplateUpdate} from './structure-template-details/structure-template-details.component';

@Component({
  selector: 'app-structure-template-page',
  templateUrl: './structure-template-page.component.html',
  styleUrls: ['./structure-template-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StructureTemplatePageComponent implements OnInit, OnDestroy {

  selectedTemplateUuid = '';

  selectedTemplate: StructureTemplate|null = null;

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
    await this.selectTemplate(this.selectedTemplateUuid);
  }

  async selectTemplate(newId: string): Promise<void> {
    this.selectedTemplateUuid = newId;

    this.selectedTemplate = await this.structureTemplateService.getStructureTemplate(newId);

    this.ref.markForCheck();
  }

  async onTemplateChanges(newValue: StructureTemplateUpdate): Promise<void> {
    await this.structureTemplateService.setStructureTemplate(newValue.structureTemplate, newValue.modifiesListView);
  }
}
