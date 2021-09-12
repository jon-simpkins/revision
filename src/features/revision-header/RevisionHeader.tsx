import React, {Component} from 'react';
import {
  Link
} from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default class RevisionHeader extends Component {

  render() {
    return (
        <Menu>
          <Link to={'/'}>
            <Menu.Item header as='h1'>Revision</Menu.Item>
          </Link>
        </Menu>
    );
  }
}
