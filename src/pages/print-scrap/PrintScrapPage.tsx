import { RouteComponentProps } from 'react-router';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {ScrapMap, selectScrapMap} from '../../features/scrapList/scrapListSlice';
import React, {Component} from 'react';
import {ContentBlock} from 'draft-js';
import {fetchParsedContentBlocksForScrap} from '../../features/utils/fetchParsedContentBlocksForScrap';
import {HeaderOptions, readHeaderOptions, updateHeaderOptions} from '../../features/revision-header/headerOptionsSlice';
import {renderExamplePDF} from './savePDF';
import {selectContactInfo} from './contactInfoSlice';
import {durationSecContribution} from '../../features/scrapDetails/usefulConstants';

interface MatchParams {
  id: string
}

interface PrintScrapProps extends RouteComponentProps<MatchParams> {}

export default function PrintScrapPage (props: PrintScrapProps) {
  const scrapMap = useAppSelector(selectScrapMap);
  const dispatch = useAppDispatch();
  const headerOptions = useAppSelector(readHeaderOptions);
  const contactInfo = useAppSelector(selectContactInfo);

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
          author={contactInfo.author}
          contactInfo={contactInfo.contactInfo}
      />
  )
}

export interface PrintPageProps {
  scrapId: string;
  scrapMap: ScrapMap;
  onUpdateHeaderOptions: (headerOptions: HeaderOptions) => void;
  headerOptions: HeaderOptions;
  author: string;
  contactInfo: string;
}

interface PrintPageState {
  scrapId: string;
  hasLoaded: boolean;
  alreadyWarned: boolean;
  durationPages: number;
  parsedContentBlocks: ContentBlock[];
}

export class PrintScrap extends Component<PrintPageProps, PrintPageState> {

  constructor(props: PrintPageProps) {
    super(props);

    this.state = {
      scrapId: props.scrapId,
      hasLoaded: false,
      alreadyWarned: false,
      durationPages: 0,
      parsedContentBlocks: [],
    };
  }

  componentDidMount() {
    const parsedBlocks = fetchParsedContentBlocksForScrap(this.props.scrapId, [], this.props.scrapMap);

    let totalDurationSec = 0;
    parsedBlocks.forEach((block) => {
      const blockData = block.getData();
      const durationSec = (blockData.get(durationSecContribution) || 0) as number;
      totalDurationSec += durationSec;
    });

    this.setState({
      hasLoaded: true,
      parsedContentBlocks: parsedBlocks,
      alreadyWarned: (totalDurationSec <= 60 * 5),
      durationPages: Math.ceil(totalDurationSec / 60),
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

    if (!this.state.alreadyWarned) {
      return <div style={{
        margin: '24px'
      }}>
        <p>Long PDFs can take a bit to render (this one will be about {this.state.durationPages} pages).</p>
        <p>Click the following button to render, and then please be patient :) </p>
        <button onClick={() => {
          this.setState({
            alreadyWarned: true
          });
        }}>
          Render PDF
        </button>
      </div>
    }


    return <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
      {renderExamplePDF(this.props, this.state.parsedContentBlocks)}
    </div>;
  }
}
