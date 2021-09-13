import { RouteComponentProps } from 'react-router';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectSpecificStory, updateStory} from '../../features/storyList/storyListSlice';
import StoryDetails from '../../features/storyDetails/StoryDetails';

interface MatchParams {
  id: string
}

interface StoryDetailsProps extends RouteComponentProps<MatchParams> {}

export default function StoryDetailsPage (props: StoryDetailsProps) {
  const story = useAppSelector(selectSpecificStory(props.match.params?.id));
  const dispatch = useAppDispatch();

  return (
    <StoryDetails
      story={story}
      onStoryChange={(story) => dispatch(updateStory(story.toJSON()))}
    />
  )
}
