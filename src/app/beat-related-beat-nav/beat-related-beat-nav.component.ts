import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {BeatMapView} from '../beats.service';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {getDurationStr} from '../duration-helpers';
import {Beat} from '../../protos';

interface BeatDropList {
  id: string;
  label: string;
  items: BeatMapView[];
  listType: BeatSubList;
}

export enum BeatSubList {
  Brainstorm,
  Structure,
}

export interface BeatDropEvent {
  targetList: BeatSubList;
  targetIndex: number;
  sourceList: BeatSubList;
  sourceIndex: number;
}

@Component({
  selector: 'app-beat-related-beat-nav',
  templateUrl: './beat-related-beat-nav.component.html',
  styleUrls: ['./beat-related-beat-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeatRelatedBeatNavComponent implements OnInit, OnChanges {

  @Input()
  selectedBeatId = '';

  @Input()
  brainstormListView: BeatMapView[] = [];

  @Input()
  structureListView: BeatMapView[] = [];

  @Output() newBeat = new EventEmitter<BeatSubList>();

  @Output() selectBeat = new EventEmitter<string>();

  @Output() moveBeat  = new EventEmitter<BeatDropEvent>();

  @Output() deleteBeat = new EventEmitter<void>();

  beatDropLists: BeatDropList[] = [];

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.createDropLists();
  }

  ngOnChanges(): void {
    this.createDropLists();
  }

  private createDropLists(): void {
    this.beatDropLists = [
      {
        id: 'structure-list',
        label: 'Structure',
        items: this.structureListView,
        listType: BeatSubList.Structure,
      } as BeatDropList,
      {
        id: 'brainstorm-list',
        label: 'Brainstorm',
        items: this.brainstormListView,
        listType: BeatSubList.Brainstorm,
      } as BeatDropList,
    ];
    this.ref.markForCheck();
  }

  canDelete(listType: BeatSubList): boolean {
    if (listType === BeatSubList.Structure) {
      return (this.structureListView || []).filter((entry) => entry.id === this.selectedBeatId).length > 0;
    }

    return (this.brainstormListView || []).filter((entry) => entry.id === this.selectedBeatId).length > 0;
  }

  drop(event: CdkDragDrop<BeatMapView[]>): void {
    const targetList = event.container.id;
    const sourceList = event.previousContainer.id;

    const targetIndex = event.currentIndex;
    const sourceIndex = event.previousIndex;

    this.moveBeat.emit({
      sourceList: (sourceList === 'structure-list') ? BeatSubList.Structure : BeatSubList.Brainstorm,
      targetList: (targetList === 'structure-list') ? BeatSubList.Structure : BeatSubList.Brainstorm,
      sourceIndex,
      targetIndex,
    } as BeatDropEvent);
  }

  formatDurationMs(value: number): string {
    return getDurationStr(value);
  }

  formatCompleteness(value: Beat.Completeness): string {
    switch (value) {
      case Beat.Completeness.NOT_STARTED:
        return 'Not Started';
      case Beat.Completeness.BRAINSTORM:
        return 'Brainstorm';
      case Beat.Completeness.INITIAL_DRAFT:
        return 'Initial Draft';
      case Beat.Completeness.POLISHED:
        return 'Polished';
      case Beat.Completeness.FINAL:
        return 'Final';
    }
    return 'Unknown';
  }
}
