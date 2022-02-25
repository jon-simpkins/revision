import {ScrapMap} from '../scrapList/scrapListSlice';
import React, {Component} from 'react';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import {Scrap} from '../../protos_v2';
import debounce from 'debounce';
import {isArrayEqualToImmutableSet, parseAllProse} from './parseProse';
import {FOUNTAIN_EDITOR_STYLE} from './usefulConstants';
import {HeaderOptions} from '../revision-header/headerOptionsSlice';
import {initializeState, onCut} from './editorInteractionUtils';
import {getBreadcrumbs, getPrimaryForm, getProseEditorToolbar} from './ScrapDetailsHelperComponents';

export interface ScrapDetailsProps {
  scrapId: string;
  scrapMap: ScrapMap;
  onScrapCreate: (scrap: Scrap) => void;
  onScrapUpdate: (scrap: Scrap) => void;
  onScrapDelete: (scrapId: string) => void;
  headerOptions: HeaderOptions;
  onUpdateHeaderOptions: (headerOptions: HeaderOptions) => void;
}

export interface ScrapDetailsState {
  editorState: EditorState;
  lastEmittedStr: string;
  scrapId: string;
  durationErrorString: string|null;
  parseErrorState: boolean;
  actualDurationSec: number;
  parentScrapIds: string[];
  durationInputKey: string;
  focusMode: boolean;
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

    this.state = initializeState(props);
    this.remapEditorContent();
  }

  setHeaderOptions(): void {
    this.props.onUpdateHeaderOptions({
      ...this.props.headerOptions,
      currentScrapId: this.props.scrapId,
      showReadLink: true,
      showEditLink: false,
      showPrintLink: true,
      characterFilters: [],
      currentCharacterFilter: '',
      currentCompletionFilter: '',
      traitFilters: [],
      currentTraitFilter: '',
    });
  }

  componentDidMount() {
    this.setHeaderOptions();
  }

  componentDidUpdate(prevProps: Readonly<ScrapDetailsProps>, prevState: Readonly<ScrapDetailsState>, snapshot?: any) {
    if (this.state.scrapId === this.props.scrapId) {
      return;
    }

    // Need to update
    this.setHeaderOptions();
    this.setState(initializeState(this.props));
    this.remapEditorContent();
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


  render() {
    let thisScrap = this.props.scrapMap[this.props.scrapId];

    if (!thisScrap) {
      return (
          <div>Whoops, could not find scrap</div>
      );
    }

    let noFocusSection = null;
    if (!this.state.focusMode) {
      noFocusSection = <div>
        {getBreadcrumbs(this.state.parentScrapIds, this.props.scrapMap)}
        {getPrimaryForm(
            thisScrap,
            this.state,
            this.props,
            (newState, callback) => { this.setState(newState, callback)}
        )}
      </div>
    }

    return (
        <div style={{height: '100%', display: 'flex', flexDirection: 'column'}} key={'scrap-details-' + this.props.scrapId}>
          {noFocusSection}
          {getProseEditorToolbar(
              this.props,
              this.state,
              this.remapEditorContent,
              (newState, callback) => { this.setState(newState, callback)}
          )}
          <div
              onClick={() => {this.focus()}}
              style={FOUNTAIN_EDITOR_STYLE}>
            <Editor
                customStyleMap={styleMap}
                spellCheck={true}
                stripPastedStyles={true}
                onCut={(editor, e) => {
                  onCut(editor, e, true, this.state.editorState, (newState) => {this.setState(newState);});
                }}
                onCopy={(editor, e) => {
                  onCut(editor, e, false, this.state.editorState, (newState) => {this.setState(newState);});
                }}
                editorState={this.state.editorState}
                ref={(ref) => {this.setDomEditorRef(ref);}}
                onChange={(newState) => {this.onProseChange(newState); }}/>
          </div>
        </div>
    );
  }

}
