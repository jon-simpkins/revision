import {StoryMap} from '../storyList/storyListSlice';
import {ScrapMap} from '../scrapList/scrapListSlice';
import React, {Component, ReactElement} from 'react';
import {Scrap} from '../../protos_v2';
import {Breadcrumb, BreadcrumbSection, Form, Segment, TextArea} from 'semantic-ui-react';
import {
  Link
} from 'react-router-dom';

interface ScrapDetailsProps {
  scrapId: string;
  storyMap: StoryMap;
  scrapMap: ScrapMap;
  onScrapCreate: (scrap: Scrap) => void;
  onScrapUpdate: (scrap: Scrap) => void;
}

export default class ScrapDetails extends Component<ScrapDetailsProps> {

  getBreadcrumbs(thisScrap: Scrap): ReactElement {
    let parentStories = thisScrap.stories.map((storyId) => {
      return this.props.storyMap[storyId];
    }).filter(Boolean);

    return (<div>
      {
        parentStories.map((parentStory, idx) => {
          return (<Breadcrumb>
            <BreadcrumbSection link>
              <Link to={'/story/' + parentStory.id}>{parentStory.name}</Link>
            </BreadcrumbSection>
          </Breadcrumb>)
        })
      }
    </div>);
  }

  onSynopsisChange(newSynopsis: string) {
    const scrap = this.props.scrapMap[this.props.scrapId] as Scrap;

    scrap.synopsis = newSynopsis;
    this.props.onScrapUpdate(scrap);
  }

  onProseChange(newProse: string) {
    const scrap = this.props.scrapMap[this.props.scrapId] as Scrap;

    scrap.prose = newProse;
    this.props.onScrapUpdate(scrap);
  }

  getPrimaryForm(thisScrap: Scrap): ReactElement {
    return <Segment>
      <Form>
        <Form.Group widths='equal'>
          <Form.Input
              label='Synopsis'
              defaultValue={thisScrap.synopsis}
              onChange={(e) => this.onSynopsisChange(e.target.value)}
          />
        </Form.Group>
        <Form.Field>
          <label>Prose</label>
          <TextArea
              defaultValue={thisScrap.prose}
              onChange={(e) => this.onProseChange(e.target.value)}
              style={{fontFamily: 'CourierPrime', height: '400px'}}
          />
        </Form.Field>
      </Form>
    </Segment>
  }

  render() {
    let thisScrap = this.props.scrapMap[this.props.scrapId];

    if (!thisScrap) {
      return (
          <div>Whoops, could not find scrap</div>
      );
    }

    return (
        <div style={{margin: '24px'}}>
          {this.getBreadcrumbs(thisScrap)}
          {this.getPrimaryForm(thisScrap)}
        </div>
    );
  }

}
