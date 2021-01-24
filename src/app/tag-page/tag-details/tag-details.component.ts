import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tag} from '../../../protos';
import {MatCheckboxChange} from '@angular/material/checkbox';

import {debounce} from 'debounce';

export interface TagUpdate {
  tag: Tag;
  modifiesListView: boolean;
}

@Component({
  selector: 'app-tag-details',
  templateUrl: './tag-details.component.html',
  styleUrls: ['./tag-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagDetailsComponent implements OnInit {

  constructor() { }

  @Input()
  tag: Tag|null = null;

  @Output() tagUpdated = new EventEmitter<TagUpdate>();

  onNameInput = debounce((event: any) => {
    const tag = this.tag as Tag;

    tag.name = event.target.value;

    this.tagUpdated.emit({
      tag,
      modifiesListView: true,
    } as TagUpdate);
  }, 200);

  onDescriptionInput = debounce((event: any) => {
    const tag = this.tag as Tag;

    tag.description = event.target.value;

    this.tagUpdated.emit({
      tag,
      modifiesListView: false,
    } as TagUpdate);
  }, 200);

  setEnumLabel = debounce((index: number, event: any) => {
    const tag = this.tag as Tag;

    tag.enumValues[index].label = event.target.value;

    this.tagUpdated.emit({
      tag,
      modifiesListView: false,
    } as TagUpdate);
  }, 200);

  ngOnInit(): void {
  }

  hasNumericValue(): boolean {
    return this.tag?.hasNumericValue ?? false;
  }

  onHasNumericValueCheckbox(event: MatCheckboxChange): void {
    const tag = this.tag as Tag;

    tag.hasNumericValue = event.checked;

    this.tagUpdated.emit({
      tag,
      modifiesListView: false,
    } as TagUpdate);
  }

  isEmpty(): boolean {
    return this.tag == null;
  }

  setDeprecatedEnum(index: number, event: MatCheckboxChange): void {
    const isDeprecated = !event.checked;

    const tag = this.tag as Tag;

    tag.enumValues[index].isDeprecated = isDeprecated;

    this.tagUpdated.emit({
      tag,
      modifiesListView: false,
    } as TagUpdate);
  }

  addEnumValue(): void {
    const enumValue = {
      label: 'My enum option',
      isDeprecated: false,
    } as Tag.EnumValue;

    const tag = this.tag as Tag;

    tag.enumValues.push(enumValue);

    this.tagUpdated.emit({
      tag,
      modifiesListView: false,
    } as TagUpdate);
  }
}
