import { storiesOf, moduleMetadata } from '@storybook/angular';
import { AppModule } from '../../app.module';

const TEMPLATE = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <smart-link-btn [label]="label" [icon]="icon"></smart-link-btn>
`;

storiesOf('V2 / Smart Link Button', module)
    .addDecorator(
        moduleMetadata({
            declarations: [],
            imports: [AppModule],
            providers: [],
        }),
    ).add('Renders with label', () => {
        return {
            template: TEMPLATE,
            props: {
                label: 'My Label'
            }
        };
    }).add('Renders with icon', () => {
        return {
            template: TEMPLATE,
            props: {
                icon: 'edit'
            }
        };
    });