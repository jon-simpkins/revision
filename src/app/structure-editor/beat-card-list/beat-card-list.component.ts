import { Component, OnInit, Input } from '@angular/core';
import {StoryStructure} from '../../../types/StoryStructure/StoryStructure';

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

  private idPrefix = String(Math.round(Date.now() + (Math.random() * 1000)));

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

  constructor() { }

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

}
