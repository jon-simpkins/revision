import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {StructureTemplateService} from '../structure-template.service';

@Component({
  selector: 'app-structure-template-page',
  templateUrl: './structure-template-page.component.html',
  styleUrls: ['./structure-template-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StructureTemplatePageComponent implements OnInit {

  uuid = '';

  constructor(private structureTemplateService: StructureTemplateService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  async newTemplate(): Promise<void> {
    this.uuid = await this.structureTemplateService.createNewStructureTemplate();
    this.ref.markForCheck();
  }
}
