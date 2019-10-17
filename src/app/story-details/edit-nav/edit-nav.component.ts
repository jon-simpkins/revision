import { Component, OnInit } from '@angular/core';
import {ContentEditService} from '../../services/content-edit.service';
import {ScreenService} from '../../services/screen.service';

@Component({
  selector: 'edit-nav',
  templateUrl: './edit-nav.component.html',
  styleUrls: ['./edit-nav.component.scss']
})
export class EditNavComponent implements OnInit {

  constructor(public contentEditService: ContentEditService, public screenService: ScreenService) { }

  ngOnInit() {
  }

}
