import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {BeatReadView} from '../beats.service';
import {Beat} from '../../protos';
import Completeness = Beat.Completeness;

@Component({
  selector: 'app-read-page-beat',
  templateUrl: './read-page-beat.component.html',
  styleUrls: ['./read-page-beat.component.scss']
})
export class ReadPageBeatComponent implements OnInit {

  isExpanded = false;
  paragraphs: string[] = [];

  @Input()
  beat: BeatReadView|null = null;

  constructor() { }

  ngOnInit(): void {
    this.isExpanded = this.beat?.showExpanded || false;
    this.paragraphs = this.beat?.prose.split('\n') || [];
  }

  toggleExpansion(): void {
    this.isExpanded = !this.isExpanded;
  }

  hasBeat(): boolean {
    return !!this.beat;
  }

  getProse(): string {
    const prose = this.beat?.prose || '';
    return prose.trim();
  }

  getCompletionClass(): string {
    switch (this.beat?.completeness as Completeness) {
      case Completeness.FINAL:
        return 'final';
      case Completeness.POLISHED:
        return 'polished';
      case Completeness.INITIAL_DRAFT:
        return 'initial-draft';
      case Completeness.BRAINSTORM:
        return 'brainstorm';
    }
    return 'not-started';
  }
}
