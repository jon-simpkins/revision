import React from 'react';
import {PDFViewer, Font, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import {ContentBlock} from 'draft-js';
import {Scrap} from '../../protos_v2';
import {isFountainCentered, isFountainCharacter, isFountainDialogue, isFountainHeader, isFountainParenthetical, isFountainTransition, isScrapPlaceholder, isScrapTrait} from '../../features/scrapDetails/usefulConstants';
import {
  Style
} from '@react-pdf/types';
import {PrintPageProps} from './PrintScrapPage';

// @ts-ignore
import CourierPrime from '../../courierPrime/CourierPrime-Regular.ttf';

// @ts-ignore
import CourierPrimeBold from '../../courierPrime/CourierPrime-Bold.ttf';

// @ts-ignore
import CourierPrimeItalic from '../../courierPrime/CourierPrime-Italic.ttf';

// @ts-ignore
import CourierPrimeBoldItalic from '../../courierPrime/CourierPrime-Bold-Italic.ttf';

Font.register({ family: 'CourierPrime', format: 'truetype', src: CourierPrime});
Font.register({ family: 'CourierPrimeBold', format: 'truetype', src: CourierPrimeBold});
Font.register({ family: 'CourierPrimeItalic', format: 'truetype', src: CourierPrimeItalic});
Font.register({ family: 'CourierPrimeBoldItalic', format: 'truetype', src: CourierPrimeBoldItalic});

// Disable hyphenation
Font.registerHyphenationCallback(word => [word]);

const ONE_LINE_PADDING = '12pt';

// Create styles
const styles = StyleSheet.create({
  title: {
    marginLeft: '72pt',
    marginTop: '2in',
    textAlign: 'center',
    textDecoration: 'underline',
    width: '252pt'
  },
  author: {
    marginLeft: '72pt',
    paddingTop: '18pt',
    textAlign: 'center',
    width: '252pt'
  },
  contactInfo: {
    position: 'absolute',
    //right: '1.25in',
    //top: '0.5in',
    bottom: '1in',
    left: '1.5in',
  },
  dateInfo: {
    position: 'absolute',
    right: '1in',
    //top: '0.5in',
    bottom: '1in',
    //left: '1in',
  },
  page: {
    fontFamily: 'CourierPrime',
    fontSize: '12pt',
    paddingTop: '1in',
    paddingLeft: '1.5in',
    paddingRight: '1in',
    paddingBottom: '1in',
    margin: '0'
  },
  characterLine: {
    marginLeft: '144pt',
    width: '204pt'
  },
  dialogueLine: {
    marginLeft: '72pt',
    width: '252pt'
  },
  parentheticalLine: {
    marginLeft: '108pt',
    width: '174pt',
  },
  transitionLine: {
    paddingTop: ONE_LINE_PADDING,
    textAlign: 'right',
  },
  centeredLine: {
    textAlign: 'center',
  },
  sceneHeaderLine: {
    fontFamily: 'CourierPrimeBold',
    paddingBottom: ONE_LINE_PADDING
  },
  block: {
    paddingBottom: ONE_LINE_PADDING
  },
  bold: {
    fontFamily: 'CourierPrimeBold',
  },
  italic: {
    fontFamily: 'CourierPrimeItalic',
  },
  boldItalic: {
    fontFamily: 'CourierPrimeBoldItalic',
  },
  underline: {
    textDecoration: 'underline',
  },
  pageNumber: {
    position: 'absolute',
    right: '1.25in',
    top: '0.5in',
    left: '1.5in',
    textAlign: 'right',
  }
});

// Defines a block of elements that must exist on the same page
interface PDFBlock {
  elements: ScriptElement[];
}

// Defines a text block that contains some amount of emphasis
interface TextEmphasisBlock {
  style: object;
  text: string;
}

enum ElementType {
  SCENE_HEADING,
  ACTION,
  DIALOGUE,
  CHARACTER,
  PARENTHETICAL,
  TRANSITION,
  CENTERED,
}

interface ScriptElement {
  text: string;
  style?: Style;
  type: ElementType,
}

function newPDFBlock(): PDFBlock {
  return {
    elements: []
  };
}

function shouldCreateNewBlock(lastElementType: ElementType|null, nextElementType: ElementType): boolean {
  if (nextElementType === ElementType.TRANSITION) {
    return false; // Don't let transitions start on a page by themselves
  }

  if ([ElementType.DIALOGUE, ElementType.PARENTHETICAL].includes(nextElementType)) {
    return false; // Dialogue / parentheticals shouldn't start a page by themselves
  }

  if (lastElementType === ElementType.SCENE_HEADING) {
    return false; // Don't let a scene heading be the last thing on a page
  }

  return true;
}

function parsePDFBlocks(parsedContentBlocks: ContentBlock[]): PDFBlock[] {
  const pdfBlocks: PDFBlock[] = [];

  let nextPDFBlock = newPDFBlock();
  let mostRecentCharacter: string;

  parsedContentBlocks.forEach((block) => {
    const blockData = block.getData();
    let blockText = block.getText();

    if (!blockText.trim().length) {
      return;
    }

    if (blockData.get(isScrapTrait)) {
      return; // Don't render traits in PDF
    }

    if (blockData.get(isScrapPlaceholder)) {
      return; // For now, don't render placeholders in PDF
    }

    let style: Style|undefined = undefined;
    let type: ElementType = ElementType.ACTION; // Default to action.

    if (blockData.get(isFountainCharacter)) {
      style = styles.characterLine;
      type = ElementType.CHARACTER;

      if (blockText !== mostRecentCharacter) {
        mostRecentCharacter = blockText;
      } else {
        // If the same character is continuing, label it as (CONT'D)
        // EDIT: removed, the feedback in the UCLA class was that this is
        //    not the modern approach, just let the characters talk.
        //
        // Maybe someday this will be a settings option?
        //blockText += ' (CONT\'D)';
      }

    } else if (blockData.get(isFountainDialogue)) {
      style = styles.dialogueLine;
      type = ElementType.DIALOGUE;
    } else if (blockData.get(isFountainParenthetical)) {
      style = styles.parentheticalLine;
      type = ElementType.PARENTHETICAL;
    } else if (blockData.get(isFountainTransition)) {
      style = styles.transitionLine;
      type = ElementType.TRANSITION;
      mostRecentCharacter = '';

      if (blockText.startsWith('>')) {
        blockText = blockText.replace(/^>/, '');
      }
    } else if (blockData.get(isFountainCentered)) {
      style = styles.centeredLine;
      type = ElementType.CENTERED;

      if (blockText.startsWith('>') && blockText.endsWith('<')) {
        blockText = blockText.replace(/^>/, '').replace(/<$/, '');
      }
    } else if (blockData.get(isFountainHeader)) {
      style = styles.sceneHeaderLine;
      type = ElementType.SCENE_HEADING;
      mostRecentCharacter = '';

      if (blockText.startsWith('.')) {
        blockText = blockText.replace(/^\./, '');
      }
    }

    const nextElement: ScriptElement = {
      text: blockText,
      style: style,
      type: type,
    };

    const lastElementType = nextPDFBlock.elements.length ? nextPDFBlock.elements[nextPDFBlock.elements.length - 1].type : null;

    if (shouldCreateNewBlock(lastElementType, nextElement.type)) {
      // Time for a new block
      pdfBlocks.push(nextPDFBlock);
      nextPDFBlock = newPDFBlock();
    } else {
      // Time to continue the existing block
    }

    nextPDFBlock.elements.push(nextElement);

  });

  if (nextPDFBlock.elements.length) {
    pdfBlocks.push(nextPDFBlock);
  }

  return pdfBlocks.filter((block) => {
    return !!block.elements.length;
  });
}

const underlineRegex = /_(.*?)_/;
const boldItalicRegex = /\*{3}(.*?)\*{3}/;
const boldRegex = /\*{2}(.*?)\*{2}/;
const italicRegex = /\*(.*?)\*/;

function applyRegexSplit(text: string, regex: RegExp, parentStyle: object, thisStyle: object): TextEmphasisBlock[] {
  const splitResult = text.split(regex);

  if (splitResult.length > 1) {
    const returnBlocks: TextEmphasisBlock[] = [];

    splitResult.forEach((segment, idx) => {
      const segmentStyle = idx % 2 === 0 ? parentStyle : {
        ...parentStyle,
        ...thisStyle,
      };

      returnBlocks.push(
        ...parseTextEmphasis(
            segment,
            segmentStyle
        )
      );
    })

    return returnBlocks;
  }

  return [];
}

function parseTextEmphasis(text: string, parentStyle: object): TextEmphasisBlock[] {
  const underlineResult = applyRegexSplit(text, underlineRegex, parentStyle, styles.underline);
  if (underlineResult.length) { return underlineResult; }

  const boldItalicResult = applyRegexSplit(text, boldItalicRegex, parentStyle, styles.boldItalic);
  if (boldItalicResult.length) { return boldItalicResult; }

  const boldResult = applyRegexSplit(text, boldRegex, parentStyle, styles.bold);
  if (boldResult.length) { return boldResult; }

  const italicResult = applyRegexSplit(text, italicRegex, parentStyle, styles.italic);
  if (italicResult.length) { return italicResult; }

  return [{
    style: parentStyle,
    text: text,
  }];
}

function getTitlePage(title: string|null, author: string, contactInfo: string): JSX.Element|null {
  if (!title) {
    return null;
  }

  const dateStr = new Date().toLocaleDateString(
      'en-US',
      {year: 'numeric', month: 'long', day: 'numeric'}
  );

  let metadataSection;
  if (!!author) {
    metadataSection = <React.Fragment>
      <Text style={styles.author}>by</Text>
      <Text style={styles.author}>{author}</Text>
      <View style={styles.contactInfo}>
        {contactInfo.split('\n').map((contactLine) => {
          return <Text>{contactLine.trim()}</Text>
        })}
      </View>
      <View style={styles.dateInfo}>
        <Text>{dateStr}</Text>
      </View>
    </React.Fragment>
  }

  return <Page size="LETTER" style={styles.page}>
    <View style={styles.title}>
      {title.split('|').map((titleLine) => {
        return <Text>{titleLine.trim()}</Text>
      })}
    </View>
    {metadataSection}
  </Page>;
}

// Create Document Component
function renderDocument(scrap: Scrap, parsedContentBlocks: ContentBlock[], title: string|null, author: string, contactInfo: string): JSX.Element {

  const parsedPDFBlocks = parsePDFBlocks(parsedContentBlocks);

  const showTitlePage = !!title;

  let pageNumberElement: JSX.Element|null = (<Text style={styles.pageNumber} render={({ pageNumber }) => {
    const effectivePageNumber = showTitlePage ? (pageNumber - 1) : pageNumber;

    if (effectivePageNumber === 1) {
      return '';
    }

    return `${effectivePageNumber}.`
  }} fixed />);

  return <Document
      title={scrap.synopsis.replace('|', '')}
      author={author}
      creator={author}
      producer={'Revision (https://jon-simpkins.github.io/revision)'}
  >
    {getTitlePage(title, author, contactInfo)}
    <Page size="LETTER" style={styles.page} wrap>
      {pageNumberElement}
      {parsedPDFBlocks.map((pdfBlock) => (
        <View wrap={false} style={styles.block}>
          {pdfBlock.elements.map((element) => (
              <Text style={element.style}>
                {parseTextEmphasis(element.text, {})
                    .filter((emphasisBlock) => !!emphasisBlock.text.length)
                    .map((emphasisBlock) => (
                  <Text style={emphasisBlock.style}>{emphasisBlock.text}</Text>
                ))}
              </Text>
          ))}
        </View>
      ))}
    </Page>
  </Document>
}

export function renderExamplePDF(printPageProps: PrintPageProps, parsedContentBlocks: ContentBlock[]) {
  const thisScrap = printPageProps.scrapMap[printPageProps.scrapId] as Scrap;

  const title = printPageProps.headerOptions.includeTitlePage ? thisScrap.synopsis : null;

  return <PDFViewer style={{flex: 1}}>
    {renderDocument(thisScrap, parsedContentBlocks, title, printPageProps.author, printPageProps.contactInfo)}
  </PDFViewer>
}
