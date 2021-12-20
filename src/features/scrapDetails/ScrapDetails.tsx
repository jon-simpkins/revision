import {StoryMap} from '../storyList/storyListSlice';
import {ScrapMap} from '../scrapList/scrapListSlice';
import React, {Component, ReactElement} from 'react';
import * as Immutable from 'immutable';
import * as clipboard from "clipboard-polyfill/text";
import {Editor, EditorState, ContentState, CompositeDecorator, Modifier, ContentBlock} from 'draft-js';
// @ts-ignore
import getFragmentFromSelection from 'draft-js/lib/getFragmentFromSelection';
import 'draft-js/dist/Draft.css';
import {Scrap, Story} from '../../protos_v2';
import {Breadcrumb, BreadcrumbDivider, BreadcrumbSection, Form, Segment} from 'semantic-ui-react';
import {
  Link
} from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import debounce from 'debounce';
import {createChildScrap, ScrapEmbedComponent, scrapEmbeddingStrategy} from './ScrapEmbedComponent';
import {durationSecondsToString, durationStringToSeconds} from '../utils/durationUtils';
import {processProseBlock, ProcessProgress, isArrayEqualToImmutableSet, preProcessProseBlock} from './parseProse';
import {FountainHeaderComponent, fountainHeaderStrategy} from './FountainHeaderComponent';
import {FountainTransitionComponent, fountainTransitionStrategy} from './FountainTransitionComponent';
import {FountainCenteredComponent, fountainCenteredStrategy} from './FountainCenteredComponent';
import {CommentComponent, commentStrategy} from './CommentComponent';
import {isComment, isCommentEnd, isCommentStart} from './usefulConstants';
import {FountainCharacterComponent, fountainCharacterStrategy} from './FountainCharacterComponent';
import {FountainDialogueComponent, fountainDialogueStrategy} from './FountainDialogueComponent';
import {FountainParentheticalComponent, fountainParentheticalStrategy} from './FountainParentheticalComponent';

interface ScrapDetailsProps {
  scrapId: string;
  storyMap: StoryMap;
  scrapMap: ScrapMap;
  onScrapCreate: (scrap: Scrap) => void;
  onScrapUpdate: (scrap: Scrap) => void;
}

interface ScrapDetailsState {
  editorState: EditorState;
  lastEmittedStr: string;
  scrapId: string;
  durationErrorString: string|null;
  parseErrorState: boolean;
  actualDurationSec: number;
  parentScrapIds: string[];
}

const compositeDecorator = new CompositeDecorator([
  {
    strategy: scrapEmbeddingStrategy,
    component: ScrapEmbedComponent,
  },
  {
    strategy: fountainHeaderStrategy,
    component: FountainHeaderComponent,
  },
  {
    strategy: fountainTransitionStrategy,
    component: FountainTransitionComponent,
  },
  {
    strategy: fountainCenteredStrategy,
    component: FountainCenteredComponent,
  },
  {
    strategy: fountainCharacterStrategy,
    component: FountainCharacterComponent,
  },
  {
    strategy: fountainDialogueStrategy,
    component: FountainDialogueComponent,
  },
  {
    strategy: fountainParentheticalStrategy,
    component: FountainParentheticalComponent,
  },
  {
    strategy: commentStrategy,
    component: CommentComponent,
  },
]);

const styleMap = {
  'GREEN': {
    color: 'green'
  },
}

const warnParsingThreshold = 50; // The point where there's a noticeable lag
const errorParsingThreshold = 500;

export default class ScrapDetails extends Component<ScrapDetailsProps, ScrapDetailsState> {
  domEditor: any;

  constructor(props: ScrapDetailsProps) {
    super(props);

    this.state = this.initializeState(props);
    this.remapEditorContent();
  }

  initializeState(props: ScrapDetailsProps): ScrapDetailsState {
    return {
      editorState: this.buildInitialEditorState(props),
      lastEmittedStr: '',
      scrapId: props.scrapId,
      durationErrorString: null,
      actualDurationSec: 0,
      parentScrapIds: this.buildParentScrapIds(props),
      parseErrorState: false,
    };
  }

