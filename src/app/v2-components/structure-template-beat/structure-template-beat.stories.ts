import { storiesOf, moduleMetadata } from '@storybook/angular';
import { AppModule } from '../../app.module';
import { PlotTemplateBeat, PlotTemplate } from 'src/storyStructures';

const TEMPLATE = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <structure-template-beat style="width:400px; overflow:hidden; position: absolute;" [beatIndex]="beatIndex" [template]="template"></structure-template-beat>
  `;

storiesOf('V2 / Structure Template Beat', module)
    .addDecorator(
        moduleMetadata({
            declarations: [],
            imports: [AppModule],
            providers: [],
        }),
    ).add('Renders view mode', () => {
        const template = new PlotTemplate();
        template.beats = [
            new PlotTemplateBeat(),
            new PlotTemplateBeat(),
            new PlotTemplateBeat(),
        ];

        template.beats[0].durationMin = 1.5;
        template.beats[1].oneLiner = 'Second Act';
        template.beats[1].durationMin = 0.75;
        template.beats[2].durationMin = 2;


        return {
            template: TEMPLATE,
            props: {
                beatIndex: 1,
                template: template
            }
        };
    });