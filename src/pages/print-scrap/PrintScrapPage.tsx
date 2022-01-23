import { RouteComponentProps } from 'react-router';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {ScrapMap, selectScrapMap} from '../../features/scrapList/scrapListSlice';
import React, {Component} from 'react';
import {ContentBlock} from 'draft-js';
import {fetchParsedContentBlocksForScrap} from '../../features/utils/fetchParsedContentBlocksForScrap';
import {HeaderOptions, readHeaderOptions, updateHeaderOptions} from '../../features/revision-header/headerOptionsSlice';
import {renderExamplePDF} from './savePDF';

interface MatchParams {
  id: string
}

interface PrintScrapProps extends RouteComponentProps<MatchParams> {}

export default function PrintScrapPage (props: PrintScrapProps) {
  const scrapMap = useAppSelector(selectScrapMap);
  const dispatch = useAppDispatch();
  const headerOptions = useAppSelector(readHeaderOptions);

  return (
      <PrintScrap
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

export interface PrintPageProps {
  scrapId: string;
  scrapMap: ScrapMap;
  onUpdateHeaderOptions: (headerOptions: HeaderOptions) => void;
  headerOptions: HeaderOptions;
}

interface PrintPageState {
  scrapId: string;
  hasLoaded: boolean;
  parsedContentBlocks: ContentBlock[];
}

export class PrintScrap extends Component<PrintPageProps, PrintPageState> {

  constructor(props: PrintPageProps) {
    super(props);

    this.state = {
      scrapId: props.scrapId,
      hasLoaded: false,
      parsedContentBlocks: [],
    };
  }

  componentDidMount() {
    const parsedBlocks = fetchParsedContentBlocksForScrap(this.props.scrapId, [], this.props.scrapMap);

    this.setState({
      hasLoaded: true,
      parsedContentBlocks: parsedBlocks,
    });

    this.props.onUpdateHeaderOptions({
      ...this.props.headerOptions,
      currentScrapId: this.state.scrapId,
      showReadLink: true,
      showEditLink: true,
      showPrintLink: false,
    });
  }

  render() {
    if (!this.state.hasLoaded) {
      return <div> ... loading ...</div>
    }

    return <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
      {renderExamplePDF(this.props, this.state.parsedContentBlocks)}
    </div>;
  }
}