  buildInitialEditorState(props: ScrapDetailsProps): EditorState {
    let thisScrap = props.scrapMap[props.scrapId];

    if (!thisScrap) {
      return EditorState.createEmpty();
    }

    return EditorState.createWithContent(ContentState.createFromText(thisScrap.prose), compositeDecorator)
  }

  componentDidUpdate(prevProps: Readonly<ScrapDetailsProps>, prevState: Readonly<ScrapDetailsState>, snapshot?: any) {
    if (this.state.scrapId == this.props.scrapId) {
      return;
    }

    // Need to update
    this.setState(this.initializeState(this.props));
    this.remapEditorContent();
  }

  buildParentScrapIds(props: ScrapDetailsProps): string[] {
    const thisScrap = props.scrapMap[this.props.scrapId];
    const parentScraps = [];
    for (let key in props.scrapMap) {
      const scrap = props.scrapMap[key] as Scrap;
      if (scrap.childScraps.includes(thisScrap.id)) {
        parentScraps.push(scrap.id);
      }
    }

    return parentScraps;
  }

  getBreadcrumbs(thisScrap: Scrap): ReactElement {
    let parentStories = thisScrap.stories.map((storyId) => {
      return this.props.storyMap[storyId];
    }).filter(Boolean);

    const parentStoryLinks = parentStories.map<React.ReactNode>(((parentStory: Story) => {
      return (<BreadcrumbSection link>
        <Link to={'/story/' + parentStory.id}>{parentStory.name}</Link>
      </BreadcrumbSection>)
    }));

    let storyContribution;
    if (parentStories.length) {
      storyContribution = (<div>Stories:
        <Breadcrumb>
          {
            parentStoryLinks.reduce((prev, curr) => [prev, <BreadcrumbDivider icon='right chevron' />, curr])
          }
        </Breadcrumb>
      </div>);
    } else {
      storyContribution = (<div>No parent stories</div>);
    }

    const parentScraps = this.state.parentScrapIds.map((scrapId) => {
        return this.props.scrapMap[scrapId];
      }).filter(Boolean);

    const parentScrapLinks = parentScraps.map<React.ReactNode>(((parentScrap: Scrap) => {
      return (<BreadcrumbSection link>
        <Link to={'/scrap/' + parentScrap.id}>{parentScrap.synopsis}</Link>
      </BreadcrumbSection>)
    }));

    let scrapContribution;
    if (parentScraps.length) {
      scrapContribution = (<div>Scraps:
        <Breadcrumb>
          {
            parentScrapLinks.reduce((prev, curr) => [prev, <BreadcrumbDivider icon='right chevron' />, curr])
          }
        </Breadcrumb>
      </div>);
    } else {
      scrapContribution = (<div>No parent scraps</div>);
    }

    return (<div>
      {storyContribution}
      {scrapContribution}
    </div>);
  }

  onSynopsisChange(newSynopsis: string) {
    const scrap = this.props.scrapMap[this.props.scrapId] as Scrap;

    scrap.synopsis = newSynopsis;
    this.props.onScrapUpdate(scrap);
  }

  getPrimaryForm(thisScrap: Scrap): ReactElement {
    return <Segment>
      <Form>
        <Form.Group widths='equal'>
          <Form.Input
              label='Synopsis'
              defaultValue={thisScrap.synopsis}
              onChange={(e) => this.onSynopsisChange(e.target.value)}
          />
          <Form.Input
              label='Intended Duration (HH:MM:SS)'
              defaultValue={durationSecondsToString(thisScrap.intendedDurationSec)}
              error={this.state.durationErrorString}
              onChange={(e) => this.onDurationChange(e.target.value)}
          />
        </Form.Group>
      </Form>
    </Segment>
  }

