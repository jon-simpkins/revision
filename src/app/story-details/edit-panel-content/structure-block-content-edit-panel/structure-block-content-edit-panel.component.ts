import {Component, Input, OnInit} from '@angular/core';
import EditContext from '../../../../types/EditContext';
import {StructureBlockContent} from '../../../../types/ScrapTypes/StructureBlockContent';

import {TARGET_CONTENT_TYPE} from '../../../../types/ScrapTypes/ScrapContent';
import {StoryService} from '../../../story.service';
import ViewOption, {ViewOptionGenerators} from '../../../../types/ViewOption';
import BlockContentRefOption from '../../../../types/EditContexts/BlockContentRefOption';

@Component({
  selector: 'structure-block-content-edit-panel',
  templateUrl: './structure-block-content-edit-panel.component.html',
  styleUrls: ['./structure-block-content-edit-panel.component.scss']
})
export class StructureBlockContentEditPanelComponent implements OnInit {

  @Input() editContent: StructureBlockContent;
  @Input() editContext: EditContext;
  currentOption: BlockContentRefOption;

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

  constructor(private storyService: StoryService) {}

  ngOnInit() {
    this.updateCurrentOption();
  }

  updateTargetType(newType: TARGET_CONTENT_TYPE) {
    this.editContent.targetType = newType;
  }

  updateTargetId(newId: string) {
    this.editContent.targetRefId = newId;

    this.updateCurrentOption();
  }

  updateCurrentOption() {
    this.currentOption = this.editContext.contentRefOptions.filter(option => {
      return option.refId === this.editContent.targetRefId && option.type === this.editContent.targetType;
    })[0];
  }

  previewCurrentOption() {
    let viewOption;
    if (this.currentOption.type === TARGET_CONTENT_TYPE.SCRIPT_SCRAP) {
      viewOption = new ViewOption(ViewOptionGenerators.INDIVIDUAL_SCRIPT_SCRAP, null, null, this.currentOption.refId);
    } else {
      viewOption = new ViewOption(ViewOptionGenerators.STORY_STRUCTURE, null, null, this.currentOption.refId);
    }

    this.storyService.setViewContent(viewOption);
  }

}
