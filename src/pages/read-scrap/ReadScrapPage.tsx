import { RouteComponentProps } from 'react-router';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {ScrapMap, selectScrapMap} from '../../features/scrapList/scrapListSlice';
import React, {Component} from 'react';
import {ContentBlock} from 'draft-js';
import {fetchParsedContentBlocksForScrap} from '../../features/utils/fetchParsedContentBlocksForScrap';
import {TimelineViewer} from '../../features/timeline/Timeline';
import {ReadOnlyViewer} from '../../features/scrapDetails/ReadOnlyViewer';
import {HeaderOptions, updateHeaderOptions} from '../../features/revision-header/headerOptionsSlice';

interface MatchParams {
  id: string
}

interface ReadScrapProps extends RouteComponentProps<MatchParams> {}

export default function ReadScrapPage (props: ReadScrapProps) {
  const scrapMap = useAppSelector(selectScrapMap);
  const dispatch = useAppDispatch();

  dispatch(() => updateHeaderOptions({
    currentScrapId: props.match.params.id,
    showReadLink: false,
    showEditLink: true,
  }));

  return (
      <ReadScrap
          scrapId={props.match.params.id}
          scrapMap={scrapMap}
          onUpdateHeaderOptions={(headerOptions) => dispatch(updateHeaderOptions(headerOptions))}
      />
  )
}

interface ReadPageProps {
  scrapId: string;
  scrapMap: ScrapMap;
  onUpdateHeaderOptions: (headerOptions: HeaderOptions) => void;
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

    setTimeout(() => {
      const parsedBlocks = fetchParsedContentBlocksForScrap(props.scrapId, [], props.scrapMap);

      this.setState({
        hasLoaded: true,
        parsedContentBlocks: parsedBlocks,
      });

    }, 50);
  }

  componentDidMount() {
    this.props.onUpdateHeaderOptions({
      currentScrapId: this.state.scrapId,
      showReadLink: false,
      showEditLink: true,
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
          parsedContentBlocks={this.state.parsedContentBlocks}/>
      <ReadOnlyViewer
          scrapId={this.state.scrapId}
          scrapMap={this.props.scrapMap}
          parsedContentBlocks={this.state.parsedContentBlocks}/>
    </div>
  }
}
