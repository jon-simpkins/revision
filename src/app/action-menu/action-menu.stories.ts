import { storiesOf, moduleMetadata } from '@storybook/angular';

import {ActionMenuComponent} from './action-menu.component';
import {AppModule} from '../app.module';

storiesOf('V2 / Action Menu', module)
  .addDecorator(
    moduleMetadata({
      declarations: [],
      imports: [AppModule],
      providers: [],
    }),
  ).add('Renders', () => {
  return {
    component: ActionMenuComponent
  };
});
