import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

const structureMode = 'structureMode';
const tagMode = 'tagMode';

@Component({
  selector: 'app-writing-sidebar',
  templateUrl: './writing-sidebar.component.html',
  styleUrls: ['./writing-sidebar.component.scss']
})
export class WritingSidebarComponent implements OnInit {

  currentMode = '';

  isCollapsed = false;

  structureSelected = false;
  tagSelected = false;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.selectStructure();
  }

  selectStructure(): void {
    this.currentMode = structureMode;
    this.updateButtons();
  }

  selectTag(): void {
    this.currentMode = tagMode;
    this.updateButtons();
  }

  updateButtons(): void {
    this.structureSelected = this.isStructure();
    this.tagSelected = this.isTag();

    this.ref.markForCheck();
  }

  isStructure(): boolean {
    return this.currentMode === structureMode;
  }

  isTag(): boolean {
    return this.currentMode === tagMode;
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
