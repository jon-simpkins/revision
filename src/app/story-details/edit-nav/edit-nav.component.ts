import { Component, OnInit } from '@angular/core';
import {ContentEditService} from '../../content-edit.service';
import {ScreenService} from '../../screen.service';

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
