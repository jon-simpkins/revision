import {ScrapPrototype} from './Scrap';

const SINGULAR_PROTOTYPES = new Set([
  ScrapPrototype.SIMILAR_MOVIES,
  ScrapPrototype.MOVIE_TITLE,
  ScrapPrototype.LOG_LINE,
  ScrapPrototype.TIME_FRAME,
  ScrapPrototype.STC_GENRE,
  ScrapPrototype.STC_GENRE_EXPLANATION
]);

export {SINGULAR_PROTOTYPES};
