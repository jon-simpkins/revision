import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {StructureTemplateListView, StructureTemplateService} from '../structure-template.service';
import {StructureTemplate} from '../../protos';
import {StructureTemplateUpdate} from './structure-template-details/structure-template-details.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-structure-template-page',
  templateUrl: './structure-template-page.component.html',
  styleUrls: ['./structure-template-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StructureTemplatePageComponent implements OnInit, OnDestroy {

  selectedTemplateUuid = '';

  selectedTemplate: StructureTemplate|null = null;
  selectedTemplateSubscription = '';

  structureTemplateListView: StructureTemplateListView[] = [];
  structureTemplateListViewSubscription = '';

  constructor(private structureTemplateService: StructureTemplateService, private ref: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Read the selected template ID from the route
    this.route.params.subscribe(async (value) => {
      const selectedId = value.id as string;
      if (this.selectedTemplateUuid !== selectedId && !!selectedId) {
        await this.selectTemplate(selectedId);
      }
    });

    this.structureTemplateListViewSubscription = this.structureTemplateService.subscribeToTemplateListView((newValue) => {
      this.structureTemplateListView = newValue;
      this.ref.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.structureTemplateService.cancelSubscription(this.selectedTemplateSubscription);
    this.structureTemplateService.cancelSubscription(this.structureTemplateListViewSubscription);
  }

  async newTemplate(): Promise<void> {
    this.selectedTemplateUuid = await this.structureTemplateService.createNewStructureTemplate();
    await this.selectTemplate(this.selectedTemplateUuid);
  }

  async deleteTemplate(): Promise<void> {
    await this.structureTemplateService.deleteTemplate(this.selectedTemplateUuid);
    this.selectedTemplateUuid = '';
    this.selectedTemplate = null;
    this.ref.markForCheck();
  }

  async selectTemplate(newId: string): Promise<void> {
    this.selectedTemplateUuid = newId;

    // Clear old subscription, setup new one
    this.structureTemplateService.cancelSubscription(this.selectedTemplateSubscription);
    this.selectedTemplateSubscription = this.structureTemplateService.subscribeToTemplate(newId, (newValue) => {
      this.selectedTemplate = newValue;
      this.ref.markForCheck();
    });

    await this.router.navigate(['/structure-templates', { id: newId }]);

    this.ref.markForCheck();
  }

  async onTemplateChanges(newValue: StructureTemplateUpdate): Promise<void> {
    await this.structureTemplateService.setStructureTemplate(newValue.structureTemplate, newValue.modifiesListView);
  }
}
