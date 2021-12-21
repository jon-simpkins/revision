import {ScrapMap} from '../scrapList/scrapListSlice';
import {Editor, ContentState, EditorState} from 'draft-js';
import {Component, ReactElement} from 'react';
import {editorDecorator} from './foutainDecorators';
import {parseAllProse} from './parseProse';

interface ReadOnlyViewerProps {
  scrapId: string;
  scrapMap: ScrapMap;
}

interface ReadOnlyViewerState {
  scrapId: string;
  editorState: EditorState;
}

export class ReadOnlyViewer extends Component<ReadOnlyViewerProps, ReadOnlyViewerState> {

  constructor(props: ReadOnlyViewerProps) {
    super(props);

    this.state = this.initializeState(props);
  }

  initializeState(props: ReadOnlyViewerProps): ReadOnlyViewerState {
    return {
      scrapId: props.scrapId,
      editorState: this.buildInitialEditorState(props)
    };
  }

  componentDidUpdate(prevProps: Readonly<ReadOnlyViewerProps>, prevState: Readonly<ReadOnlyViewerState>, snapshot?: any) {
    if (this.state.scrapId === this.props.scrapId) {
      return;
    }

    // Need to update
    this.setState(this.initializeState(this.props));
  }

  buildInitialEditorState(props: ReadOnlyViewerProps): EditorState {
    let thisScrap = props.scrapMap[props.scrapId];

    if (!thisScrap) {
      return EditorState.createEmpty();
    }

    const initialState = EditorState.createWithContent(ContentState.createFromText(thisScrap.prose), editorDecorator)

    const parseResult = parseAllProse(initialState.getCurrentContent(), this.props.scrapMap,500, 5000);

    return EditorState.set(initialState, {currentContent: parseResult.contentState});
  }

  render(): ReactElement {
    return <div
        style={{
          border: '1px solid',
          padding: '48px',
          minHeight: '300px',
          maxHeight: '500px',
          overflowY: 'scroll',
          fontSize: '16px',
          fontFamily: 'CourierPrime, Courier, monospace'
        }}>
      <Editor
        readOnly
        onChange={() => {}}
        editorState={this.state.editorState}
      />
    </div>
  }

}
