import React, {Component} from 'react';
import { Menu } from 'semantic-ui-react';

export default class RevisionHeader extends Component {

  render() {
    return (
        <Menu>
          <Menu.Item header as='h1'>Revision</Menu.Item>
        </Menu>
    );
  }
}
