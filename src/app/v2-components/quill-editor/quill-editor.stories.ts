import { storiesOf, moduleMetadata } from '@storybook/angular';
import { AppModule } from '../../app.module';

const TEMPLATE = `
  <quill-editor [initialRawText]="initialRawText" [changeCallback]="changeCallback" [readOnlyMode]="readOnlyMode"></quill-editor>
`;

storiesOf('V2 / Quill Editor', module)
    .addDecorator(
        moduleMetadata({
            declarations: [],
            imports: [AppModule],
            providers: [],
        }),
    ).add('Renders empty', () => {
        return {
            template: TEMPLATE,
            props: {
                initialRawText: '',
                changeCallback: (rawText: string) => {
                    console.log(rawText);
                }
            }
        };
    }).add('Renders with initial content', () => {
        return {
            template: TEMPLATE,
            props: {
                initialRawText: 'This\nIs\n\nInitial\tContent',
                changeCallback: (rawText: string) => {
                    console.log(rawText);
                }
            }
        };
    }).add('Renders readonly with content', () => {
        return {
            template: TEMPLATE,
            props: {
                initialRawText: 'This\nIs\n\nInitial\tContent',
                readOnlyMode: true
            }
        };
    });