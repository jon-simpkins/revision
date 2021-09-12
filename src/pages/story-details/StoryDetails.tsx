import {Component} from 'react';
import { RouteComponentProps } from 'react-router';

interface MatchParams {
  id: string
}

interface StoryDetailsProps extends RouteComponentProps<MatchParams> {}

export default class StoryDetails extends Component<StoryDetailsProps> {

  getId(): string {
    const params = this.props.match.params;

    return params.id as string;
  }

  render() {
    return (
        <div>This is the details for {this.getId()}</div>
    )
  }
}
