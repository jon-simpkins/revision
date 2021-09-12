import StoryCard from '../../features/storyList/StoryCard';
import {Button, Header, Icon, Segment} from 'semantic-ui-react';

import {createStory, selectStoryMap, StoryMap} from '../../features/storyList/storyListSlice';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {Story} from '../../protos_v2';
import { v4 as uuid } from 'uuid';

function createNewStory(): Story {
  return Story.create({
    id: uuid(),
    name: 'New Story',
    description: 'A story about something'
  });
}

function getStorySection(storyMap: StoryMap): JSX.Element {
  const storyList = Object.values(storyMap);

  if (!storyList.length) {
    return (
        <Segment>Whoops, no stories yet</Segment>
    );
  }

  return <Segment style={{display: 'flex', flexWrap: 'wrap'}}>
    {storyList.map((story, idx) => {
      return (
          <StoryCard key={idx} story={story} />
      );
    })}
  </Segment>
}

export default function Homepage() {
  const storyMap = useAppSelector(selectStoryMap);
  const dispatch = useAppDispatch();

  return (
      <div style={{margin: '24px'}}>
        <Segment.Group >
          <Segment style={{display: 'flex'}}>
            <Header size='medium'>Story List
              <Header.Subheader>
                All your stories
              </Header.Subheader>
            </Header>
            <div style={{flex: 1, textAlign: 'right'}}>
              <Button icon color='green'
                onClick={() => {
                  dispatch(createStory(createNewStory()))}}
              >
                <Icon name='add' />
              </Button>
            </div>
          </Segment>
          {getStorySection(storyMap)}
        </Segment.Group>
      </div>
  );
}
