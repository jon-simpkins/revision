import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Beat} from '../../../protos';

export interface BeatMetadataUpdate {
  updatedBeat: Beat;
  modifiesListView: boolean;
}

@Component({
  selector: 'app-writing-metadata',
  templateUrl: './writing-metadata.component.html',
  styleUrls: ['./writing-metadata.component.scss']
})
export class WritingMetadataComponent implements OnInit {

  @Input()
  editingBeat: Beat = new Beat();

  @Output() beatMeatadataUpdates = new EventEmitter<BeatMetadataUpdate>();

  constructor() { }

  ngOnInit(): void {
  }

  onSynopsisChange(event: any): void {
    const newSynopsis = event.target.value;

    const updatedBeat = this.editingBeat;
    updatedBeat.synopsis = newSynopsis;

    this.beatMeatadataUpdates.emit({
      updatedBeat,
      modifiesListView: true,
    } as BeatMetadataUpdate);
  }

}
