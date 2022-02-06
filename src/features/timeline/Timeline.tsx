import {ScrapMap} from '../scrapList/scrapListSlice';
import React, {Component} from 'react';
import {Button, Icon, Popup} from 'semantic-ui-react';
import {durationSecondsToString} from '../utils/durationUtils';
import {parseTimeline} from './timelineParsing';
import {
  Link
} from 'react-router-dom';
import {ContentBlock} from 'draft-js';
import {Scrap} from '../../protos_v2';

function formatPercentString(percent: number): string {
  return `${percent}%`;
}

export class TimelineBlock {
  headerText: string;
  id: string;
  startSec: number;
  durationSec: number;
  characters: Set<string>;
  completeness: Scrap.Completeness;
  traits: Set<string>

  constructor(headerText: string, id: string, startSec: number, durationSec: number, completeness: Scrap.Completeness) {
    this.headerText = headerText;
    this.id = id;
    this.startSec = startSec;
    this.durationSec = durationSec;
    this.characters = new Set<string>();
    this.completeness = completeness;
    this.traits = new Set<string>();
  }

  render(totalDurationSec: number, currentCharacterFilter: string, highlightPendingCompletion: boolean, currentTraitFilter: string) {
    let background = 'grey';

    if (
        this.characters.has(currentCharacterFilter) ||
        (this.traits.has(currentTraitFilter))
    ) {
      background = '#D2042D';
    }

    let completenessText;
    switch (this.completeness) {
      case Scrap.Completeness.FINAL:
        completenessText = 'Final';
        break;
      case Scrap.Completeness.POLISHED:
        completenessText = 'Polished';
        break;
      case Scrap.Completeness.INITIAL_DRAFT:
        completenessText = 'Initial Draft';
        break;
      case Scrap.Completeness.BRAINSTORM:
        completenessText = 'Brainstorm';
        break;
      default:
        completenessText = 'Not Started';
    }
    let popupText = durationSecondsToString(this.durationSec) + ` (${completenessText})`;

    if (highlightPendingCompletion) {
      switch (this.completeness) {
        case Scrap.Completeness.FINAL:
          background = '#228B22';
          break;
        case Scrap.Completeness.POLISHED:
          background = '#C9CC3F';
          break;
        case Scrap.Completeness.INITIAL_DRAFT:
          background = '#FFC300';
          break;
        case Scrap.Completeness.BRAINSTORM:
          background = '#FF5F1F';
          break;
        default:
          background = '#D2042D'
      }
    }

    return <Popup
        key={'key-' + this.id}
        content={popupText}
        header={this.headerText}
        mouseEnterDelay={50}
        mouseLeaveDelay={50}
        trigger={
          <Link
              to={'/scrap/' + this.id}
              style={{
                cursor: 'pointer',
                display: 'inline-block',
                height: '100%',
                boxShadow: 'inset 0px 0px 0px 1px #555',
                position: 'absolute',
                width: formatPercentString(100 * this.durationSec / totalDurationSec),
                left: formatPercentString(100 * this.startSec / totalDurationSec),
                background: background,
                zIndex: 2,
              }}
          >
          <div
        >
          &nbsp;
          </div></Link>}
    />
  }
}

export class TimelineRow {
  blocks: TimelineBlock[] = [];

  lastBlockId(): string {
    if (!this.blocks.length) {
      return '';
    }

    return this.blocks[this.blocks.length - 1].id;
  }

  render(totalDurationSec: number, zoomLevel: number, currentCharacterFilter: string, highlightPendingCompletion: boolean, currentTraitFilter: string) {
    return <div style={{
      position: 'relative',
      width: formatPercentString(zoomLevel),
      height: '40px',
      borderBottom: '1px solid'
    }}>
      {this.blocks.map((block) => block.render(totalDurationSec, currentCharacterFilter, highlightPendingCompletion, currentTraitFilter))}
    </div>
  }
}

export class Timeline {
  isValid: boolean = false;
  durationSec: number = 0;
  percentComplete: number = 0;
  rows: TimelineRow[] = [];

  constructor(scrapId: string, scrapMap: ScrapMap, parsedContentBlocks: ContentBlock[]) {
    if (!scrapMap[scrapId]) {
      return;
    }
    const parseResult = parseTimeline(parsedContentBlocks, scrapMap);

    this.durationSec = parseResult.totalDurationSec;
    this.percentComplete = parseResult.percentComplete;
    if (!this.durationSec) {
      return;
    }

    this.isValid = true;

    this.rows = parseResult.rows;
  }

