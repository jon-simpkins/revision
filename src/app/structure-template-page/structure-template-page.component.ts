import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-structure-template-page',
  templateUrl: './structure-template-page.component.html',
  styleUrls: ['./structure-template-page.component.scss']
})
export class StructureTemplatePageComponent implements OnInit {

  uuid = '';

  constructor() { }

  ngOnInit(): void {
  }

  generateUuid(): void {
    this.uuid = uuidv4();
  }
}
