import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Beat, Tag} from '../../../../protos';
import TagReference = Beat.TagReference;
import EnumValue = Tag.EnumValue;
import ITagReference = Beat.ITagReference;

import {debounce} from 'debounce';
import {TagService} from '../../../tag.service';
import {BeatsService} from '../../../beats.service';

interface EnumOption {
  value: number;
  label: string;
}

@Component({
  selector: 'app-writing-tag-assignment',
  templateUrl: './writing-tag-assignment.component.html',
  styleUrls: ['./writing-tag-assignment.component.scss']
})
export class WritingTagAssignmentComponent implements OnInit, OnChanges {

  editingBeat: Beat|null = null;
  editingBeatSubscription = '';

  tagMapSubscription = '';
  tagMap: Map<string, Tag> = new Map<string, Tag>();

  constructor(
    private beatsService: BeatsService,
    private tagService: TagService,
    private ref: ChangeDetectorRef) { }

  @Input()
  editingBeatId = '';

  remainingTagOptions: Tag[] = [];
  alreadyReferencedTagIds: Set<string> = new Set<string>();
  enumOptionsMap: Map<string, EnumOption[]> = new Map<string, EnumOption[]>();

  selectedOptionId = '';

  numericChange = debounce(async (tagId: string|undefined|null, inputEvent: any) => {
    const newValue = inputEvent.target.value as number;

    this.editingBeat?.tagReferences.forEach((tagReference) => {
      if (tagReference.tagId !== tagId) {
        return;
      }

      tagReference.numericValue = newValue;
    });

    this.ref.markForCheck();

    await this.emitReferenceUpdate();
  }, 250);

  ngOnInit(): void {

    this.tagMapSubscription = this.tagService.subscribeToTagMapView((newValue) => {
      this.tagMap = newValue;

      this.rebuildRemainingTagOptions();

      this.enumOptionsMap = new Map<string, EnumOption[]>();

      this.tagMap.forEach((tag) => {
        const enumValues = tag.enumValues as EnumValue[] || [];

        const enumOptions = enumValues.map((value, index) => {
          if (value.isDeprecated) {
            return {} as EnumOption;
          }

          return {
            label: value.label,
            value: index + 1 // 0 is reserved for "undecided"
          } as EnumOption;
        }).filter(value => !!value.label);

        this.enumOptionsMap.set(tag.id, enumOptions);
      });

      this.ref.markForCheck();
    });

    this.editingBeatSubscription = this.beatsService.subscribeToBeat(this.editingBeatId, (newBeat) => {
      this.editingBeat = newBeat;

      this.rebuildRemainingTagOptions();

      this.ref.markForCheck();
    });

    this.rebuildRemainingTagOptions();
    this.ref.markForCheck();
  }

  ngOnChanges(): void {

    this.beatsService.cancelSubscription(this.editingBeatSubscription);
    this.editingBeatSubscription = this.beatsService.subscribeToBeat(this.editingBeatId, (newBeat) => {
      this.editingBeat = newBeat;

      this.rebuildRemainingTagOptions();

      this.ref.markForCheck();
    });

    this.ref.markForCheck();
  }

  rebuildRemainingTagOptions(): void {
    this.alreadyReferencedTagIds = new Set<string>();
    this.editingBeat?.tagReferences.forEach((reference) => {
      this.alreadyReferencedTagIds.add(reference.tagId as string);
    });

    this.remainingTagOptions = [];
    this.tagMap.forEach((tag) => {
      if (!this.alreadyReferencedTagIds.has(tag.id)) {
        this.remainingTagOptions.push(tag);
      }
    });
  }

  selectOption(newId: string): void {
    this.selectedOptionId = newId;
  }

  async addTag(): Promise<void> {
    this.editingBeat?.tagReferences.push({
      tagId: this.selectedOptionId,
    } as TagReference);

    this.selectOption('');
    this.rebuildRemainingTagOptions();

    this.ref.markForCheck();

    await this.emitReferenceUpdate();
  }

  getTagName(tagId: string|undefined|null): string {
    const tag = this.tagMap.get(tagId as string) as Tag;

    return tag.name;
  }

  async dereferenceTag(tagId: string|undefined|null): Promise<void> {
    if (!this.editingBeat) {
      throw Error('Editing beat does not exist');
    }

    this.editingBeat.tagReferences = this.editingBeat.tagReferences.filter((reference) => {
      return reference.tagId !== tagId;
    });

    this.rebuildRemainingTagOptions();
    this.ref.markForCheck();

    await this.emitReferenceUpdate();
  }

  async emitReferenceUpdate(): Promise<void> {
    if (!this.editingBeat) {
      throw Error('Editing beat does not exist!');
    }

    await this.beatsService.setBeat(this.editingBeat, true);
  }

  showNumericInput(tagId: string|undefined|null): boolean {
    const tag = this.tagMap.get(tagId as string);
    return !!tag?.hasNumericValue;
  }

  showEnumSelect(tagId: string|undefined|null): boolean {
    const tag = this.tagMap.get(tagId as string);
    return !!tag?.enumValues?.length;
  }

  getEnumOptions(tagId: string|undefined|null): EnumOption[] {
    return this.enumOptionsMap.get(tagId as string) || [];
  }

  async enumChange(tagId: string|undefined|null, event: any): Promise<void> {
    debugger;

    this.editingBeat?.tagReferences.forEach((tagReference) => {
      if (tagReference.tagId !== tagId) {
        return;
      }

      tagReference.enumValue = event.target.value as number;
    });

    this.ref.markForCheck();

    await this.emitReferenceUpdate();
  }

}
