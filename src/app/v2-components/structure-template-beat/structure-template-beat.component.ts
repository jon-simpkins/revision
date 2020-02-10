import { Component, OnInit, Input } from '@angular/core';
import { PlotTemplate } from 'src/storyStructures';
import { formatMinutesString } from 'src/storyStructures/utils';

@Component({
  selector: 'structure-template-beat',
  templateUrl: './structure-template-beat.component.html',
  styleUrls: ['./structure-template-beat.component.scss']
})
export class StructureTemplateBeatComponent implements OnInit {

  @Input() beatIndex: number;
  @Input() template: PlotTemplate;

  public errorMsg: string = '';

  constructor() {

  }

  ngOnInit() {
  }

  getBeatOneliner(): string {
    return this.template.getBeatOneLiner(this.beatIndex);
  }

  beatInput(e) {
    const newOneLiner = e.target.value;
    this.template.setBeatOneLiner(this.beatIndex, newOneLiner);
  }

  getBeatStart(): string {
    return formatMinutesString(
      this.template.getBeatStartMin(this.beatIndex)
    );
  }

  getBeatEnd(): string {
    return formatMinutesString(
      this.template.getBeatEndMin(this.beatIndex)
    );
  }

  getDuration(): number {
    return this.template.getBeatDurationMin(this.beatIndex);
  }

  parseTimestampString(timestampString: string): { value?: number; err?: string; } {
    const splitTimestamp = timestampString.split(':');
    if (splitTimestamp.length !== 2) {
      return {
        err: 'Timestamp must follow format of "MM:SS"'
      };
    }

    const parsedMin = Number.parseFloat(splitTimestamp[0]);
    const parsedSec = Number.parseFloat(splitTimestamp[1]);
    if (Number.isNaN(parsedMin) || Number.isNaN(parsedSec)) {
      return {
        err: 'Minutes and seconds must be parseable numbers'
      };
    }

    return {
      value: (parsedMin + (parsedSec / 60))
    };
  }

  startEvent(e) {
    const parsedResponse = this.parseTimestampString(e.target.value);
    if (parsedResponse.err) {
      this.errorMsg = parsedResponse.err;
      return;
    }

    this.errorMsg = '';
    this.template.setBeatStartMin(this.beatIndex, parsedResponse.value);
  }

  endEvent(e) {
    const parsedResponse = this.parseTimestampString(e.target.value);
    if (parsedResponse.err) {
      this.errorMsg = parsedResponse.err;
      return;
    }

    this.errorMsg = '';
    this.template.setBeatEndMin(this.beatIndex, parsedResponse.value);
  }

  durationEvent(e) {
    const newDuration = Number.parseFloat(e.target.value);
    if (Number.isNaN(newDuration) || newDuration <= 0) {
      this.errorMsg = 'Duration must be a positive number';
      return;
    }

    this.template.setBeatDurationMin(this.beatIndex, newDuration);
    this.errorMsg = '';
  }

  delete() {
    this.template.deleteBeat(this.beatIndex);
  }

  getBeatDescription() {
    return this.template.beats[this.beatIndex].description || '';
  }

  beatDescriptionInput(e) {
    this.template.beats[this.beatIndex].description = e.target.value;
  }

}