  getSecondMarkers(zoomLevel: number): number[] {
    const numLevels = Math.round(4 * (zoomLevel / 100)) + 1;
    const stepLevel = (this.durationSec / (numLevels - 1));

    let startingPoint = 0;
    let steps = []
    for (let i = 0; i < numLevels; i++) {
      const nextContribution = Math.round(startingPoint);
      steps.push(nextContribution);
      startingPoint += stepLevel;
    }

    return steps;
  }

  render(zoomLevel: number, currentCharacterFilter: string, highlightPendingCompletion: boolean, currentTraitFilter: string) {
    let secondMarkers = this.getSecondMarkers(zoomLevel);
    let markerTopPadding = 41 * this.rows.length;

    return <div style={{width: '100%', overflowX: 'scroll', background: 'lightgrey'}}>
      {this.rows.map((row) => row.render(this.durationSec, zoomLevel, currentCharacterFilter, highlightPendingCompletion, currentTraitFilter))}
      <div style={{height: '24px', position: 'relative', width: formatPercentString(zoomLevel), background: 'white'}}>
        {secondMarkers.map((value, idx) => {

          const markerStyle: React.CSSProperties = {
            display: 'inline-block',
            position: 'absolute',
            fontSize: '16px',
            fontFamily: 'CourierPrime, Courier, monospace',
            paddingTop: `${markerTopPadding}px`,
            top: `-${markerTopPadding}px`
          };

          if (idx + 1 === secondMarkers.length) {
            markerStyle.paddingRight = '8px';
            markerStyle.textAlign = 'right';
            markerStyle.borderRight = '2px solid';
            markerStyle.right = formatPercentString(100 - (100 * value / this.durationSec));
          } else {
            markerStyle.paddingLeft = '8px';
            markerStyle.textAlign = 'left';
            markerStyle.borderLeft = '2px solid';
            markerStyle.left = formatPercentString(100 * value / this.durationSec);
          }

          return <div
              style={markerStyle}>{durationSecondsToString(value)}</div>
        })}
      </div>
    </div>
  }
}

interface TimelineProps {
  scrapId: string;
  scrapMap: ScrapMap;
  parsedContentBlocks: ContentBlock[];
  currentCharacterFilter: string;
  currentCompletionFilter: string;
  currentTraitFilter: string;
}

interface TimelineState {
  scrapId: string;
  timeline: Timeline;
  zoomLevel: number;
  minimized: boolean;
}

export class TimelineViewer extends Component<TimelineProps, TimelineState> {

  constructor(props: TimelineProps) {
    super(props);

    this.state = this.initializeState(props);
  }

  initializeState(props: TimelineProps): TimelineState {
    return {
      scrapId: props.scrapId,
      timeline: new Timeline(props.scrapId, props.scrapMap, props.parsedContentBlocks),
      zoomLevel: 100,
      minimized: false,
    }
  }

  zoomIn() {
    this.setState({
      zoomLevel: this.state.zoomLevel * 2
    });
  }

  zoomOut() {
    this.setState({
      zoomLevel: Math.max(100, this.state.zoomLevel / 2)
    });
  }

  flipMinimization() {
    this.setState({
      minimized: !this.state.minimized
    });
  }

  render() {
    if (!this.state.timeline.isValid) {
      return <div>... loading timeline... </div>
    }

    const zoomOptions = this.state.minimized ? null : (<div style={{display: 'inline-block'}}>
      <Button onClick={() => this.zoomOut()} disabled={this.state.zoomLevel === 100} icon>
        <Icon name='zoom-out' />
      </Button>
      <Button onClick={() => this.zoomIn()} icon>
        <Icon name='zoom-in' />
      </Button>
    </div>);

    return (<div>
      <div style={{marginBottom: '12px', display: 'flex'}}>
        {zoomOptions}
        <span style={{flex: '1'}}>&nbsp;</span>
        <span style={{margin: 'auto 24px'}}>Percent complete: {this.state.timeline.percentComplete}</span>
        <Button onClick={() => this.flipMinimization()} icon>
          <Icon name={this.state.minimized ? 'window maximize outline' : 'window minimize outline'}/>
        </Button>
      </div>
      {this.state.minimized ? null : this.state.timeline.render(
          this.state.zoomLevel,
          this.props.currentCharacterFilter,
          !!this.props.currentCompletionFilter,
          this.props.currentTraitFilter
      )}
    </div>)
  }
}
