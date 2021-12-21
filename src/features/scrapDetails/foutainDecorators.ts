import {CompositeDecorator} from 'draft-js';
import {ScrapEmbedComponent, scrapEmbeddingStrategy} from './ScrapEmbedComponent';
import {FountainHeaderComponent, fountainHeaderStrategy} from './FountainHeaderComponent';
import {FountainTransitionComponent, fountainTransitionStrategy} from './FountainTransitionComponent';
import {FountainCenteredComponent, fountainCenteredStrategy} from './FountainCenteredComponent';
import {FountainCharacterComponent, fountainCharacterStrategy} from './FountainCharacterComponent';
import {FountainDialogueComponent, fountainDialogueStrategy} from './FountainDialogueComponent';
import {FountainParentheticalComponent, fountainParentheticalStrategy} from './FountainParentheticalComponent';
import {CommentComponent, commentStrategy} from './CommentComponent';

/** Decorator for the script editor */
export const editorDecorator = new CompositeDecorator([
  {
    strategy: scrapEmbeddingStrategy,
    component: ScrapEmbedComponent,
  },
  {
    strategy: fountainHeaderStrategy,
    component: FountainHeaderComponent,
  },
  {
    strategy: fountainTransitionStrategy,
    component: FountainTransitionComponent,
  },
  {
    strategy: fountainCenteredStrategy,
    component: FountainCenteredComponent,
  },
  {
    strategy: fountainCharacterStrategy,
    component: FountainCharacterComponent,
  },
  {
    strategy: fountainDialogueStrategy,
    component: FountainDialogueComponent,
  },
  {
    strategy: fountainParentheticalStrategy,
    component: FountainParentheticalComponent,
  },
  {
    strategy: commentStrategy,
    component: CommentComponent,
  },
]);
