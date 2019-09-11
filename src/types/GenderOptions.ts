import {MultiOption} from './MultiOption';

const GENDER_OPTIONS = [
  new MultiOption(
    'Female',
    'female',
    'The character would identify as female'
  ),
  new MultiOption(
    'Male',
    'male',
    'The character would identify as male'
  ),
  new MultiOption(
    'Non-Binary',
    'non-binary',
    'The character would identify neither as male or female'
  ),
];

export { GENDER_OPTIONS };
