import {ScrapMap} from '../scrapList/scrapListSlice';
import {Editor, ContentState, EditorState, ContentBlock} from 'draft-js';
import {Component, ReactElement} from 'react';
import {viewerDecorator} from './foutainDecorators';
import {parseAllProse} from './parseProse';
import {isComment, isScrapEmbedding, scrapIdField, scrapLink} from './usefulConstants';

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

    const parsedBlocks = this.fetchParsedContentBlocksForScrap(props.scrapId, [], this.props.scrapMap);

    return EditorState.createWithContent(
        ContentState.createFromBlockArray(
            parsedBlocks),
        viewerDecorator);
  }

  fetchParsedContentBlocksForScrap(scrapId: string, scrapAncestors: string[], scrapMap: ScrapMap): Array<ContentBlock> {
    let prose = scrapMap[scrapId]?.prose || '';

    let newAncestors = [...scrapAncestors, scrapId];

    const initialContentState = ContentState.createFromText(prose);

    const parseResult = parseAllProse(initialContentState, scrapMap, 500, 5000);

    const allNewContentBlocks: Array<ContentBlock> = [];

    parseResult.contentState.getBlocksAsArray().forEach((block) => {
      const blockData = block.getData();

      if (blockData.get(isComment)) {
        // Skip
        return;
      }

      if (!blockData.get(isScrapEmbedding)) {
        // Simple addition, just append the ID of the scrap
        allNewContentBlocks.push(block.set('data', blockData.set(scrapIdField, scrapId)) as ContentBlock);
        return;
      }

      const embeddedScrapId = blockData.get(scrapLink);

      if (!scrapMap[embeddedScrapId]) {
        // Scrap doesn't exist, skip
        return;
      }

      if (newAncestors.includes(embeddedScrapId)) {
        throw Error(`Replacing scrap ${embeddedScrapId} would cause infinite recursion`);
      }

      const subBlocks = this.fetchParsedContentBlocksForScrap(embeddedScrapId, newAncestors, scrapMap);

      allNewContentBlocks.push(...subBlocks);
    });

    return allNewContentBlocks;
  }

  normalizeProse(prose: string): string {
    return prose; // TODO: actually normalize things, remove comments, normalize whitespace
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
