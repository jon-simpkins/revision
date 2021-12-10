import {StoryMap} from '../storyList/storyListSlice';
import {ScrapMap} from '../scrapList/scrapListSlice';
import React, {Component, ReactElement} from 'react';
import * as Immutable from 'immutable';
import * as clipboard from "clipboard-polyfill/text";
import {ContentBlock, Editor, EditorState, ContentState, CompositeDecorator, CharacterMetadata, Modifier} from 'draft-js';
// @ts-ignore
import getFragmentFromSelection from 'draft-js/lib/getFragmentFromSelection';
import 'draft-js/dist/Draft.css';
import {Scrap} from '../../protos_v2';
import {Breadcrumb, BreadcrumbSection, Form, Segment} from 'semantic-ui-react';
import {
  Link
} from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import debounce from 'debounce';
import {createChildScrap, ScrapEmbedComponent} from './ScrapEmbedComponent';

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
}

const compositeDecorator = new CompositeDecorator([
    {
    strategy: scrapEmbeddingStrategy,
    component: ScrapEmbedComponent,
  },

]);

function scrapEmbeddingStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
  if (!!contentBlock.getData().get('isScrapEmbedding')) {
    callback(0, contentBlock.getText().length);
  }
}

const styleMap = {
  'GREEN': {
    color: 'green'
  },
}

function applyStyles(character: CharacterMetadata, styles: Immutable.OrderedSet<string>): CharacterMetadata {
  return (character as any).set('style', styles) as CharacterMetadata;
}

export default class ScrapDetails extends Component<ScrapDetailsProps, ScrapDetailsState> {
  domEditor: any;

  constructor(props: ScrapDetailsProps) {
    super(props);

    this.state = {
      editorState: this.buildInitialEditorState(props),
      lastEmittedStr: '',
      scrapId: props.scrapId,
    };
    this.remapEditorContent();
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
    this.setState({
      editorState: this.buildInitialEditorState(this.props),
      lastEmittedStr: '',
      scrapId: this.props.scrapId
    });
    this.remapEditorContent();
  }

  getBreadcrumbs(thisScrap: Scrap): ReactElement {
    let parentStories = thisScrap.stories.map((storyId) => {
      return this.props.storyMap[storyId];
    }).filter(Boolean);

    return (<div>
      {
        parentStories.map((parentStory, idx) => {
          return (<Breadcrumb>
            <BreadcrumbSection link>
              <Link to={'/story/' + parentStory.id}>{parentStory.name}</Link>
            </BreadcrumbSection>
          </Breadcrumb>)
        })
      }
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
        </Form.Group>
      </Form>
    </Segment>
  }

  getProseEditor(): ReactElement {
    return <div
        onClick={() => {this.focus()}}
        style={{border: '1px solid', padding: '0', minHeight: '300px', fontFamily: 'CourierPrime, Courier, monospace'}}>
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

  onCut(editor: Editor, e: any, removeWhenDone: boolean): void {
    e.preventDefault();

    const editorState = this.state.editorState;
    const selected = getFragmentFromSelection(editorState);
    const selectedText = (selected ? selected.map((x: { getText: () => any; }) => x.getText()).join('\n') : '') as string;
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

    const initialTime = Date.now();

    const currentContent = this.state.editorState.getCurrentContent();

    const currentBlockMap = currentContent.getBlockMap();
    const newBlockMap = currentBlockMap.map((contentBlock, key) => {
      if (!contentBlock) {
        return contentBlock;
      }

      let blockData: { [index: string]: boolean|string} = {};
      let applyCharacterStyles = true;

      let blockText = contentBlock.getText().trim();

      if (blockText.startsWith('{{') && blockText.endsWith('}}')) {
        applyCharacterStyles = false;
        blockData['isScrapEmbedding'] = true;
        blockData['scrapLink'] = blockText.replace('{{', '').replace('}}', '').trim();
      }

      const updatedBlock = contentBlock.set('data', Immutable.fromJS(blockData)) as ContentBlock;

      const updatedCharacterList = updatedBlock.getCharacterList().map((c, idx) => {
        if (!c || !applyCharacterStyles) { return c; }


        // @ts-ignore
        if (idx < 5) {
          return applyStyles(c, Immutable.OrderedSet.of('BOLD', 'GREEN'));
        } else {
          return applyStyles(c, Immutable.OrderedSet());
        }
      });

      return updatedBlock.set('characterList', updatedCharacterList);
    });

    const newContent = currentContent.set('blockMap', newBlockMap) as ContentState;

    const durationMs = Date.now() - initialTime;
    console.log('Update took: ' + durationMs);

    this.setState({
      editorState: EditorState.set(this.state.editorState, {currentContent: newContent}),
      lastEmittedStr: newStrToEmit,
    });
  }, 200);

  insertExampleText(): void {
    const editorState = this.state.editorState;
    const currentSelection = editorState.getSelection();

    const newScrapId = uuid();

    const newScrap = createChildScrap(this.props.scrapId, this.props.scrapMap, newScrapId);
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

    return (
        <div style={{margin: '24px'}} key={'scrap-details-' + this.props.scrapId}>
          {this.getBreadcrumbs(thisScrap)}
          {this.getPrimaryForm(thisScrap)}
          <button onClick={() => this.insertExampleText()}>Insert something!</button>
          {this.getProseEditor()}
        </div>
    );
  }

}
