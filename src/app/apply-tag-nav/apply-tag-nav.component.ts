import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges} from '@angular/core';
import {Beat, Tag} from '../../protos';
import TagReference = Beat.TagReference;
import EnumValue = Tag.EnumValue;
import ITagReference = Beat.ITagReference;

import {debounce} from 'debounce';

interface EnumOption {
  value: number;
  label: string;
}

@Component({
  selector: 'app-apply-tag-nav',
  templateUrl: './apply-tag-nav.component.html',
  styleUrls: ['./apply-tag-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplyTagNavComponent implements OnInit, OnChanges {

  constructor(private ref: ChangeDetectorRef) { }

  @Input()
  tagMap: Map<string, Tag>|null = null;

  @Input()
  tagReferences: ITagReference[] = [];

  @Output() updateTagUses = new EventEmitter<ITagReference[]>();

  remainingTagOptions: Tag[] = [];
  alreadyReferencedTagIds: Set<string> = new Set<string>();
  enumOptionsMap: Map<string, EnumOption[]> = new Map<string, EnumOption[]>();

  selectedOptionId = '';

  numericChange = debounce((tagId: string|undefined|null, inputEvent: any) => {
    const newValue = inputEvent.target.value as number;

    this.tagReferences.forEach((tagReference) => {
      if (tagReference.tagId !== tagId) {
        return;
      }

      tagReference.numericValue = newValue;
    });

    this.ref.markForCheck();

    this.emitReferenceUpdate();
  }, 250);

  ngOnInit(): void {
    this.rebuildRemainingTagOptions();
    this.ref.markForCheck();
  }

  ngOnChanges(): void {
    this.rebuildRemainingTagOptions();

    this.enumOptionsMap = new Map<string, EnumOption[]>();

    this.tagMap?.forEach((tag) => {
      const enumValues = tag?.enumValues as EnumValue[] || [];

      const enumOptions = enumValues.map((value, index) => {
        if (value.isDeprecated) {
          return {} as EnumOption;
        }

        return {
          label: value.label,
          value: index
        } as EnumOption;
      }).filter(value => !!value.label);

      this.enumOptionsMap.set(tag.id, enumOptions);
    });

    this.ref.markForCheck();
  }

  rebuildRemainingTagOptions(): void {
    this.alreadyReferencedTagIds = new Set<string>();
    this.tagReferences.forEach((reference) => {
      this.alreadyReferencedTagIds.add(reference.tagId as string);
    });

    this.remainingTagOptions = [];
    this.tagMap?.forEach((tag) => {
      if (!this.alreadyReferencedTagIds.has(tag.id)) {
        this.remainingTagOptions.push(tag);
      }
    });
  }

  selectOption(newId: string): void {
    this.selectedOptionId = newId;
  }

  addTag(): void {
    this.tagReferences.push({
      tagId: this.selectedOptionId,
    } as TagReference);

    this.selectOption('');
    this.rebuildRemainingTagOptions();

    this.ref.markForCheck();

    this.emitReferenceUpdate();
  }

  getTagName(tagId: string|undefined|null): string {
    const tag = this.tagMap?.get(tagId as string) as Tag;

    return tag.name;
  }

  dereferenceTag(tagId: string|undefined|null): void {
    this.tagReferences = this.tagReferences.filter((reference) => {
      return reference.tagId !== tagId;
    });

    this.rebuildRemainingTagOptions();
    this.ref.markForCheck();

    this.emitReferenceUpdate();
  }

  emitReferenceUpdate(): void {
    this.updateTagUses.emit(this.tagReferences);
  }

  showNumericInput(tagId: string|undefined|null): boolean {
    const tag = this.tagMap?.get(tagId as string);
    return !!tag?.hasNumericValue;
  }

  showEnumSelect(tagId: string|undefined|null): boolean {
    const tag = this.tagMap?.get(tagId as string);
    return !!tag?.enumValues?.length;
  }

  getEnumOptions(tagId: string|undefined|null): EnumOption[] {
    return this.enumOptionsMap.get(tagId as string) || [];
  }

  enumChange(tagId: string|undefined|null, changeEvent: any): void {
    this.tagReferences.forEach((tagReference) => {
      if (tagReference.tagId !== tagId) {
        return;
      }

      tagReference.enumValue = changeEvent as number;
    });

    this.ref.markForCheck();

    this.emitReferenceUpdate();
  }
}
