import { storiesOf, moduleMetadata } from '@storybook/angular';

import {TimelineChartComponent} from './timeline-chart.component';
import {AppModule} from '../app.module';

storiesOf('Timeline Chart', module)
  .addDecorator(
    moduleMetadata({
      declarations: [],
      imports: [AppModule],
      providers: [],
    }),
  ).add('Renders', () => {
  return {
    component: TimelineChartComponent
  };
});
