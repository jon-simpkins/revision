import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {StructureTemplate} from '../../../protos';
import {ContentChange} from 'ngx-quill/lib/quill-editor.component';
import {DeltaOperation} from 'quill';
import StructureTemplateBeat = StructureTemplate.StructureTemplateBeat;

export interface StructureTemplateUpdate {
  structureTemplate: StructureTemplate;
  modifiesListView: boolean;
}

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
      getQuillHeader('Name')
    );

    this.quillContent.push({
      insert: this.structureTemplate?.name + '\n',
      attributes: {},
    });

    this.quillContent.push(
      getQuillHeader('Description')
    );

    this.quillContent.push({
      insert: this.structureTemplate?.description + '\n',
      attributes: {},
    });

    this.quillContent.push(
      getQuillHeader('Beats')
    );

    if (!!this.structureTemplate?.beats) {
      const beats = this.structureTemplate.beats;
      for (let i = 0; i < beats.length; i++) {

        this.quillContent.push(
          getQuillSubHeader('Description')
        );

        this.quillContent.push({
          insert: beats[i].description + '\n',
          attributes: {},
        });

        this.quillContent.push(
          getQuillSubHeader('Duration')
        );

        this.quillContent.push({
          insert: beats[i].intendedDurationMs + '\n',
          attributes: {},
        });

        if (i + 1 < beats.length) {
          this.quillContent.push(
            getQuillSeparator()
          );
        }
      }
    }
    this.ref.markForCheck();
  }

  isEmpty(): boolean {
    return this.structureTemplate == null;
  }

  onContentChanged(contentChangeEvent: ContentChange): void {
    this.parseContent(contentChangeEvent.text + '\n');
  }

  parseContent(newContent: string): void {

    const fieldMap = parseFields(newContent, false);

    let parsedBeats: Map<string, string>[] = [];
    if (fieldMap.has('Beats')) {
      parsedBeats = splitRepeatedFields(fieldMap.get('Beats') || '')
        .map((beatText) => {
        return parseFields(beatText, true);
      }).filter(Boolean);
    }

    this.errorMessage = this.getErrorMessage(fieldMap, parsedBeats);
    if (this.errorMessage !== '') {
      this.ref.markForCheck();
      return;
    }

    const newStructureTemplate = StructureTemplate.create({
      id: this.structureTemplate?.id,
      name: fieldMap.get('Name'),
      description: fieldMap.get('Description'),
      beats: parsedBeats.map((beatMap) => {
        return StructureTemplateBeat.create({
          description: beatMap.get('Description'),
          intendedDurationMs: parseInt(beatMap.get('Duration') || '', 10)
        });
      })
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

  getErrorMessage(fieldMap: Map<string, string>, parsedBeats: Map<string, string>[]): string {
    if (!fieldMap.has('Name')) {
      return 'Missing "Name" field';
    }

    if (fieldMap.get('Name')?.trim().length === 0) {
      return '"Name" cannot be empty';
    }

    if (!fieldMap.has('Description')) {
      return 'Missing "Description" field';
    }

    for (const beat of parsedBeats) {
      if (!beat.has('Description')) {
        return 'Beat missing "Description" field';
      }

      if (!beat.has('Duration')) {
        return 'Beat missing "Duration" field';
      }

      if (! parseInt(beat.get('Duration')?.trim() || '', 10)) {
        return 'Cannot parse "Duration" value to integer';
      }
    }

    return '';
  }

  areStructureTemplatesEqual(one: StructureTemplate|null, two: StructureTemplate|null): boolean {
    if (one == null && two == null) {
      return true;
    }

    if (one == null || two == null) {
      return false;
    }

    if (one.name !== two.name) {
      return false;
    }

    if (one.id !== two.id) {
      return false;
    }

    if (one.description !== two.description) {
      return false;
    }

    if (one.beats.length !== two.beats.length) {
      return false;
    }

    const beatsLength = one.beats.length;
    for (let i = 0; i < beatsLength; i++) {
      if (one.beats[i].description !== two.beats[i].description) {
        return false;
      }
      if (one.beats[i].intendedDurationMs !== two.beats[i].intendedDurationMs) {
        return false;
      }
    }

    return true;
  }

  repair(): void {
    this.refreshQuillContent();
  }

  addBeat(): void {
    this.structureTemplate?.beats.push(
      StructureTemplateBeat.create({
        description: 'My new beat',
        intendedDurationMs: 12
      })
    );

    this.templateUpdated.emit({
      structureTemplate: this.structureTemplate,
      modifiesListView: false
    } as StructureTemplateUpdate);
    this.refreshQuillContent();
  }
}

function parseFields(raw: string, isSubfields: boolean): Map<string, string> {
  const regexStr = isSubfields
    ? '--([^-]+)--\n([^-]+)'
    : '==([^=]+)==\n([^=]+)';

  const rx = RegExp(regexStr, 'gm');

  const fieldMap: Map<string, string> = new Map();

  let match;
  // tslint:disable-next-line:no-conditional-assignment
  while ((match = rx.exec(raw)) !== null) {
    const key = match[1].trim();
    const value = match[2].trim();
    fieldMap.set(key, value);
  }

  return fieldMap;
}

function splitRepeatedFields(raw: string): string[] {
  return raw.split(/\n[-]+--\n/);
}

function getQuillHeader(headerName: string): DeltaOperation {
  return {
    insert: '\n== ' + headerName + ' ==\n',
    attributes: {
      bold: true
    }
  };
}

function getQuillSubHeader(headerName: string): DeltaOperation {
  return {
    insert: '\n-- ' + headerName + ' --\n',
    attributes: {
      italic: true
    }
  };
}

function getQuillSeparator(): DeltaOperation {
  return {
    insert: '\n' + '-'.repeat(20) + '\n',
    attributes: {
      italic: true
    }
  };
}
