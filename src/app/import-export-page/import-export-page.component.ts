import { Component, OnInit } from '@angular/core';
import {MonolithicDataService} from '../monolithic-data.service';

// Page component for the "Import/Export" page
@Component({
  selector: 'app-import-export-page',
  templateUrl: './import-export-page.component.html',
  styleUrls: ['./import-export-page.component.scss'],
})
export class ImportExportPageComponent implements OnInit {

  private monolithicDataService: MonolithicDataService;

  constructor(monolithicDataService: MonolithicDataService) {
    this.monolithicDataService = monolithicDataService;
  }

  ngOnInit(): void {
    this.monolithicDataService.exampleMethod();
  }

}
