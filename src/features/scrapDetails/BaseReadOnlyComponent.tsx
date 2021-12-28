import {ContentState} from 'draft-js';
import {PAGE_WIDTH_EM, scrapIdField} from './usefulConstants';
import React, {Component, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';

interface FountainReadOnlyState {
  isHover: boolean;
  scrapId: string;
}

const parseScrapIdFromProps = (props: any) => {
  const contentState = props.contentState as ContentState;
  const data = contentState.getBlockMap().get(props.blockKey).getData();
  return data.get(scrapIdField);
}

export class BaseReadOnlyComponent extends Component<any, FountainReadOnlyState> {

  constructor(props: any) {
    super(props);

    this.state = {
      isHover: false,
      scrapId: parseScrapIdFromProps(props)
    }
  }

  buildScrapLinkButton(): ReactElement|null {
    if (!this.state.isHover) {
      return null;
    }

    const scrapLink = `/scrap/${this.state.scrapId}`;

    return <Link to={scrapLink}>
      <Button style={{cursor: 'pointer', position: 'absolute', top: '-12px', right: '-20px'}} circular color='blue' icon='edit outline' />
    </Link>;
  }

  onMouseEnter(): void {
    this.setState({
      isHover: true
    });
  }

  onMouseLeave(): void {
    this.setState({
      isHover: false
    });
  }

  getParentStyle(): any {
    const style: React.CSSProperties = {
      position: 'relative',
      paddingRight: '20px',
      width: PAGE_WIDTH_EM,
      margin: 0,
    };

    if (this.state.isHover) {
      style.backgroundColor = '#c6e1f6';
    }

    return style;
  }

  renderSpecific() {
    return <span>{this.props.children}</span>
  }

  render() {
    return (
        <div style={this.getParentStyle()}
             onMouseEnter={() => {this.onMouseEnter();}}
             onMouseLeave={() => {this.onMouseLeave();}}>
          {this.renderSpecific()}
          {this.buildScrapLinkButton()}
        </div>
    );
  }
}
