import React, {ReactElement} from 'react';
import {Scrap} from '../../protos_v2';
import {Breadcrumb, BreadcrumbDivider, BreadcrumbSection, Button, Icon, Dropdown, Form, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {ScrapMap} from '../scrapList/scrapListSlice';
import {absorbPlaceholderScraps, addChildScrap, generatePlaceholderScrapsFromSelectedLines, replacePlaceholderScraps, resizePlaceholderScraps} from './editorInteractionUtils';
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
  const focusIcon = state.focusMode ? 'expand arrows alternate' : 'crosshairs';

  const actualDurationSec = state.actualDurationSec;
  const intendedDurationSec = props.scrapMap[props.scrapId].intendedDurationSec;
  let durationPercentLabel = (intendedDurationSec > 0) ?
      `${Math.ceil(1000 * actualDurationSec / intendedDurationSec) / 10}% Complete`
      : '';

  return <div>
    <div style={{display: 'flex'}}>
      <Button icon
              title='Add child scrap' onClick={() => addChildScrap(
          state.editorState,
          props.onScrapCreate,
          (newState, callback) => {setState(newState, callback);},
          () => remapEditorContent()
      )}>
        <Icon name='add' />
      </Button>
      <Button icon
              title='Replace placeholder scraps'
              onClick={() => replacePlaceholderScraps(
          state.editorState,
          props.onScrapCreate,
          (newState, callback) => {setState(newState, callback);},
          () => remapEditorContent()
      )}>
        <Icon name='cogs'/>
      </Button>
      <Button icon
              title='Absorb selected scraps'
              onClick={() => absorbPlaceholderScraps(
          props.scrapId,
          state.editorState,
          props.scrapMap,
          props.onScrapDelete,
          (newState, callback) => {setState(newState, callback);},
          () => remapEditorContent()
      )}>
        <Icon name='sitemap' />
      </Button>
      <Button icon
              title='Generate placeholders from selected lines' onClick={() => generatePlaceholderScrapsFromSelectedLines(
          props.scrapId,
          intendedDurationSec,
          state.editorState,
          (newState, callback) => {setState(newState, callback);},
          () => remapEditorContent()
      )}>
        <Icon name='list ul' />
      </Button>
      <Button icon
              disabled={intendedDurationSec <= 0}
              title='Resize placeholders to fill' onClick={() => resizePlaceholderScraps(
          props.scrapId,
          intendedDurationSec,
          actualDurationSec,
          state.editorState,
          (newState, callback) => {setState(newState, callback);},
          () => remapEditorContent()
      )}>
        <Icon name='resize vertical' />
      </Button>
      <span style={{flex: 1}}>&nbsp;</span>
      <span style={{margin: 'auto 24px'}}>{durationPercentLabel}</span>
      <Button icon
              title={focusLabel}
              onClick={() => {
        setState({
          focusMode: !state.focusMode
        }, () => {});
      }}>
        <Icon name={focusIcon} />
      </Button>
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
        <div style={{flex: 1, margin: '16px auto'}}>
          <Form.Field>
            <label>
              Completeness
            </label>
            <Dropdown
                selection
                options = {[
                  {
                    key: 'not_started',
                    text: 'Not Started',
                    value: Scrap.Completeness.NOT_STARTED,
                  },
                  {
                    key: 'brainstorm',
                    text: 'Brainstorm',
                    value: Scrap.Completeness.BRAINSTORM,
                  },
                  {
                    key: 'draft',
                    text: 'Initial Draft',
                    value: Scrap.Completeness.INITIAL_DRAFT,
                  },
                  {
                    key: 'polished',
                    text: 'Polished',
                    value: Scrap.Completeness.POLISHED,
                  },
                  {
                    key: 'final',
                    text: 'Final',
                    value: Scrap.Completeness.FINAL,
                  },
                ]}
                value={thisScrap.completeness || Scrap.Completeness.NOT_STARTED}
                onChange={(e, data) => {
                  const scrap = props.scrapMap[props.scrapId] as Scrap;
                  scrap.completeness = data.value as number;
                  props.onScrapUpdate(scrap);
                }}
            />
          </Form.Field>
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
