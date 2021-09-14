import React, {Component} from 'react';
import {Button, Form, Header, Icon, Segment, TextArea} from 'semantic-ui-react';
import {Duration, Story} from '../../protos_v2';

interface StoryDetailsProps {
  story: Story|null;
  onStoryChange: (story: Story) => void;
  onStoryDelete: () => void;
}

interface StoryDetailsState {
  durationErrorString: string|null;
}

export default class StoryDetails extends Component<StoryDetailsProps, StoryDetailsState> {
  state: StoryDetailsState = {
    durationErrorString: null
  };

  onNameChange(newName: string) {
    const story = this.props.story as Story;

    story.name = newName;
    this.props.onStoryChange(story);
  }

  onDescriptionChange(newDescription: string) {
    const story = this.props.story as Story;

    story.description = newDescription;
    this.props.onStoryChange(story);
  }

  getDurationString(): string {
    let durationSec = (this.props.story?.duration?.seconds || 0) as number;

    let durationStr = '';

    const hours = Math.floor(durationSec / 3600);
    durationSec -= 3600 * hours;
    durationStr += hours.toString().padStart(2, '0') + ':';

    const minutes = Math.floor(durationSec / 60);
    durationSec -= 60 * minutes;
    durationStr += minutes.toString().padStart(2, '0') + ':';

    durationStr += durationSec.toString().padStart(2, '0');

    return durationStr;
  }

  onDurationChange(newDuration: string) {
    const expectedRegex = new RegExp('^[0-9:]+$');
    if (!expectedRegex.test(newDuration)) {
      return this.setDurationErrorString(true);
    }

    const splitDurationStr = newDuration.split(':').filter(Boolean);

    if (splitDurationStr.length > 3) {
      return this.setDurationErrorString(true);
    }

    let durationSec = 0;
    for (let i = 0; i < splitDurationStr.length; i++) {
      durationSec = (60 * durationSec) + parseInt(splitDurationStr[i], 10);
    }

    const story = this.props.story as Story;
    story.duration = Duration.create({
      seconds: durationSec
    });

    this.props.onStoryChange(story);
    this.setDurationErrorString(false);
  }

  setDurationErrorString(hasError: boolean) {
    this.setState((state) => ({
      ...state,
      durationErrorString: hasError ? 'Please enter a duration of format HH:MM:SS' : null
    }));
  }

  render() {
    if (!this.props.story) {
      return (
          <div>Whoops, could not find story</div>
      );
    }

    return (
      <Segment.Group style={{margin: '24px'}}>
        <Segment style={{display: 'flex'}}>
          <Header>
            Story Details
            <Header.Subheader>
              Set the title, top-level description here
            </Header.Subheader>
          </Header>

          <div style={{flex: 1, textAlign: 'right'}}>
            <Button icon color='red'
              onClick={() => this.props.onStoryDelete()}
            >
              <Icon name='delete' />
            </Button>
          </div>
        </Segment>
        <Segment>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input
                  label='Story Name'
                  defaultValue={this.props.story.name}
                  onChange={(e) => this.onNameChange(e.target.value)}
              />
              <Form.Input
                label='Intended Duration (HH:MM:SS)'
                defaultValue={this.getDurationString()}
                error={this.state.durationErrorString}
                onChange={(e) => this.onDurationChange(e.target.value)}
              />
            </Form.Group>
            <Form.Field>
              <label>Story Description</label>
              <TextArea
                  defaultValue={this.props.story.description}
                  onChange={(e) => this.onDescriptionChange(e.target.value)}
                style={{fontFamily: 'CourierPrime', height: '125px'}}
              />
            </Form.Field>
          </Form>
        </Segment>

      </Segment.Group>
    );
  }
}
