import { RouteComponentProps } from 'react-router';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {ScrapMap, selectScrapMap} from '../../features/scrapList/scrapListSlice';
import React, {Component} from 'react';
import {ContentBlock} from 'draft-js';
import {fetchParsedContentBlocksForScrap} from '../../features/utils/fetchParsedContentBlocksForScrap';
import {TimelineViewer} from '../../features/timeline/Timeline';
import {ReadOnlyViewer} from '../../features/scrapDetails/ReadOnlyViewer';
import {HeaderOptions, readHeaderOptions, updateHeaderOptions} from '../../features/revision-header/headerOptionsSlice';
import {fetchCharacters} from '../../features/utils/fetchCharacters';

interface MatchParams {
  id: string
}

interface ReadScrapProps extends RouteComponentProps<MatchParams> {}

export default function ReadScrapPage (props: ReadScrapProps) {
  const scrapMap = useAppSelector(selectScrapMap);
  const dispatch = useAppDispatch();
  const headerOptions = useAppSelector(readHeaderOptions);

  return (
      <ReadScrap
          scrapId={props.match.params.id}
          scrapMap={scrapMap}
          onUpdateHeaderOptions={(newHeaderOptions) => dispatch(updateHeaderOptions(
              {
                ...headerOptions,
                ...newHeaderOptions,
              }))}
          headerOptions={headerOptions}
      />
  )
}

interface ReadPageProps {
  scrapId: string;
  scrapMap: ScrapMap;
  onUpdateHeaderOptions: (headerOptions: HeaderOptions) => void;
  headerOptions: HeaderOptions;
}

interface ReadPageState {
  scrapId: string;
  hasLoaded: boolean;
  parsedContentBlocks: ContentBlock[];
}

export class ReadScrap extends Component<ReadPageProps, ReadPageState> {

  constructor(props: ReadPageProps) {
    super(props);

    this.state = {
      scrapId: props.scrapId,
      hasLoaded: false,
      parsedContentBlocks: [],
    };
  }

  componentDidMount() {
    const parsedBlocks = fetchParsedContentBlocksForScrap(this.props.scrapId, [], this.props.scrapMap);

    const characters = fetchCharacters(parsedBlocks);

    this.setState({
      hasLoaded: true,
      parsedContentBlocks: parsedBlocks,
    });

    this.props.onUpdateHeaderOptions({
      currentScrapId: this.state.scrapId,
      showReadLink: false,
      showEditLink: true,
      characterFilters: characters,
    });
  }

  render() {
    if (!this.state.hasLoaded) {
      return <div> ... loading ...</div>
    }

    return <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
      <TimelineViewer
          scrapId={this.state.scrapId}
          scrapMap={this.props.scrapMap}
          parsedContentBlocks={this.state.parsedContentBlocks}
          currentCharacterFilter={this.props.headerOptions.currentCharacterFilter || ''}
          currentCompletionFilter={this.props.headerOptions.currentCompletionFilter || ''}
      />
      <ReadOnlyViewer
          scrapId={this.state.scrapId}
          scrapMap={this.props.scrapMap}
          parsedContentBlocks={this.state.parsedContentBlocks}/>
    </div>
  }
}
