import { Component } from '@angular/core';
import {ContentEditService} from '../../services/content-edit.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'edit-header',
  templateUrl: './edit-header.component.html',
  styleUrls: ['./edit-header.component.scss']
})
export class EditHeaderComponent {

  constructor(public contentEditService: ContentEditService, private snackBar: MatSnackBar) { }

  acceptEdit() {
    this.contentEditService.acceptEdit((errMsg: string) => {
      this.snackBar.open(errMsg, null, {
        duration: 2000
      });
    });
  }
}
