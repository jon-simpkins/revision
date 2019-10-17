import { Component } from '@angular/core';
import {HackUpdateService} from './services/hack-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  hackUpdateService: HackUpdateService;

  constructor(hackUpdateService: HackUpdateService) {
    this.hackUpdateService = hackUpdateService;
  }

}
