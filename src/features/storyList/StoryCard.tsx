import React, {Component} from 'react';
import {
  Link
} from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import {Story} from '../../protos_v2';

interface StoryCardProps {
  story: Story;
}

export default class StoryCard extends Component<StoryCardProps> {
  getCardUrl(): string {
    return '/story/' + this.props.story.id;
  }

  render() {
    return (
      <Link to={this.getCardUrl()}>
        <Card style={{margin: '8px'}}>
          <Card.Content header={this.props.story.name} />
          <Card.Content>
            {/* For each line of the description, print it in a paragraph */}
            {this.props.story.description.split('\n').map((line, idx) => {
              return (<p key={idx}>{line}</p>);
            })}
          </Card.Content>
        </Card>
      </Link>
    );
  }
}
