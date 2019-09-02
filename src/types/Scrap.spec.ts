import Scrap, {ScrapPrototype, TextLineContent, ThreeLineContent} from './Scrap';

describe('Scrap', () => {
  it('Serializes and deserializes similar movies', () => {
    let myScrap = new Scrap();
    myScrap.content = new ThreeLineContent();
    myScrap.startedEpoch = 1567363519553;
    myScrap.completedEpoch = 1567363534553;
    myScrap.editedBy = 'jon.simpkins@gmail.com';
    myScrap.prototype = ScrapPrototype.SIMILAR_MOVIES;
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

  it('Serializes and deserializes movie title', () => {
    let myScrap = new Scrap();
    myScrap.content = new TextLineContent();
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
