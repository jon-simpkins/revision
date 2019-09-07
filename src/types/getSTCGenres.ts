
class MultiOption {
  constructor(public label: string, public value: string, public desc: string) {}
}

const STC_GENRES = [
  new MultiOption(
    'Monster in the House',
    'monster',
    'A threatening "monster" that must be destroyed, in a "house" that is confining the protagonists'
  ),
  new MultiOption(
    'Golden Fleece',
    'fleece',
    'Characters go on a quest for something, they change along the way'
  ),
  new MultiOption(
    'Out of the Bottle',
    'bottle',
    'Character wants their world to change, it does, and they have to deal with the new world'
  ),
  new MultiOption(
    'Folks with a Problem',
    'problem',
    'Average character is faced with an extraordinary challenge'
  ),
  new MultiOption(
    'Rites of Passage',
    'passage',
    'Story about a character allowing themselves to succumb to inevitable experiences'
  ),
  new MultiOption(
    'Golden Fleece',
    'fleece',
    'Characters go on a quest for something, they change along the way'
  ),
  new MultiOption(
    'Buddy Love',
    'buddy',
    'Two people are brought together into a relationship. Lethal Weapon, Rain Man, The Notebook, E.T.'
  ),
  new MultiOption(
    'Whydunit',
    'why',
    'It\'s not about a character changing, it\'s about characters discovering *why* something happened / could happen. Chinatown, All the Presidents Men, Mystic River'
  ),
  new MultiOption(
    'The Fool Triumphant',
    'fool',
    'An underdog, counted by everyone as down and out, succeeds anyway'
  ),
  new MultiOption(
    'Institutionalized',
    'institutionalized',
    'Someone rebels against an institution that they\'re part of. American Beauty, MASH, One Flew Over the Cuckoos Nest'
  ),
  new MultiOption(
    'Superhero',
    'super',
    'The struggles of an extraordinary character surrounded by those who aren\'t extraordinary in the same way'
  )
];

function getOptionFromValue(value: string): MultiOption {
  for (let i = 0; i < STC_GENRES.length; i++) {
    if (STC_GENRES[i].value === value) {
      return STC_GENRES[i];
    }
  }

  return null;
}

export {STC_GENRES, MultiOption, getOptionFromValue};
