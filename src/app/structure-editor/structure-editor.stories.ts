import { storiesOf, moduleMetadata } from '@storybook/angular';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material';
import {MatIconModule} from '@angular/material';

import {StructureEditorComponent} from './structure-editor.component';
import {BeatCardListComponent} from './beat-card-list/beat-card-list.component';

storiesOf('Structure Editor', module)
  .addDecorator(
    moduleMetadata({
      declarations: [StructureEditorComponent, BeatCardListComponent],
      imports: [MatIconModule, MatSelectModule, MatSliderModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
      providers: [],
    }),
  ).add('Renders', () => {
    return {
      component: StructureEditorComponent
    };
  });