  onDurationChange(newDuration: string) {
    let durationSec;
    try {
      durationSec = durationStringToSeconds(newDuration);
    } catch {
      return this.setDurationErrorString(true);
    }

    const scrap = this.props.scrapMap[this.props.scrapId] as Scrap;

    scrap.intendedDurationSec = durationSec;
    this.props.onScrapUpdate(scrap);
    this.setDurationErrorString(false);
  }

  setDurationErrorString(hasError: boolean) {
    this.setState({
      durationErrorString: hasError ? 'Please enter a duration of format HH:MM:SS' : null
    });
  }

  getProseEditor(): ReactElement {
    return <div
        onClick={() => {this.focus()}}
        style={{border: '1px solid', padding: '48px', minHeight: '300px', maxHeight: '500px', overflowY: 'scroll', fontSize: '16px', fontFamily: 'CourierPrime, Courier, monospace'}}>
      <Editor
        customStyleMap={styleMap}
        stripPastedStyles={true}
        onCut={(editor, e) => {this.onCut(editor, e, true);}}
        onCopy={(editor, e) => {this.onCut(editor, e, false);}}
        editorState={this.state.editorState}
        ref={(ref) => {this.setDomEditorRef(ref);}}
        onChange={(newState) => {this.onProseChange(newState); }}/></div>;
  }

  setDomEditorRef(ref: any) {
    this.domEditor = ref;
  }

  focus(): void {
    this.domEditor.focus();
  }

  onProseChange(newState: EditorState): void {
    this.setState({editorState: newState});

    this.remapEditorContent(); // Restyle, but only after things settle down a bit
  }

  getSelectedText(): string {
    const editorState = this.state.editorState;
    const selected = getFragmentFromSelection(editorState);
    return (selected ? selected.map((x: { getText: () => any; }) => x.getText()).join('\n') : '') as string;
  }

  onCut(editor: Editor, e: any, removeWhenDone: boolean): void {
    e.preventDefault();

    const editorState = this.state.editorState;
    const selectedText = this.getSelectedText();
    clipboard.writeText(selectedText).then(() => {
      if (!removeWhenDone) {
        return;
      }

      const newContentState = Modifier.replaceText(
          editorState.getCurrentContent(),
          editorState.getSelection(),
          ''
      );

      this.setState({editorState: EditorState.set(editorState, {currentContent: newContentState})});
    });
  }

  persistProse(newProseStr: string): void {
    const scrap = this.props.scrapMap[this.props.scrapId] as Scrap;

    scrap.prose = newProseStr;
    this.props.onScrapUpdate(scrap);
  }

