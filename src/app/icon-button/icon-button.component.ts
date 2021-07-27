import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {

  @Input()
  disabled = false;

  @Input()
  icon = '';

  @Input()
  selected = false;

  constructor() { }

  ngOnInit(): void {
  }

}
