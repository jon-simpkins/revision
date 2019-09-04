import EditOption from './EditOption';
import Scrap, {ScrapPrototype} from './Scrap';
import {readFileSync} from 'fs';

describe('EditOption', () => {
  it('Does not return logline as an option on first pass', () => {
    let scraps = new Map<string, Scrap>();

    let options = EditOption.buildOptions(scraps);

    expect(options.length).toBeTruthy(); // Assert that there are options

    options.forEach((option) => {
      expect(option.prototype === ScrapPrototype.LOG_LINE).toBeFalsy();
    });
  });

  it('Should return more options when more things are finished', () => {
    let scraps = new Map<string, Scrap>();
    let scrap1 = Scrap.parseSerialization('(1567593518505:1) NoRgrAbA7GCcDMYQA4wA YIBpzTo+EALCPJgEQBWA 9gHYB0AzgJYC2ADgNZM0 MACA5iwCGTADZ0AxlRZl yAbwA6ZUUoBcwJQElMAA gBKVAEZUALksxKAEkxMS AFuaUAVOwFMdAOVOvjVD koBdAF8yAKA=');
    let scrap2 = Scrap.parseSerialization('(1567593539785:2) NoRgrAbA7GCcDMZ6ygDj AGnNOjIkQwCIArAewDsA 6AZwEsBbABwGs6KaABAc wYEM6AGyoBjMgyLEA3gB 0iAFzkAuOQFkyANzoBTG gAIA7tr00+Bvez0ALOty smRVsmUGGbg40cPaATsY AmfPLs3HIAvkQAukA===');

    scraps.set(scrap1.id, scrap1);
    scraps.set(scrap2.id, scrap2);

    let options = EditOption.buildOptions(scraps);

    expect(options.length > 1).toBeTruthy();
  });
});
