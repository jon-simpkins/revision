import {checkIsScrapEmbed, scrapEmbedData} from './ScrapEmbedComponent';
import {isScrapEmbedding, scrapLink} from './usefulConstants';

describe('Scrap Embed', () => {
  it('should parse scrap embeds correctly', () => {
    expect(checkIsScrapEmbed('{{abc-123}}')).toBeTruthy();
    expect(checkIsScrapEmbed('INT. ROOM - DAY')).toBeFalsy();
  });

  it('should parse scrap data correctly', () => {
    const data1 = scrapEmbedData('{{abc-123}}');
    expect(data1[isScrapEmbedding]).toBeTruthy();
    expect(data1[scrapLink]).toEqual('abc-123');
  });
});
