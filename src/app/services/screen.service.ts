import {ApplicationRef, Injectable} from '@angular/core';
import EditOption from '../../types/EditOption';
import ViewContentBlock from '../story-details/view-panel-content/ViewContentBlock';
import ViewOption from '../../types/ViewOption';
import {ScrapPrototype} from '../../types/Scrap';

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
  prevViewOptions: ViewOption[] = []; // For back-button functionality
  nextViewOptions: ViewOption[] = []; // For forward-button functionality
  viewContent: ViewContentBlock[] = [];
  viewOptions = [];
  editOptions: EditOption[] = [];
  editOptionsByPrototype = [];

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

    const unfinishedByPrototype = new Map<ScrapPrototype, any>();
    let unfinishedCount = 0;
    this.editOptions.forEach(option => {
      if (option.iterations) {
        return;
      }
      unfinishedCount += 1;

      if (!unfinishedByPrototype.has(option.prototype)) {
        unfinishedByPrototype.set(
          option.prototype,
          {
            label: option.getHeader(),
            count: 0,
            prototype: option.prototype
          }
        );
      }

      unfinishedByPrototype.get(option.prototype).count += 1;
    });

    this.editOptionsByPrototype = [];
    unfinishedByPrototype.forEach(option => {
      this.editOptionsByPrototype.push(option);
    });

    this.editOptionsByPrototype = this.editOptionsByPrototype.sort((a: any, b: any) => {
      return b.count - a.count;
    });

    this.editOptionsByPrototype.unshift({
      label: 'Any',
      count: unfinishedCount,
      prototype: null
    });
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

  setViewOption(viewOption: ViewOption) {
    this.showViewNav = false; // Hide nav on select
    this.prevViewOptions.push(this.currentViewOption);
    this.nextViewOptions = [];
    this.currentViewOption = viewOption;
  }

  navigateViewBack() {
    this.nextViewOptions.push(this.currentViewOption);
    this.currentViewOption = this.prevViewOptions.pop();
  }

  navigateViewForward() {
    this.prevViewOptions.push(this.currentViewOption);
    this.currentViewOption = this.nextViewOptions.pop();
  }

  toggleViewNav() {
    this.showViewNav = !this.showViewNav;
  }

  toggleEditNav() {
    this.showEditNav = !this.showEditNav;
  }

  hideEditNav() {
    this.showEditNav = false;
  }

}
