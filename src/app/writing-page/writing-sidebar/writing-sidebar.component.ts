import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BeatMapView} from '../../beats.service';

const structureMode = 'structureMode';
const tagMode = 'tagMode';

@Component({
  selector: 'app-writing-sidebar',
  templateUrl: './writing-sidebar.component.html',
  styleUrls: ['./writing-sidebar.component.scss']
})
export class WritingSidebarComponent implements OnInit {

  @Input()
  editingBeatId = '';

  @Input()
  previewBeatId = '';

  @Output() showPreview = new EventEmitter<string>();

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

  selectBeat(id: string): void {
    this.showPreview.emit(id);
  }
}
