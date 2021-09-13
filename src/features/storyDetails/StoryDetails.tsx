import React, {Component} from 'react';
import {Button, Form, Header, Icon, Input, Segment, TextArea} from 'semantic-ui-react';
import {Story} from '../../protos_v2';

interface StoryCardProps {
  story: Story|null;
  onStoryChange: (story: Story) => void;
  onStoryDelete: () => void;
}

export default class StoryDetails extends Component<StoryCardProps> {
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
            <Form.Field>
              <label>Story Name</label>
              <Input
                  defaultValue={this.props.story.name}
                  onChange={(e) => this.onNameChange(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Story Description</label>
              <TextArea
                  rows={2}
                  defaultValue={this.props.story.description}
                  onChange={(e) => this.onDescriptionChange(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Segment>

      </Segment.Group>
    );
  }
}
