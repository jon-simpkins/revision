import { Component } from '@angular/core';
import {ContentEditService} from '../../services/content-edit.service';

@Component({
  selector: 'edit-header',
  templateUrl: './edit-header.component.html',
  styleUrls: ['./edit-header.component.scss']
})
export class EditHeaderComponent {

  constructor(public contentEditService: ContentEditService) { }

}
