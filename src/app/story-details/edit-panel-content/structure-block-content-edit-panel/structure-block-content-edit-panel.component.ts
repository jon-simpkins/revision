import {Component, Input, OnInit} from '@angular/core';
import EditContext from '../../../../types/EditContext';
import {StructureBlockContent} from '../../../../types/ScrapTypes/StructureBlockContent';

import {TARGET_CONTENT_TYPE} from '../../../../types/ScrapTypes/ScrapContent';

@Component({
  selector: 'structure-block-content-edit-panel',
  templateUrl: './structure-block-content-edit-panel.component.html',
  styleUrls: ['./structure-block-content-edit-panel.component.scss']
})
export class StructureBlockContentEditPanelComponent implements OnInit {

  @Input() editContent: StructureBlockContent;
  @Input() editContext: EditContext;

  contentTypes = [
    {
      label: 'Script Scrap',
      value: TARGET_CONTENT_TYPE.SCRIPT_SCRAP
    },
    {
      label: 'Sub-Structure',
      value: TARGET_CONTENT_TYPE.SUB_STRUCTURE
    },
  ];

  constructor() {}

  ngOnInit() {
  }

  updateTargetType(newType: TARGET_CONTENT_TYPE) {
    this.editContent.targetType = newType;
  }

  updateTargetId(newId: string) {
    this.editContent.targetRefId = newId;
  }

}
