import React, {ReactElement} from 'react';
import {Scrap} from '../../protos_v2';
import {Breadcrumb, BreadcrumbDivider, BreadcrumbSection, Button, Form, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {ScrapMap} from '../scrapList/scrapListSlice';
import {addChildScrap, replacePlaceholderScraps} from './editorInteractionUtils';
import {ScrapDetailsProps, ScrapDetailsState} from './ScrapDetails';
import {durationSecondsToString, durationStringToSeconds} from '../utils/durationUtils';

export function getBreadcrumbs(parentScrapIds: string[], scrapMap: ScrapMap): ReactElement {
  const parentScraps = parentScrapIds.map((scrapId) => {
    return scrapMap[scrapId];
  }).filter(Boolean);

  const parentScrapLinks = parentScraps.map<React.ReactNode>(((parentScrap: Scrap) => {
    return (<BreadcrumbSection link>
      <Link to={'/scrap/' + parentScrap.id}>{parentScrap.synopsis}</Link>
    </BreadcrumbSection>)
  }));

  let scrapContribution;
  if (parentScraps.length) {
    scrapContribution = (<div>Scraps:
      <Breadcrumb>
        {
          parentScrapLinks.reduce((prev, curr) => [prev, <BreadcrumbDivider icon='right chevron' />, curr])
        }
      </Breadcrumb>
    </div>);
  } else {
    scrapContribution = (<div>No parent scraps</div>);
  }

  return (<div>
    {scrapContribution}
  </div>);
}

export function getProseEditorToolbar(
    props: ScrapDetailsProps,
    state: ScrapDetailsState,
    remapEditorContent: () => void,
    setState: (newState: any, callback: () => void) => void,
): ReactElement {
  const parseWarning = state.parseErrorState ?
      (<div style={{color: 'red'}}>Parsing took too long, please break into smaller chunks</div>) : null;

  const focusLabel = state.focusMode ? 'Focus Off' : 'Focus On';

  const actualDurationSec = state.actualDurationSec;
  const intendedDurationSec = props.scrapMap[props.scrapId].intendedDurationSec;
  let durationPercentLabel = `${Math.ceil(1000 * actualDurationSec / intendedDurationSec) / 10}% Complete`;

  return <div>
    <div style={{display: 'flex'}}>
      <button onClick={() => addChildScrap(
          state.editorState,
          props.onScrapCreate,
          (newState, callback) => {setState(newState, callback);},
          () => remapEditorContent()
      )}>Add child scrap</button>
      <button onClick={() => replacePlaceholderScraps(
          state.editorState,
          props.onScrapCreate,
          (newState, callback) => {setState(newState, callback);},
          () => remapEditorContent()
      )}>Replace placeholder scraps</button>
      <span style={{flex: 1}}>&nbsp;</span>
      <span style={{margin: 'auto 24px'}}>{durationPercentLabel}</span>
      <button onClick={() => {
        setState({
          focusMode: !state.focusMode
        }, () => {});
      }}>{focusLabel}</button>
    </div>
    {parseWarning}
  </div>;
}

export function getPrimaryForm(
    thisScrap: Scrap,
    state: ScrapDetailsState,
    props: ScrapDetailsProps,
    setState: (newState: any, callback: () => void) => void,
): ReactElement {
  return <Segment>
    <Form>
      <div style={{display: 'flex'}}>
        <div style={{flex: 1, margin: '16px 0'}}>
          <Form.Input
              label='Synopsis'
              defaultValue={thisScrap.synopsis}
              onChange={(e) => {
                const scrap = props.scrapMap[props.scrapId] as Scrap;
                scrap.synopsis = e.target.value;
                props.onScrapUpdate(scrap);
              }}
          />
        </div>
        <div style={{flex: 1, margin: '16px'}}>
          <Form.Input
              key={state.durationInputKey}
              style={{flex: 1}}
              label='Intended Duration (HH:MM:SS)'
              defaultValue={durationSecondsToString(thisScrap.intendedDurationSec)}
              error={state.durationErrorString}
              onChange={(e) => {
                onDurationChange(e.target.value, props, setState);
              }}
          />
        </div>
        <div style={{flex: 1, margin: 'auto'}}>
          <Form.Field>
            <label>
              Current Actual Duration: {durationSecondsToString(state.actualDurationSec)}
            </label>
            <Button
                onClick={() => {
                  updateExpectedDurationSec(props, state, setState);
                }}
                disabled={state.actualDurationSec === thisScrap.intendedDurationSec}
            >
              Update expected duration
            </Button>
          </Form.Field>
        </div>
      </div>
    </Form>
  </Segment>
}

function onDurationChange(newDuration: string, props: ScrapDetailsProps, setState: (newState: any, callback: () => void) => void) {
  let durationSec;
  try {
    durationSec = durationStringToSeconds(newDuration);
  } catch {
    return setDurationErrorString(true, setState);
  }

  const scrap = props.scrapMap[props.scrapId] as Scrap;

  scrap.intendedDurationSec = durationSec;
  props.onScrapUpdate(scrap);
  setDurationErrorString(false, setState);
}

function updateExpectedDurationSec(props: ScrapDetailsProps, state: ScrapDetailsState, setState: (newState: any, callback: () => void) => void): void {
  const scrap = props.scrapMap[props.scrapId] as Scrap;

  scrap.intendedDurationSec = state.actualDurationSec;
  props.onScrapUpdate(scrap);
  setState({
    durationInputKey: 'duration-key-' + Date.now()
  }, () => {
    setDurationErrorString(false, setState);
  });
}

function setDurationErrorString(hasError: boolean, setState: (newState: any, callback: () => void) => void) {
  setState({
    durationErrorString: hasError ? 'Please enter a duration of format HH:MM:SS' : null
  }, () => {});
}
