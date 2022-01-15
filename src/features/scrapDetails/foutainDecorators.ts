import {CompositeDecorator} from 'draft-js';
import {ScrapEmbedComponent, scrapEmbeddingStrategy} from './ScrapEmbedComponent';
import {FountainHeaderComponent, FountainHeaderReadOnlyComponent, fountainHeaderStrategy} from './FountainHeaderComponent';
import {FountainTransitionComponent, FountainTransitionReadOnlyComponent, fountainTransitionStrategy} from './FountainTransitionComponent';
import {FountainCenteredComponent, FountainCenteredReadOnlyComponent, fountainCenteredStrategy} from './FountainCenteredComponent';
import {FountainCharacterComponent, FountainCharacterReadOnlyComponent, fountainCharacterStrategy} from './FountainCharacterComponent';
import {FountainDialogueComponent, FountainDialogueReadOnlyComponent, fountainDialogueStrategy} from './FountainDialogueComponent';
import {FountainParentheticalComponent, FountainParentheticalReadOnlyComponent, fountainParentheticalStrategy} from './FountainParentheticalComponent';
import {CommentComponent, commentStrategy} from './CommentComponent';
import {FountainActionComponent, FountainActionReadOnlyComponent, fountainActionStrategy} from './FountainActionComponent';
import {ScrapPlaceholderComponent, ScrapPlaceholderReadOnlyComponent, scrapPlaceholderStrategy} from './ScrapPlaceholderComponent';
import {ScrapTraitComponent, ScrapTraitReadonlyComponent, scrapTraitStrategy} from './ScrapTraitComponent';

/** Decorator for the script editor */
export const editorDecorator = new CompositeDecorator([
  {
    strategy: scrapPlaceholderStrategy,
    component: ScrapPlaceholderComponent,
  },
  {
    strategy: scrapTraitStrategy,
    component: ScrapTraitComponent,
  },
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
  {
    strategy: fountainActionStrategy,
    component: FountainActionComponent,
  },
]);

/** Decorator for the script viewer (read-only) */
export const viewerDecorator = new CompositeDecorator([
  {
    strategy: scrapPlaceholderStrategy,
    component: ScrapPlaceholderReadOnlyComponent,
  },
  {
    strategy: scrapTraitStrategy,
    component: ScrapTraitReadonlyComponent,
  },
  {
    strategy: fountainHeaderStrategy,
    component: FountainHeaderReadOnlyComponent,
  },
  {
    strategy: fountainTransitionStrategy,
    component: FountainTransitionReadOnlyComponent,
  },
  {
    strategy: fountainCenteredStrategy,
    component: FountainCenteredReadOnlyComponent,
  },
  {
    strategy: fountainCharacterStrategy,
    component: FountainCharacterReadOnlyComponent,
  },
  {
    strategy: fountainDialogueStrategy,
    component: FountainDialogueReadOnlyComponent,
  },
  {
    strategy: fountainParentheticalStrategy,
    component: FountainParentheticalReadOnlyComponent,
  },
  {
    strategy: fountainActionStrategy,
    component: FountainActionReadOnlyComponent,
  },
]);
