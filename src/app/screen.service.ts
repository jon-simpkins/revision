import {ApplicationRef, Injectable} from '@angular/core';
import EditOption from '../types/EditOption';
import ViewContentBlock from './story-details/view-panel-content/ViewContentBlock';
import ViewOption from '../types/ViewOption';

// Service to manage the state of "what screen am I on right now" when logged in
@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  showStructureTemplateEditor = false;
  showStoryDetails = false;
  currentViewScrapId: string = null;

  currentDetailsPanelView = 'split';
  showViewNav = false;
  showEditNav = false;

  currentViewOption: ViewOption;
  viewContent: ViewContentBlock[] = [];
  viewOptions = [];
  editOptions: EditOption[] = [];

  constructor() { }

  updateShowStoryDetails(newValue: boolean): void {
    this.showStoryDetails = newValue;
  }

  updateShowStructureTemplateEditor(newValue: boolean): void {
    this.showStructureTemplateEditor = newValue;
  }

  setViewOptions(options: ViewOption[]) {
    this.viewOptions = options;
  }

  setEditOptions(options: EditOption[]) {
    this.editOptions = options;
  }

  setDetailPanelView(newValue) {
    this.currentDetailsPanelView = newValue;

    if (this.currentDetailsPanelView === 'view') {
      this.showEditNav = false;
    }
    if (this.currentDetailsPanelView === 'edit') {
      this.showViewNav = false;
    }
  }

  showViewPanel() {
    return this.currentDetailsPanelView === 'split' || this.currentDetailsPanelView === 'view';
  }

  showEditPanel() {
    return this.currentDetailsPanelView === 'split' || this.currentDetailsPanelView === 'edit';
  }

  toggleViewNav() {
    this.showViewNav = !this.showViewNav;
  }

  toggleEditNav() {
    this.showEditNav = !this.showEditNav;
  }

}
