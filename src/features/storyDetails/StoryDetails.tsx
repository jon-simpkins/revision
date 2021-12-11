import React, {Component, ReactNode} from 'react';
import {Button, Container, Dropdown, Form, Header, Icon, Menu, Segment, TextArea} from 'semantic-ui-react';
import {Duration, Scrap, Story} from '../../protos_v2';
import {
  Link
} from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import {durationSecondsToString, durationStringToSeconds} from '../utils/durationUtils';

interface StoryDetailsProps {
  story: Story|null;
  scraps: Scrap[];
  onStoryChange: (story: Story) => void;
  onStoryDelete: () => void;
  onScrapCreate: (scrap: Scrap) => void;
  onScrapUpdate: (scrap: Scrap) => void;
}

interface StoryDetailsState {
  durationErrorString: string|null;
  currentScrapFilter: string;
  currentScrapId: string;
}

export default class StoryDetails extends Component<StoryDetailsProps, StoryDetailsState> {
  state: StoryDetailsState = {
    durationErrorString: null,
    currentScrapFilter: 'mine',
    currentScrapId: '',
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

    return durationSecondsToString(durationSec);
  }

  onDurationChange(newDuration: string) {
    let durationSec;
    try {
      durationSec = durationStringToSeconds(newDuration);
    } catch {
      return this.setDurationErrorString(true);
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

  getFilteredScraps(filter: string) {
    return this.props.scraps.filter((scrap) => {
      if (filter === 'mine' && scrap.stories.indexOf(this.props.story?.id || '') < 0) {
        return false;
      }

      if (filter === 'others' && scrap.stories.indexOf(this.props.story?.id || '') >= 0) {
        return false;
      }

      return true;
    });
  }

  createNewScrap(): Scrap {
    return Scrap.create({
      id: uuid(),
      synopsis: 'New Scrap',
      prose: 'New scrap for "' + this.props.story?.name + '" story\nFill this out with notes or prose content',
      stories: [this.props.story?.id as string]
    });
  }

  renderScrapDetails(): ReactNode {
    let currentScrap = this.props.scraps.find((scrap) => {
      return scrap.id === this.state.currentScrapId;
    });

    if (!currentScrap) {
      return (
          <Header>Please select a scrap</Header>
      )
    }

    let linkUnlinkButton;
    if (currentScrap.stories.indexOf(this.props.story?.id || '') >= 0) {
      // Need unlink button
      linkUnlinkButton =
          (<Button icon color='red'
                   onClick={() => {
                     const editingScrap = currentScrap as Scrap;
                     editingScrap.stories = editingScrap.stories.filter((storyId) => {
                       return storyId !== this.props.story?.id;
                     });

                     this.props.onScrapUpdate(editingScrap);
                   }}>
        <Icon name='unlink' />
      </Button>);
    } else {
      linkUnlinkButton = (
          <Button icon color='green'
                  onClick={() => {
                    const editingScrap = currentScrap as Scrap;
                    editingScrap.stories.push(this.props.story?.id || '');
                    this.props.onScrapUpdate(editingScrap);
                  }}>
            <Icon name='linkify' />
          </Button>
      );
    }

    return (
        <div>
          <div style={{display: 'flex'}}>
            <Header>
              {currentScrap.synopsis}
            </Header>
            <div style={{flex: 1, textAlign: 'right'}}>
              {linkUnlinkButton}
            </div>
          </div>
          <Container text>
            {currentScrap.prose.split('\n').map((line, idx) => {
              return (<p key={'line-' +idx}>{line}</p>);
            })}
          </Container>
          <div style={{marginTop: '32px'}}>
            <Link to={`/scrap/${currentScrap.id}`}>
              <Button primary>Start writing</Button>
            </Link>
          </div>
        </div>
    );

  }

  render() {
    if (!this.props.story) {
      return (
          <div>Whoops, could not find story</div>
      );
    }

    return (
        <div style={{margin: '24px'}}>
          <Segment.Group>
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
          <Segment.Group>
            <Segment style={{display: 'flex'}}>
              <Header>
                Scraps
                <Header.Subheader>
                  These are the bits and pieces that make up the story
                </Header.Subheader>
              </Header>

              <div style={{flex: 1, textAlign: 'right'}}>
                <Button icon color='green'
                        onClick={() => {
                          this.props.onScrapCreate(this.createNewScrap())
                        }}
                >
                  <Icon name='add' />
                </Button>
              </div>
            </Segment>
            <Segment style={{display: 'flex'}}>
              <Menu pointing vertical>

                  <Menu.Item>
                    <Dropdown
                        fluid
                        selection
                        onChange={(e, { value }) => {
                          this.setState({
                            ...this.state,
                            currentScrapFilter: value as string,
                          })
                        }}
                        defaultValue={this.state.currentScrapFilter}
                        options={[
                          {
                            value: 'all',
                            text: 'All stories',
                            description: '' + (this.getFilteredScraps('all').length)
                          },
                          {
                            value: 'mine',
                            text: 'This story',
                            description: '' + (this.getFilteredScraps('mine').length)
                          },
                          {
                            value: 'others',
                            text: 'Other stories',
                            description: '' + (this.getFilteredScraps('others').length)
                          },
                        ]}>
                    </Dropdown>
                  </Menu.Item>
                {this.getFilteredScraps(this.state.currentScrapFilter).map((scrap, idx) => {
                  return (<Menu.Item
                      key={'scrap-menu-' + idx}
                      name={scrap.id}
                      active={scrap.id === this.state.currentScrapId}
                      onClick={() => this.setState({...this.state, currentScrapId: scrap.id})}
                  >{scrap.synopsis}</Menu.Item>);
                }).filter(Boolean)}
              </Menu>
              <div style={{flex: 1, marginLeft: '32px'}}>
                {this.renderScrapDetails()}
              </div>
            </Segment>
          </Segment.Group>
        </div>
    );
  }
}