  remapEditorContent = debounce(() => {
    const newStrToEmit = this.state.editorState.getCurrentContent().getPlainText();

    if (newStrToEmit == this.state.lastEmittedStr) {
      return; // No need to update
    }

    this.persistProse(newStrToEmit);

    let newParseErrorState = false;

    let processProgress = {
      processStartEpoch: Date.now(),
      currentDurationSec: 0,
      childScraps: Immutable.OrderedSet<string>()
    } as ProcessProgress;

    const currentContent = this.state.editorState.getCurrentContent();

    let currentBlockMap = currentContent.getBlockMap();
    // @ts-ignore
    const blockKeys = [ ...currentBlockMap.keys()];

    for (let i = 0; i < blockKeys.length; i++) {
      const nextKey = blockKeys[i];
      currentBlockMap = currentBlockMap.set(nextKey, preProcessProseBlock(currentBlockMap.get(nextKey)));

      const timeSoFar = Date.now() - processProgress.processStartEpoch;
      if (timeSoFar > warnParsingThreshold) {
        newParseErrorState = true;
      }
      if (timeSoFar > errorParsingThreshold) {
        break;
      }
    }

    // Mark all comment blocks as such
    let currentlyInComment = false;
    for (let i = 0; i < blockKeys.length; i++) {
      const nextKey = blockKeys[i];
      const blockData = currentBlockMap.get(nextKey).getData().toJS();
      if (blockData[isCommentStart]) {
        currentlyInComment = true;
      }

      if (currentlyInComment) {
        const currentBlock = currentBlockMap.get(nextKey);

        blockData[isComment] = true;
        const updatedData = Immutable.fromJS(blockData);

        const updatedBlock = currentBlock.set('data', updatedData) as ContentBlock;
        currentBlockMap = currentBlockMap.set(nextKey, updatedBlock);
      }

      if (blockData[isCommentEnd]) {
        currentlyInComment = false;
      }
      const timeSoFar = Date.now() - processProgress.processStartEpoch;
      if (timeSoFar > warnParsingThreshold) {
        newParseErrorState = true;
      }
      if (timeSoFar > errorParsingThreshold) {
        break;
      }
    }

    for (let i = 0; i < blockKeys.length; i++) {
      const blockBefore = i > 0 ? currentBlockMap.get(blockKeys[i - 1]) : null;
      const nextKey = blockKeys[i];
      const blockAfter = i + 1 < blockKeys.length ? currentBlockMap.get(blockKeys[i + 1]) : null;

      const update = processProseBlock(currentBlockMap.get(nextKey), blockBefore, blockAfter, processProgress, this.props.scrapMap);

      processProgress = update.processProgress;

      currentBlockMap = currentBlockMap.set(nextKey, update.contentBlock);
      const timeSoFar = Date.now() - processProgress.processStartEpoch;
      if (timeSoFar > warnParsingThreshold) {
        newParseErrorState = true;
      }
      if (timeSoFar > errorParsingThreshold) {
        break;
      }
    }

    const newContent = currentContent.set('blockMap', currentBlockMap) as ContentState;

    const durationMs = Date.now() - processProgress.processStartEpoch;
    console.log('Update took: ' + durationMs);

    // Check to see if we need to update the scrap b/c the references to child scraps changed
    const thisScrap = this.props.scrapMap[this.props.scrapId];

    if (!isArrayEqualToImmutableSet(processProgress.childScraps, thisScrap.childScraps)) {
      const newScrap = Scrap.create({
        ...thisScrap,
        childScraps: [ ...(processProgress.childScraps.toArray()) ]
      });

      this.props.onScrapUpdate(newScrap);
    }

    this.setState({
      editorState: EditorState.set(this.state.editorState, {currentContent: newContent}),
      lastEmittedStr: newStrToEmit,
      actualDurationSec: processProgress.currentDurationSec,
      parseErrorState: newParseErrorState,
    });
  }, 200);

  addChildScrap(): void {
    const editorState = this.state.editorState;
    const currentSelection = editorState.getSelection();

    const currentlySelectedText = this.getSelectedText();

    const newScrapId = uuid();

    const newScrap = createChildScrap(this.props.scrapId, this.props.scrapMap, newScrapId);
    if (!!currentlySelectedText.trim().length) {
      newScrap.prose = currentlySelectedText;
    }

    this.props.onScrapCreate(newScrap);

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

    this.setState({
      editorState: EditorState.set(editorState, {currentContent: newContentState})
    });

    this.remapEditorContent();
  }



  render() {
    let thisScrap = this.props.scrapMap[this.props.scrapId];

    if (!thisScrap) {
      return (
          <div>Whoops, could not find scrap</div>
      );
    }

    const parseWarning = this.state.parseErrorState ?
        (<div style={{color: 'red'}}>Parsing took too long, please break into smaller chunks</div>) : null;

    return (
        <div style={{margin: '24px'}} key={'scrap-details-' + this.props.scrapId}>
          {this.getBreadcrumbs(thisScrap)}
          {this.getPrimaryForm(thisScrap)}
          <div>
            <span>Actual duration: {durationSecondsToString(this.state.actualDurationSec)}</span>
            <button onClick={() => this.addChildScrap()}>Add child scrap</button>
          </div>
          {parseWarning}

          {this.getProseEditor()}
        </div>
    );
  }

}
