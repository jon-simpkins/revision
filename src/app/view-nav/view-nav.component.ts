import { Component } from '@angular/core';

import {ScreenService} from '../screen.service';

@Component({
  selector: 'view-nav',
  templateUrl: './view-nav.component.html',
  styleUrls: ['./view-nav.component.scss']
})
export class ViewNavComponent {

  viewOptions = [
    {
      id: 'abc123',
      label: 'Title',
      isSelected: true
    },
    {
      id: 'def456',
      label: 'Logline',
      isSelected: false
    }
  ];

  constructor(public screenService: ScreenService) { }

  selectOption(id) {
    console.log(id);
  }

}
