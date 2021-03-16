import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-writing-page',
  templateUrl: './writing-page.component.html',
  styleUrls: ['./writing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WritingPageComponent implements OnInit {

  constructor(protected ref: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

}
