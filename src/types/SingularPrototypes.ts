import {ScrapPrototype} from './Scrap';

const SINGULAR_PROTOTYPES = new Set([
  ScrapPrototype.SIMILAR_MOVIES,
  ScrapPrototype.MOVIE_TITLE,
  ScrapPrototype.LOG_LINE,
  ScrapPrototype.TIME_FRAME
]);

export {SINGULAR_PROTOTYPES};
