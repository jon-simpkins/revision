import { storiesOf, moduleMetadata } from '@storybook/angular';

import { AppModule } from '../../app.module';
import { SimilarMovie } from 'src/storyStructures';

const TEMPLATE = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <similar-movie-list [similarMovieList]="similarMovieList" [deleteMovieCallback]="deleteMovieCallback"></similar-movie-list>
`;

const similarMovieList = [];
const mockMovie01 = new SimilarMovie();
mockMovie01.id = 'abc123';
mockMovie01.title = 'Tenet';
mockMovie01.runtimeMin = 100;
similarMovieList.push(mockMovie01);

storiesOf('V2 / Similar Movie List', module)
    .addDecorator(
        moduleMetadata({
            declarations: [],
            imports: [AppModule],
            providers: [],
        }),
    ).add('Renders with delete button', () => {
        return {
            template: TEMPLATE,
            props: {
                similarMovieList,
                deleteMovieCallback: (id: string) => {
                    console.log('Would have deleted: ' + id);
                }
            }
        };
    }).add('Renders without delete button', () => {
        return {
            template: TEMPLATE,
            props: {
                similarMovieList
            }
        };
    }).add('Renders empty', () => {
        return {
            template: TEMPLATE,
            props: {
                similarMovieList: []
            }
        };
    });