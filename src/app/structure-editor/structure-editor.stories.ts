import { storiesOf, moduleMetadata } from '@storybook/angular';

import {StructureEditorComponent} from './structure-editor.component';
import {AppModule} from '../app.module';

storiesOf('Structure Editor', module)
  .addDecorator(
    moduleMetadata({
      declarations: [],
      imports: [AppModule],
      providers: [],
    }),
  ).add('Renders', () => {
    return {
      component: StructureEditorComponent
    };
  });
