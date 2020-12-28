import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {StructureTemplate} from '../../../protos';
import {ContentChange} from 'ngx-quill/lib/quill-editor.component';
import {DeltaOperation} from 'quill';

export interface StructureTemplateUpdate {
  structureTemplate: StructureTemplate;
  modifiesListView: boolean;
}

const NAME_FIELD_PREFIX = '== Name ==';
const DESC_FIELD_PREFIX = '== Description ==';

@Component({
  selector: 'app-structure-template-details',
  templateUrl: './structure-template-details.component.html',
  styleUrls: ['./structure-template-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StructureTemplateDetailsComponent implements OnChanges {
  @Input()
  structureTemplate: StructureTemplate|null = null;

  @Output() templateUpdated = new EventEmitter<StructureTemplateUpdate>();

  quillContent: DeltaOperation[] = [];
  errorMessage = '';
  lastStructureTemplateInput: StructureTemplate|null = null;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnChanges(): void {
    if (this.areStructureTemplatesEqual(this.lastStructureTemplateInput, this.structureTemplate)) {
      // No reason to update
      return;
    }

    this.lastStructureTemplateInput = this.structureTemplate;
    this.refreshQuillContent();
  }

  refreshQuillContent(): void {
    this.quillContent = [];

    this.quillContent.push(
      {
        insert: NAME_FIELD_PREFIX + '\n',
        attributes: {
          bold: true
        },
      }
    );

    this.quillContent.push({
      insert: this.structureTemplate?.name + '\n',
      attributes: {},
    });

    this.quillContent.push({
      insert: '\n' + DESC_FIELD_PREFIX + '\n',
      attributes: {
        bold: true
      },
    });

    this.quillContent.push({
      insert: this.structureTemplate?.description + '\n',
      attributes: {},
    });
  }

  isEmpty(): boolean {
    return this.structureTemplate == null;
  }

  onContentChanged(contentChangeEvent: ContentChange): void {
    this.parseContent(contentChangeEvent.text + '\n');
  }

  parseContent(newContent: string): void {

    // split up based on field names
    const rx = RegExp('==([^=]+)==\n([^=]+)\n', 'gm');

    const fieldMap: Map<string, string> = new Map();

    let match;
    // tslint:disable-next-line:no-conditional-assignment
    while ((match = rx.exec(newContent)) !== null) {
      const key = match[1].trim();
      const value = match[2];
      fieldMap.set(key, value);
    }

    this.errorMessage = this.getErrorMessage(fieldMap);
    if (this.errorMessage !== '') {
      this.ref.markForCheck();
      return;
    }

    const newStructureTemplate = StructureTemplate.create({
      id: this.structureTemplate?.id,
      name: fieldMap.get('Name')?.trim(),
      description: fieldMap.get('Description')?.trim()
    });

    if (this.areStructureTemplatesEqual(newStructureTemplate, this.structureTemplate)) {
      // No meaningful difference
      return;
    }

    this.lastStructureTemplateInput = newStructureTemplate;

    this.templateUpdated.emit({
      structureTemplate: newStructureTemplate,
      modifiesListView: newStructureTemplate.name !== this.structureTemplate?.name
    } as StructureTemplateUpdate);

    this.ref.markForCheck();
  }

  getErrorMessage(fieldMap: Map<string, string>): string {
    if (!fieldMap.has('Name')) {
      return 'Missing "Name" field';
    }

    if (fieldMap.get('Name')?.trim().length === 0) {
      return '"Name" cannot be empty';
    }

    if (!fieldMap.has('Description')) {
      return 'Missing "Description" field';
    }

    return '';
  }

  areStructureTemplatesEqual(one: StructureTemplate|null, two: StructureTemplate|null): boolean {
    if (one?.name !== two?.name) {
      return false;
    }

    if (one?.id !== two?.id) {
      return false;
    }

    if (one?.description !== two?.description) {
      return false;
    }

    return true;
  }

  repair(): void {
    this.refreshQuillContent();
  }
}
