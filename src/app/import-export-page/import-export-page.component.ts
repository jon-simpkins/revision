import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MonolithicDataService} from '../monolithic-data.service';
import fileDownload from 'js-file-download';
import {WritingWorkspace} from '../../protos';

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

  async onDownloadClick(): Promise<void> {
    const workspace = await this.monolithicDataService.saveWorkspace();
    const filename = workspace.name + '.write';

    fileDownload(
      WritingWorkspace.encode(workspace).finish(),
      filename
    );
  }

  async onUpload(event: any): Promise<void> {
    const file: File = event.target.files[0];

    const fileData = await file.text();

    const uint8Array = new TextEncoder().encode(fileData);
    const workspace = WritingWorkspace.decode(uint8Array);

    this.uploadedTextData = workspace.name;

    await this.monolithicDataService.loadWorkspace(workspace);

    this.ref.markForCheck();
  }
}
