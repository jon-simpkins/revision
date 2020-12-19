import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MonolithicDataService} from '../monolithic-data.service';
import fileDownload from 'js-file-download';
import {WritingWorkspace, WritingWorkspaceMetadata} from '../../protos';

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

  onClearClick(): void {
    this.monolithicDataService.clear(() => {});
  }

  onUpdateNameClick(): void {
    this.monolithicDataService.setWorkspaceName('workspace ' + Date.now().toString()).then(() => {
      // nothing
    });
  }

  onDownloadClick(): void {
    this.monolithicDataService.saveWorkspace((workspace: WritingWorkspace) => {
      const filename = workspace.name + '.write';

      fileDownload(
        WritingWorkspace.encode(workspace).finish(),
        filename
      );
    });
  }

  onUpload(event: any): void {
    const file: File = event.target.files[0];

    file.text().then((data) => {
      const uint8Array = new TextEncoder().encode(data);
      const workspace = WritingWorkspace.decode(uint8Array);

      this.uploadedTextData = workspace.name;

      this.monolithicDataService.loadWorkspace(workspace, () => {
        this.ref.markForCheck();
      });
    });
  }
}
