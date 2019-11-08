import { Component, OnInit, Input } from '@angular/core';
import {StoryStructure, StructureBlock} from '../../../types/StoryStructure/StoryStructure';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'beat-card-list',
  templateUrl: './beat-card-list.component.html',
  styleUrls: ['./beat-card-list.component.scss']
})
export class BeatCardListComponent implements OnInit {

  @Input() storyStructure: StoryStructure;
  @Input() allowEditSequence: boolean;
  @Input() showHighlight: boolean;
  @Input() allowEditDescriptions: boolean;
  @Input() allowEditTitles: boolean;

  public idPrefix = String(Math.round(Date.now() + (Math.random() * 1000)));

  private _highlightSec: number;
  @Input() set highlightSec(value: number) {
    if (this._highlightSec !== value) {
      this._highlightSec = value;
      this.scrollToCard();
    }
  }

  get highlightSec(): number {
    return this._highlightSec;
  }

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  shouldHighlightCard(idx): boolean {
    if (!this.showHighlight) {
      return false;
    }

    if (this.storyStructure.blocks[idx].startTime > this.highlightSec) {
      return false;
    }

    if (idx + 1 === this.storyStructure.blocks.length) {
      // Last block, highlight it
      return true;
    }

    return (this.highlightSec <= this.storyStructure.blocks[idx + 1].startTime);
  }

  scrollToCard() {
    const containerEl = document.getElementById(`list-${this.idPrefix}`);

    this.storyStructure.blocks.forEach((block, idx) => {
      if (this.shouldHighlightCard(idx)) {

        const cardEl = document.getElementById(`${this.idPrefix}-${idx}`);

        if (containerEl && cardEl) {
          containerEl.scrollTop = cardEl.offsetTop - containerEl.offsetTop - 25;
        }
      }
    });
  }

  handleDoubleClick(cardIdx) {
    const startTime = this.storyStructure.blocks[cardIdx - 1].startTime;
    const endTime = this.storyStructure.getBlockEndSec(cardIdx);
    const currentSplit = this.storyStructure.blocks[cardIdx].startTime;

    const entry = window.prompt(
      `Where should the beat start? ${StructureBlock.convertSecToStr(startTime)} - ${StructureBlock.convertSecToStr(endTime)}`,
      StructureBlock.convertSecToStr(currentSplit)
    ).split(':');

    if (entry.length !== 3) {
      this.snackBar.open('Must be entered in format "hh:mm:ss"', null, {
        duration: 2000
      });
      return;
    }

    const splitSec = (3600 * parseInt(entry[0], 10)) + (60 * parseInt(entry[1], 10)) + parseInt(entry[2], 10);
    if (!splitSec || splitSec < startTime || splitSec > endTime) {
      this.snackBar.open('Time entered is outside of allowed range', null, {
        duration: 2000
      });
      return;
    }

    this.storyStructure.blocks[cardIdx].startTime = splitSec;
  }

}
