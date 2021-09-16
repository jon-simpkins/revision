import { RouteComponentProps } from 'react-router';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {removeStory, selectSpecificStory, updateStory} from '../../features/storyList/storyListSlice';
import StoryDetails from '../../features/storyDetails/StoryDetails';
import {Scrap, Story} from '../../protos_v2';
import {useHistory} from 'react-router-dom';
import {createScrap, selectScrapMap, updateScrap} from '../../features/scrapList/scrapListSlice';

interface MatchParams {
  id: string
}

interface StoryDetailsProps extends RouteComponentProps<MatchParams> {}

export default function StoryDetailsPage (props: StoryDetailsProps) {
  const story = useAppSelector(selectSpecificStory(props.match.params?.id));
  const topLevelScraps: Scrap[] = Object.values(useAppSelector(selectScrapMap));
  const dispatch = useAppDispatch();
  const history = useHistory();

  return (
    <StoryDetails
      story={story}
      scraps={topLevelScraps}
      onStoryChange={(story) => dispatch(updateStory(story.toJSON()))}
      onStoryDelete={() => {
        dispatch(removeStory((story as Story).id));
        history.push('/');
      }}
      onScrapCreate={(scrap) => {
        dispatch(createScrap(scrap.toJSON()));
        history.push('/scrap/' + scrap.id);
      }}
      onScrapUpdate={(scrap) => {
        dispatch(updateScrap(scrap.toJSON()));
      }}
    />
  )
}
