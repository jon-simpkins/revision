import StoryCard from '../../features/storyList/StoryCard';
import {Button, Header, Icon, Segment} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import {createStory, selectStoryMap, StoryMap} from '../../features/storyList/storyListSlice';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {IScrap, IStory, Scrap, Story} from '../../protos_v2';
import { v4 as uuid } from 'uuid';
import {createScrap} from '../../features/scrapList/scrapListSlice';

function createNewStory(): IStory {
  return Story.create({
    id: uuid(),
    name: 'New Story',
    description: 'A story about something'
  }).toJSON();
}

function createNewScrap(associatedStoryId: string): IScrap {
  return Scrap.create({
    id: uuid(),
    synopsis: 'Story Content',
    prose: 'Here is where you can summarize the story, and start to structure / brainstorm\n'
      + 'Feel free to create new scraps for alternative starting points, or new supporting docs '
      + 'for this story.',
    stories: [associatedStoryId]
  }).toJSON();
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
  const history = useHistory();

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
                  const newStory = createNewStory();
                  dispatch(createStory(newStory));
                  const newScrap = createNewScrap(newStory.id as string);
                  dispatch(createScrap(newScrap));

                  history.push(`/story/${newStory.id}`);
                }}
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
