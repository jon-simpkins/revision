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
    let scrap1 = Scrap.parseSerialization('(1567507283063:1) WzE1Njc1MD cyODMwNjMs MTU2NzUwNz I5NTk1OSwi am9uLnNpbX BraW5zQGdt YWlsLmNvbS IsIntcImxc IjpbXCJNb3 ZpZSAxXCIs XCJUQkRcIi xcIjNyZCBt b3ZpZVwiXX 0iXQ==');
    let scrap2 = Scrap.parseSerialization('(1567507304667:2) WzE1Njc1MD czMDQ2Njcs MTU2NzUwNz MyMzMyNCwi am9uLnNpbX BraW5zQGdt YWlsLmNvbS IsIntcInRc IjpcIkl0J2 QgYmUgY29v bGVyIGlmIH dlIGNvdWxk IHNlZSB0aG UgbGlzdCBv ZiBzaW1pbG FyIG1vdmll cyBhdCB0aG Ugc2FtZSB0 aW1lIHJpZ2 h0IG5vd1wi fSJd');

    scraps.set(scrap1.id, scrap1);
    scraps.set(scrap2.id, scrap2);

    let options = EditOption.buildOptions(scraps);

    expect(options.length > 1).toBeTruthy();
  });
});
