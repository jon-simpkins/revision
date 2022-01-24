import React from 'react';
import {PDFViewer, Font, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import {ContentBlock} from 'draft-js';
import {Scrap} from '../../protos_v2';
import {isFountainCentered, isFountainCharacter, isFountainDialogue, isFountainHeader, isFountainParenthetical, isFountainTransition, isScrapTrait} from '../../features/scrapDetails/usefulConstants';
import {
  Style
} from '@react-pdf/types';
import {PrintPageProps} from './PrintScrapPage';

// @ts-ignore
import CourierPrime from '../../courierPrime/CourierPrime-Regular.ttf';

// @ts-ignore
import CourierPrimeBold from '../../courierPrime/CourierPrime-Bold.ttf';

Font.register({ family: 'CourierPrime', format: 'truetype', src: CourierPrime});
Font.register({ family: 'CourierPrimeBold', format: 'truetype', src: CourierPrimeBold});


// Disable hyphenation
Font.registerHyphenationCallback(word => [word]);

// TODO: register CourierPrime, along with bold / italic versions so they can be leveraged

// Create styles
const styles = StyleSheet.create({
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
    width: '282pt'
  },
  parentheticalLine: {
    marginLeft: '102pt',
    width: '234pt',
  },
  transitionLine: {
    paddingTop: '16pt',
    textAlign: 'right',
  },
  centeredLine: {
    textAlign: 'center',
  },
  sceneHeaderLine: {
    fontFamily: 'CourierPrimeBold',
    paddingBottom: '16pt'
  },
  block: {
    paddingBottom: '16pt'
  }
});

// Defines a block of elements that must exist on the same page
interface PDFBlock {
  elements: ScriptElement[];
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

  parsedContentBlocks.forEach((block) => {
    const blockData = block.getData();
    let blockText = block.getText();

    if (!blockText.trim().length) {
      return;
    }

    if (blockData.get(isScrapTrait)) {
      return; // Don't render traits in PDF
    }

    let style: Style|undefined = undefined;
    let type: ElementType = ElementType.ACTION; // Default to action.

    if (blockData.get(isFountainCharacter)) {
      style = styles.characterLine;
      type = ElementType.CHARACTER;
    } else if (blockData.get(isFountainDialogue)) {
      style = styles.dialogueLine;
      type = ElementType.DIALOGUE;
    } else if (blockData.get(isFountainParenthetical)) {
      style = styles.parentheticalLine;
      type = ElementType.PARENTHETICAL;
    } else if (blockData.get(isFountainTransition)) {
      style = styles.transitionLine;
      type = ElementType.TRANSITION;
    } else if (blockData.get(isFountainCentered)) {
      style = styles.centeredLine;
      type = ElementType.CENTERED;
    } else if (blockData.get(isFountainHeader)) {
      style = styles.sceneHeaderLine;
      type = ElementType.SCENE_HEADING;

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


// Create Document Component
function renderDocument(scrap: Scrap, parsedContentBlocks: ContentBlock[]): JSX.Element {

  const parsedPDFBlocks = parsePDFBlocks(parsedContentBlocks);

  let pageNumberElement: JSX.Element|null = (<Text style={{marginTop: '-16pt', textAlign: 'right'}} render={({ pageNumber, totalPages }) => {
    if (pageNumber === 1) {
      return '';
    }

    return `${pageNumber}.`
  }} fixed />);

  // For now, disable page numbering
  pageNumberElement = null;

  return <Document
      title={scrap.synopsis}
      author={'Me'}
      creator={'Me'}
      producer={'Revision (https://jon-simpkins.github.io/revision)'}
  >
    <Page size="LETTER" style={styles.page} wrap>
      {pageNumberElement}
      {parsedPDFBlocks.map((pdfBlock) => (
        <View wrap={false} style={styles.block}>
          {pdfBlock.elements.map((element) => (
              <Text style={element.style}>{element.text}</Text>
          ))}
        </View>
      ))}
    </Page>
  </Document>
}

export function renderExamplePDF(printPageProps: PrintPageProps, parsedContentBlocks: ContentBlock[]) {
  const thisScrap = printPageProps.scrapMap[printPageProps.scrapId] as Scrap;

  return <PDFViewer style={{flex: 1}}>
    {renderDocument(thisScrap, parsedContentBlocks)}
  </PDFViewer>
}
