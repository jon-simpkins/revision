import {ScrapPrototype} from './Scrap';

const SINGULAR_PROTOTYPES = new Set([
  ScrapPrototype.SIMILAR_MOVIES,
  ScrapPrototype.MOVIE_TITLE,
  ScrapPrototype.LOG_LINE,
  ScrapPrototype.QUESTIONS_TO_EXPLORE,
  ScrapPrototype.TIME_FRAME,
  ScrapPrototype.CHARACTER_LISTING,
  ScrapPrototype.MOVIE_DURATION,
  ScrapPrototype.STRUCTURE_SPEC, // Kind of a misnomer, it's singular but then can have children
]);

export {SINGULAR_PROTOTYPES};
