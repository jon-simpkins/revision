import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MonolithicDataService} from '../monolithic-data.service';
import fileDownload from 'js-file-download';

// Page component for the "Import/Export" page
@Component({
  selector: 'app-import-export-page',
  templateUrl: './import-export-page.component.html',
  styleUrls: ['./import-export-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportExportPageComponent implements OnInit {
  fetchedValue = 'Not yet fetched';
  uploadedTextData = 'Not uploaded yet';

  constructor(private monolithicDataService: MonolithicDataService, private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
  }

  onSetValueClick(): void {
    this.monolithicDataService.setExampleValue(
      Date.now().toString(),
      () => {});
  }

  onClearClick(): void {
    this.monolithicDataService.clear(() => {});
  }

  onCheckClick(): void {
    this.monolithicDataService.getExampleValue((value) => {
      this.fetchedValue = value;
      this.ref.markForCheck();
    });
  }

  onDownloadClick(): void {
    const myData = 'This is my data: ' + Date.now();

    fileDownload(myData, 'example.csv');
  }

  onUpload(event: any): void {
    const file: File = event.target.files[0];

    file.text().then((data) => {
      this.uploadedTextData = data;
      this.ref.markForCheck();
    });
  }
}
