import {ScrapMap} from '../scrapList/scrapListSlice';
import {Editor, ContentState, EditorState} from 'draft-js';
import {Component, ReactElement} from 'react';
import {viewerDecorator} from './foutainDecorators';
import {FOUNTAIN_EDITOR_STYLE} from './usefulConstants';
import {fetchParsedContentBlocksForScrap} from '../utils/fetchParsedContentBlocksForScrap';

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

    const parsedBlocks = fetchParsedContentBlocksForScrap(props.scrapId, [], this.props.scrapMap);

    return EditorState.createWithContent(
        ContentState.createFromBlockArray(
            parsedBlocks),
        viewerDecorator);
  }

  normalizeProse(prose: string): string {
    return prose; // TODO: actually normalize things, remove comments, normalize whitespace
  }

  render(): ReactElement {
    return <div
        style={FOUNTAIN_EDITOR_STYLE}>
      <Editor
        readOnly
        onChange={() => {}}
        editorState={this.state.editorState}
      />
    </div>
  }

}
