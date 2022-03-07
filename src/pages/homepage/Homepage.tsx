import {Button, Header, Card, Icon, Segment, Form} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {IScrap, Scrap} from '../../protos_v2';
import { v4 as uuid } from 'uuid';
import {
  Link
} from 'react-router-dom';
import {createScrap, selectScrapMap, ScrapMap} from '../../features/scrapList/scrapListSlice';
import {durationSecondsToString} from '../../features/utils/durationUtils';
import {selectContactInfo, updateAuthor, updateContactInfo} from '../print-scrap/contactInfoSlice';
import React from 'react';

function createNewScrap(): IScrap {
  return Scrap.create({
    id: uuid(),
    synopsis: 'Story Content',
    prose: 'Here is where you can summarize the story, and start to structure / brainstorm\n'
      + 'Feel free to create new scraps for alternative starting points, or new supporting docs '
      + 'for this story.'
  }).toJSON();
}

function getScrapSection(scrapMap: ScrapMap): JSX.Element {
  const scrapList = Object.values(scrapMap);

  const hasParentMap: {[key: string]: boolean} = {};
  scrapList.forEach((scrap) => {
    scrap.childScraps.forEach((childId) => {
      hasParentMap[childId] = true;
    });
  });

  if (!scrapList.length) {
    return (
        <Segment>Whoops, no scraps yet</Segment>
    );
  }

  const preparedScrapList = scrapList.filter((scrap) => {
    return !hasParentMap[scrap.id];
  }).sort((a, b) => {
    return b.intendedDurationSec - a.intendedDurationSec;
  });

  return <Segment style={{display: 'flex', flexWrap: 'wrap'}}>
    {preparedScrapList.map((scrap, idx) => {
      return (
          <Link to={'/read/' + scrap.id} key={idx}>
            <Card style={{margin: '8px'}}>
              <Card.Content header={scrap.synopsis} />
              <Card.Content>
                <p>{durationSecondsToString(scrap.intendedDurationSec)}</p>
              </Card.Content>
            </Card>
          </Link>
      );
    })}
  </Segment>
}

export default function Homepage() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const scrapMap = useAppSelector(selectScrapMap);
  const contactInfo = useAppSelector(selectContactInfo);

  return (
      <div style={{margin: '24px'}}>
        <Segment.Group>
          <Segment>
            <Header size='medium'>About You
              <Header.Subheader>
                Your name / contact info (will be on PDFs you download)
              </Header.Subheader>
            </Header>
            <Form>
              <Form.Input
                  label='Author'
                  defaultValue={contactInfo.author}
                  onChange={(e) => {
                    dispatch(updateAuthor(e.target.value));
                  }}
              />
              <Form.TextArea
                  label='Contact Info'
                  defaultValue={contactInfo.contactInfo}
                  onChange={(e) => {
                    dispatch(updateContactInfo(e.target.value));
                  }}
                  rows={2}
              />
            </Form>
          </Segment>
        </Segment.Group>
        <Segment.Group >
          <Segment style={{display: 'flex'}}>
            <Header size='medium'>Scrap List
              <Header.Subheader>
                All your top-level scraps (no parents)
              </Header.Subheader>
            </Header>
            <div style={{flex: 1, textAlign: 'right'}}>
              <Button icon color='green'
                onClick={() => {
                  const newScrap = createNewScrap();
                  dispatch(createScrap(newScrap));

                  history.push(`/scrap/${newScrap.id}`);
                }}
              >
                <Icon name='add' />
              </Button>
            </div>
          </Segment>
          {getScrapSection(scrapMap)}
        </Segment.Group>
      </div>
  );
}
