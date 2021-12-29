import {StoryMap} from '../storyList/storyListSlice';
import {ScrapMap} from '../scrapList/scrapListSlice';
import React, {Component, ReactElement} from 'react';
import * as clipboard from "clipboard-polyfill/text";
import {Editor, EditorState, ContentState, Modifier} from 'draft-js';
// @ts-ignore
import getFragmentFromSelection from 'draft-js/lib/getFragmentFromSelection';
import 'draft-js/dist/Draft.css';
import {Scrap, Story} from '../../protos_v2';
import {Breadcrumb, BreadcrumbDivider, BreadcrumbSection, Button, Form, Segment, Tab} from 'semantic-ui-react';
import {
  Link
} from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import debounce from 'debounce';
import {createChildScrap} from './ScrapEmbedComponent';
import {durationSecondsToString, durationStringToSeconds} from '../utils/durationUtils';
import {isArrayEqualToImmutableSet, parseAllProse} from './parseProse';
import {editorDecorator} from './foutainDecorators';
import {ReadOnlyViewer} from './ReadOnlyViewer';
import {FOUNTAIN_EDITOR_STYLE} from './usefulConstants';
import {TimelineViewer} from '../timeline/Timeline';

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
  durationInputKey: string;
}



const styleMap = {
  'GREEN': {
    color: 'green'
  },
}

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
      durationInputKey: 'duration-key-' + Date.now(),
    };
  }

  buildInitialEditorState(props: ScrapDetailsProps): EditorState {
    let thisScrap = props.scrapMap[props.scrapId];

    if (!thisScrap) {
      return EditorState.createEmpty();
    }

    return EditorState.createWithContent(ContentState.createFromText(thisScrap.prose), editorDecorator)
  }

  componentDidUpdate(prevProps: Readonly<ScrapDetailsProps>, prevState: Readonly<ScrapDetailsState>, snapshot?: any) {
    if (this.state.scrapId === this.props.scrapId) {
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
        <div style={{display: 'flex'}}>
          <div style={{flex: 1, margin: '16px 0'}}>
            <Form.Input
                label='Synopsis'
                defaultValue={thisScrap.synopsis}
                onChange={(e) => this.onSynopsisChange(e.target.value)}
            />
          </div>
          <div style={{flex: 1, margin: '16px'}}>
            <Form.Input
                key={this.state.durationInputKey}
                style={{flex: 1}}
                label='Intended Duration (HH:MM:SS)'
                defaultValue={durationSecondsToString(thisScrap.intendedDurationSec)}
                error={this.state.durationErrorString}
                onChange={(e) => this.onDurationChange(e.target.value)}
            />
          </div>
          <div style={{flex: 1, margin: 'auto'}}>
            <Form.Field>
              <label>
                Current Actual Duration: {durationSecondsToString(this.state.actualDurationSec)}
              </label>
              <Button
                  onClick={() => this.updateExpectedDurationSec()}
                  disabled={this.state.actualDurationSec === thisScrap.intendedDurationSec}
              >
                Update expected duration
              </Button>
            </Form.Field>
          </div>

        </div>
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

  updateExpectedDurationSec(): void {
    const scrap = this.props.scrapMap[this.props.scrapId] as Scrap;

    scrap.intendedDurationSec = this.state.actualDurationSec;
    this.props.onScrapUpdate(scrap);
    this.setState({
      durationInputKey: 'duration-key-' + Date.now()
    });
    this.setDurationErrorString(false);
  }

  getProseEditorToolbar(): ReactElement {
    const parseWarning = this.state.parseErrorState ?
        (<div style={{color: 'red'}}>Parsing took too long, please break into smaller chunks</div>) : null;

    return <div>
      <div>
        <button onClick={() => this.addChildScrap()}>Add child scrap</button>
      </div>
      {parseWarning}
    </div>;
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

    if (newStrToEmit === this.state.lastEmittedStr) {
      return; // No need to update
    }

    this.persistProse(newStrToEmit);

    const parseResult = parseAllProse(this.state.editorState.getCurrentContent(), this.props.scrapMap,50, 500);

    // Check to see if we need to update the scrap b/c the references to child scraps changed
    const thisScrap = this.props.scrapMap[this.props.scrapId];

    if (!isArrayEqualToImmutableSet(parseResult.childScraps, thisScrap.childScraps)) {
      const newScrap = Scrap.create({
        ...thisScrap,
        childScraps: [ ...(parseResult.childScraps.toArray()) ]
      });

      this.props.onScrapUpdate(newScrap);
    }

    this.setState({
      editorState: EditorState.set(this.state.editorState, {currentContent: parseResult.contentState}),
      lastEmittedStr: newStrToEmit,
      actualDurationSec: Math.round(parseResult.totalDurationSec),
      parseErrorState: parseResult.showTimeoutWarning,
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

    const tabStyle = {
      height: 'calc(100% - 43px)', // Offset to account for tab height
      display: 'flex',
      flexDirection: 'column'
    }

    const panes = [
      { menuItem: 'Write', render: () => <Tab.Pane style={tabStyle}>
          {this.getBreadcrumbs(thisScrap)}
          {this.getPrimaryForm(thisScrap)}
          {this.getProseEditorToolbar()}
          <div
              onClick={() => {this.focus()}}
              style={FOUNTAIN_EDITOR_STYLE}>
            <Editor
                customStyleMap={styleMap}
                stripPastedStyles={true}
                onCut={(editor, e) => {this.onCut(editor, e, true);}}
                onCopy={(editor, e) => {this.onCut(editor, e, false);}}
                editorState={this.state.editorState}
                ref={(ref) => {this.setDomEditorRef(ref);}}
                onChange={(newState) => {this.onProseChange(newState); }}/>
          </div>
        </Tab.Pane>},
      { menuItem: 'Read', render: () => <Tab.Pane style={tabStyle}>
          <TimelineViewer
              scrapId={this.state.scrapId}
              scrapMap={this.props.scrapMap}/>
          <ReadOnlyViewer
            scrapId={this.state.scrapId}
            scrapMap={this.props.scrapMap}/>
      </Tab.Pane>},
    ]

    return (
        <Tab style={{height: '100%'}} key={'scrap-details-' + this.props.scrapId} panes={panes} />
    );
  }

}
