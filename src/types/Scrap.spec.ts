import Scrap, {ScrapPrototype, TextLineContent} from './Scrap';
import {NLineContent} from './ScrapTypes/NLineContent';
import {LineContent} from './ScrapTypes/LineContent';

describe('Scrap', () => {
  it('Serializes and deserializes similar movies', () => {
    let myScrap = new Scrap();
    myScrap.content = new NLineContent([
      new LineContent('This is the first movie', true),
      new LineContent('This was the second movie, now inactive', false),
      new LineContent('third movie title, still active', true)
    ]);
    myScrap.startedEpoch = 1567363519553;
    myScrap.completedEpoch = 1567363534553;
    myScrap.editedBy = 'jon.simpkins@gmail.com';
    myScrap.prototype = ScrapPrototype.SIMILAR_MOVIES;
    myScrap.id = 'def456';

    let serialized = myScrap.generateSerialization();
    console.log(serialized);
    let deserialized = Scrap.parseSerialization(serialized);

    expect(deserialized.content).toEqual(myScrap.content);
    expect(deserialized.startedEpoch).toEqual(myScrap.startedEpoch);
    expect(deserialized.completedEpoch).toEqual(myScrap.completedEpoch);
    expect(deserialized.editedBy).toEqual(myScrap.editedBy);
    expect(deserialized.prototype).toEqual(myScrap.prototype);
    expect(deserialized.id).toEqual(myScrap.id);
  });

  it('Serializes and deserializes movie title', () => {
    let myScrap = new Scrap();
    myScrap.content = new TextLineContent('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ipsum felis, bibendum eu elementum quis, eleifend eget sapien. Suspendisse pulvinar egestas ligula bibendum gravida. Cras ac ante dignissim, placerat sem et, blandit sem. Aenean imperdiet et sapien id sollicitudin. Phasellus in urna a ligula viverra aliquet. Donec vitae nunc vel tellus scelerisque dapibus. Donec eu scelerisque nunc.');
    myScrap.startedEpoch = 1567363519553;
    myScrap.completedEpoch = 1567363534553;
    myScrap.editedBy = 'jon.simpkins@gmail.com';
    myScrap.prototype = ScrapPrototype.MOVIE_TITLE;
    myScrap.id = 'def456';

    let serialized = myScrap.generateSerialization();

    let deserialized = Scrap.parseSerialization(serialized);

    expect(deserialized.content).toEqual(myScrap.content);
    expect(deserialized.startedEpoch).toEqual(myScrap.startedEpoch);
    expect(deserialized.completedEpoch).toEqual(myScrap.completedEpoch);
    expect(deserialized.editedBy).toEqual(myScrap.editedBy);
    expect(deserialized.prototype).toEqual(myScrap.prototype);
    expect(deserialized.id).toEqual(myScrap.id);
  });

  it('Deserializes garbage as null', () => {
    let deserializedGarbase = Scrap.parseSerialization('hello world');

    expect(deserializedGarbase).toBeFalsy();
  });
});
