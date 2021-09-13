import { RouteComponentProps } from 'react-router';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {removeStory, selectSpecificStory, updateStory} from '../../features/storyList/storyListSlice';
import StoryDetails from '../../features/storyDetails/StoryDetails';
import {Story} from '../../protos_v2';
import {useHistory} from 'react-router-dom';

interface MatchParams {
  id: string
}

interface StoryDetailsProps extends RouteComponentProps<MatchParams> {}

export default function StoryDetailsPage (props: StoryDetailsProps) {
  const story = useAppSelector(selectSpecificStory(props.match.params?.id));
  const dispatch = useAppDispatch();
  const history = useHistory();

  return (
    <StoryDetails
      story={story}
      onStoryChange={(story) => dispatch(updateStory(story.toJSON()))}
      onStoryDelete={() => {
        dispatch(removeStory((story as Story).id));
        history.push('/');
      }}
    />
  )
}
