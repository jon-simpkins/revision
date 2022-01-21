// @ts-ignore
import getFragmentFromSelection from 'draft-js/lib/getFragmentFromSelection';
import {ContentState, Editor, EditorState, Modifier} from 'draft-js';
import * as clipboard from 'clipboard-polyfill/text';
import {v4 as uuid} from 'uuid';
import {editorDecorator} from './foutainDecorators';
import {Scrap} from '../../protos_v2';
import {durationStringToSeconds} from '../utils/durationUtils';
import {ScrapDetailsProps, ScrapDetailsState} from './ScrapDetails';

export function getSelectedText(editorState: EditorState): string {
  const selected = getFragmentFromSelection(editorState);
  return (selected ? selected.map((x: { getText: () => any; }) => x.getText()).join('\n') : '') as string;
}

export function onCut(
    editor: Editor,
    e: any,
    removeWhenDone: boolean,
    editorState: EditorState,
    setState: (newState: any) => void): void
{
  e.preventDefault();

  const selectedText = getSelectedText(editorState);
  clipboard.writeText(selectedText).then(() => {
    if (!removeWhenDone) {
      return;
    }

    const newContentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        ''
    );

    setState({editorState: EditorState.set(editorState, {currentContent: newContentState})});
  });
}


export function addChildScrap(
    editorState: EditorState,
    onScrapCreate: (scrap: Scrap) => void,
    setState: (newState: any, callback: () => void) => void,
    then: () => void
): void {
  const currentSelection = editorState.getSelection();

  const currentlySelectedText = getSelectedText(editorState);

  const newScrapId = uuid();

  const newScrap = Scrap.create({
    id: newScrapId,
    synopsis: 'New Scrap created in editor',
    prose: 'this has placeholder content for now',
  });
  if (!!currentlySelectedText.trim().length) {
    newScrap.prose = currentlySelectedText;
  }

  onScrapCreate(newScrap);

  const thingToInsert = '\n{{' + newScrapId + '}}\n';

  const newContentState = currentSelection.isCollapsed() ?
      Modifier.insertText(
          editorState.getCurrentContent(),
          currentSelection,
          thingToInsert
      ) : Modifier.replaceText(
          editorState.getCurrentContent(),
          currentSelection,
          thingToInsert
      );

  setState({
    editorState: EditorState.createWithContent(ContentState.createFromText(newContentState.getPlainText()), editorDecorator)
  }, () => {
    then(); // remap
  });
}

export function replacePlaceholderScraps(
    editorState: EditorState,
    onScrapCreate: (scrap: Scrap) => void,
    setState: (newState: any, callback: () => void) => void,
    then: () => void
): void {
  const currentSelection = editorState.getSelection();

  const currentlySelectedText = getSelectedText(editorState);
  let textToSwap = currentlySelectedText;

  let re = new RegExp('{{([^}]+)}}', 'g');
  let match;
  while (match = re.exec(currentlySelectedText)) {
    const textToReplace = match[0];
    const splitText = match[1].split('|');

    if (splitText.length !== 2) {
      continue;
    }

    let intendedDurationSec = 0;
    try {
      intendedDurationSec = durationStringToSeconds(splitText[1].trim());
    } catch {}

    const newScrapId = uuid();

    const newScrap = Scrap.create({
      id: newScrapId,
      synopsis: splitText[0].trim(),
      prose: textToReplace,
      intendedDurationSec: intendedDurationSec
    });


    onScrapCreate(newScrap);

    textToSwap = textToSwap.replace(
        textToReplace,
        '\n{{' + newScrapId + '}}\n'
    );
  }

  const newContentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      currentSelection,
      textToSwap
  );

  setState({
    editorState: EditorState.createWithContent(ContentState.createFromText(newContentState.getPlainText()), editorDecorator)
  }, () => {
    then();
  });
}

export function initializeState(props: ScrapDetailsProps): ScrapDetailsState {
  return {
    editorState: buildInitialEditorState(props),
    lastEmittedStr: '',
    scrapId: props.scrapId,
    durationErrorString: null,
    actualDurationSec: 0,
    parentScrapIds: buildParentScrapIds(props),
    parseErrorState: false,
    durationInputKey: 'duration-key-' + Date.now(),
    focusMode: false,
  };
}

function buildInitialEditorState(props: ScrapDetailsProps): EditorState {
  let thisScrap = props.scrapMap[props.scrapId];

  if (!thisScrap) {
    return EditorState.createEmpty();
  }

  return EditorState.createWithContent(ContentState.createFromText(thisScrap.prose), editorDecorator)
}

function buildParentScrapIds(props: ScrapDetailsProps): string[] {
  const thisScrap = props.scrapMap[props.scrapId];
  const parentScraps = [];
  for (let key in props.scrapMap) {
    const scrap = props.scrapMap[key] as Scrap;
    if (scrap.childScraps.includes(thisScrap.id)) {
      parentScraps.push(scrap.id);
    }
  }

  return parentScraps;
}
