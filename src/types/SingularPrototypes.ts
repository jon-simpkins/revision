import {ScrapPrototype} from './Scrap';

const SINGULAR_PROTOTYPES = new Set([
  ScrapPrototype.SIMILAR_MOVIES,
  ScrapPrototype.MOVIE_TITLE,
  ScrapPrototype.LOG_LINE,
  ScrapPrototype.TIME_FRAME,
  ScrapPrototype.CHARACTER_LISTING,
  ScrapPrototype.MOVIE_DURATION
]);

export {SINGULAR_PROTOTYPES};
