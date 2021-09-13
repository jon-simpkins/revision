import { RouteComponentProps } from 'react-router';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectSpecificStory, updateStory} from '../../features/storyList/storyListSlice';
import {Input} from 'semantic-ui-react';
import {Story} from '../../protos_v2';
import {AppDispatch} from '../../app/store';

interface MatchParams {
  id: string
}

interface StoryDetailsProps extends RouteComponentProps<MatchParams> {}

function onNameChange(newName: string, story: Story, dispatch: AppDispatch) {
  story.name = newName;
  dispatch(updateStory(story.toJSON()));
}

export default function StoryDetails (props: StoryDetailsProps) {
  const story = useAppSelector(selectSpecificStory(props.match.params?.id));
  const dispatch = useAppDispatch();

  if (!story) {
    return (
        <div>Whoops, could not find story</div>
    );
  }

  return (
      <div>
        <div>This is the details for {story.id}</div>
        <Input fluid
               placeholder='Story name'
               defaultValue={story.name}
               onChange={(e) => onNameChange(e.target.value, story, dispatch)}
        />
      </div>
  )
}
