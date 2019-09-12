import {ScrapPrototype} from './Scrap';

const SINGULAR_PROTOTYPES = new Set([
  ScrapPrototype.SIMILAR_MOVIES,
  ScrapPrototype.MOVIE_TITLE,
  ScrapPrototype.LOG_LINE,
  ScrapPrototype.TIME_FRAME,
  ScrapPrototype.CHARACTER_LISTING,
]);

export {SINGULAR_PROTOTYPES};
