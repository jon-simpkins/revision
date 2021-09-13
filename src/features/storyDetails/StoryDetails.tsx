import React, {Component} from 'react';
import {Input} from 'semantic-ui-react';
import {Story} from '../../protos_v2';

interface StoryCardProps {
  story: Story|null;
  onStoryChange: (story: Story) => void;
}

export default class StoryDetails extends Component<StoryCardProps> {
  onNameChange(newName: string) {
    const story = this.props.story as Story;

    story.name = newName;
    this.props.onStoryChange(story);
  }

  render() {
    if (!this.props.story) {
      return (
          <div>Whoops, could not find story</div>
      );
    }

    return (
      <div>
        <div>This is the details for {this.props.story.id}</div>
        <Input fluid
               placeholder='Story name'
               defaultValue={this.props.story.name}
               onChange={(e) => this.onNameChange(e.target.value)}
        />
      </div>
    );
  }
}
