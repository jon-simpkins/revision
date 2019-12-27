import { storiesOf, moduleMetadata } from '@storybook/angular';

import {WorkspaceMenuComponent} from './workspace-menu.component';
import {AppModule} from '../app.module';

storiesOf('V2 / Workspace Menu', module)
  .addDecorator(
    moduleMetadata({
      declarations: [],
      imports: [AppModule],
      providers: [],
    }),
  ).add('Renders', () => {
  return {
    component: WorkspaceMenuComponent
  };
});
