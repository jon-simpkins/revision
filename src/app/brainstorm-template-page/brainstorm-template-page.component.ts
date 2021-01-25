import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BrainstormTemplateListView, BrainstormTemplateService} from '../brainstorm-template.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BrainstormTemplate, StructureTemplate} from '../../protos';
import {TagUpdate} from '../tag-page/tag-details/tag-details.component';
import {BrainstormTemplateUpdate} from './brainstorm-template-details/brainstorm-template-details.component';

@Component({
  selector: 'app-brainstorm-template-page',
  templateUrl: './brainstorm-template-page.component.html',
  styleUrls: ['./brainstorm-template-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrainstormTemplatePageComponent implements OnInit, OnDestroy {

  selectedTemplateUuid = '';

  selectedTemplate: BrainstormTemplate|null = null;
  selectedTemplateSubscription = '';

  brainstormTemplateListView: BrainstormTemplateListView[] = [];
  brainstormTemplateListViewSubscription = '';

  constructor(private brainstormTemplateService: BrainstormTemplateService, private ref: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Read the selected template ID from the route
    this.route.params.subscribe(async (value) => {
      const selectedId = value.id as string;
      if (this.selectedTemplateUuid !== selectedId && !!selectedId) {
        await this.selectTemplate(selectedId);
      }
    });

    this.brainstormTemplateListViewSubscription = this.brainstormTemplateService.subscribeToTemplateListView((newValue) => {
      this.brainstormTemplateListView = newValue;
      this.ref.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.brainstormTemplateService.cancelSubscription(this.selectedTemplateSubscription);
    this.brainstormTemplateService.cancelSubscription(this.brainstormTemplateListViewSubscription);
  }


  async newTemplate(): Promise<void> {
    this.selectedTemplateUuid = await this.brainstormTemplateService.createNewBrainstormTemplate();
    await this.selectTemplate(this.selectedTemplateUuid);
  }

  async deleteTemplate(): Promise<void> {
    await this.brainstormTemplateService.deleteTemplate(this.selectedTemplateUuid);
    this.selectedTemplateUuid = '';
    this.selectedTemplate = null;
    this.ref.markForCheck();
  }

  async selectTemplate(newId: string): Promise<void> {
    this.selectedTemplateUuid = newId;

    // Clear old subscription, setup new one
    this.brainstormTemplateService.cancelSubscription(this.selectedTemplateSubscription);
    this.selectedTemplateSubscription = this.brainstormTemplateService.subscribeToTemplate(newId, (newValue) => {
      this.selectedTemplate = newValue;
      this.ref.markForCheck();
    });

    await this.router.navigate(['/brainstorm-templates', { id: newId }]);

    this.ref.markForCheck();
  }

  async generateStandardTemplates(): Promise<void> {
    const themeTemplateId = await this.brainstormTemplateService.createNewBrainstormTemplate();

    const themeTemplate = {
      id: themeTemplateId,
      label: 'Theme',
      template: 'What is the aspect of the theme depicted in this beat? What thematic statement does this contribute?'
    } as BrainstormTemplate;

    await this.brainstormTemplateService.setBrainstormTemplate(themeTemplate, true);
  }

  async onBrainstormTemplateUpdate(newValue: BrainstormTemplateUpdate): Promise<void> {
    await this.brainstormTemplateService.setBrainstormTemplate(newValue.brainstormTemplate, newValue.modifiesListView);
  }
}
