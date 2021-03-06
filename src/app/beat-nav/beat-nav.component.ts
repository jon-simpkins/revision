import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BeatMapView} from '../beats.service';
import {getDurationStr} from '../duration-helpers';

@Component({
  selector: 'app-beat-nav',
  templateUrl: './beat-nav.component.html',
  styleUrls: ['./beat-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeatNavComponent implements OnInit {

  @Input()
  selectedBeatId = '';

  @Input()
  beatListView: BeatMapView[] = [];

  @Input()
  collapsed = false;

  @Output() newBeat = new EventEmitter<void>();

  @Output() selectBeat = new EventEmitter<string>();

  @Output() deleteBeat = new EventEmitter<void>();

  @Output() toggleCollapsed = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  canDelete(): boolean {
    return (this.selectedBeatId || '').length > 0;
  }

  formatDurationMs(value: number): string {
    return getDurationStr(value);
  }

  onToggleCollapsed(): void {
    this.toggleCollapsed.emit(!this.collapsed);
  }

  toggleIcon(): string {
    if (this.collapsed) {
      return 'chevron_right';
    }
    return 'chevron_left';
  }
}
