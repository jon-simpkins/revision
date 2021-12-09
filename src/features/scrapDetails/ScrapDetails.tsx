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

import debounce from 'debounce';

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

// Props are:
// https://github.com/facebook/draft-js/blob/main/src/model/decorators/DraftDecorator.js#L54-L71
const DummyComponent1 = (props: any) => {
  return (
      <span style={{border: '1px solid red', display: 'block', padding: '0 4px 12px 20px'}} data-offset-key={props.offsetKey}>{props.children}</span>
  );
}

const compositeDecorator = new CompositeDecorator([
    {
    strategy: dummyStrategy1,
    component: DummyComponent1,
  },

]);

function dummyStrategy1(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
  if (!!contentBlock.getData().get('fountainType')) {
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
  constructor(props: ScrapDetailsProps) {
    super(props);

    this.state = {
      editorState: this.buildInitialEditorState(props),
      lastEmittedStr: '',
      scrapId: props.scrapId,
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
    this.setState({
      editorState: this.buildInitialEditorState(this.props),
      lastEmittedStr: '',
      scrapId: this.props.scrapId
    });
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

  /*onProseChange(newProse: string) {
    const scrap = this.props.scrapMap[this.props.scrapId] as Scrap;

    scrap.prose = newProse;
    this.props.onScrapUpdate(scrap);
  }*/

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
    return <Editor
        customStyleMap={styleMap}
        stripPastedStyles={true}
        onCut={(editor, e) => {this.onCut(editor, e, true);}}
        onCopy={(editor, e) => {this.onCut(editor, e, false);}}
        editorState={this.state.editorState}
        onChange={(newState) => {this.onProseChange(newState); }}/>;
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

      let shouldBeTrue = false;

      if (!!key) {
        const previousBlock = currentContent.getBlockBefore(key);

        if (previousBlock?.getText().startsWith('b')) {
          shouldBeTrue = true;
        }
      }

      if (contentBlock.getData().get('fountainType') == shouldBeTrue) {
        const updatedCharacterList = contentBlock.getCharacterList().map((c, idx) => {
          if (!c) { return c; }

          // @ts-ignore
          if (idx < 10) {
            return applyStyles(c, Immutable.OrderedSet.of('BOLD', 'GREEN'));
          } else {
            return applyStyles(c, Immutable.OrderedSet());
          }
        });

        return contentBlock.set('characterList', updatedCharacterList);
      }

      return contentBlock?.set('data', Immutable.fromJS({fountainType: shouldBeTrue}));
    });

    const newContent = currentContent.set('blockMap', newBlockMap) as ContentState;

    const durationMs = Date.now() - initialTime;
    console.log('Update took: ' + durationMs);

    this.setState({
      editorState: EditorState.set(this.state.editorState, {currentContent: newContent}),
      lastEmittedStr: newStrToEmit,
    });
  }, 200);

  render() {
    let thisScrap = this.props.scrapMap[this.props.scrapId];

    if (!thisScrap) {
      return (
          <div>Whoops, could not find scrap</div>
      );
    }

    return (
        <div style={{margin: '24px'}}>
          {this.getBreadcrumbs(thisScrap)}
          {this.getPrimaryForm(thisScrap)}
          {this.getProseEditor()}
        </div>
    );
  }

}
