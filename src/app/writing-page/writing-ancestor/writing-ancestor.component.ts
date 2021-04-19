import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {BeatMapView} from '../../beats.service';

@Component({
  selector: 'app-writing-ancestor',
  templateUrl: './writing-ancestor.component.html',
  styleUrls: ['./writing-ancestor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WritingAncestorComponent implements OnInit, OnChanges {

  @Input()
  ancestorView: BeatMapView[][] = [];

  @Output() showPreview = new EventEmitter<string>();

  constructor(private ref: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.ref.markForCheck();
  }

  ngOnChanges(): void {
    this.ref.markForCheck();
  }

  select(id: string): void {
    this.showPreview.emit(id);
  }
}
