import { Component } from '@angular/core';

import {ScreenService} from '../screen.service';

@Component({
  selector: 'view-nav',
  templateUrl: './view-nav.component.html',
  styleUrls: ['./view-nav.component.scss']
})
export class ViewNavComponent {

  constructor(public screenService: ScreenService) { }

}
