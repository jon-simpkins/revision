import React, {Component} from 'react';
import {
  Link
} from 'react-router-dom';
import {Icon, Menu} from 'semantic-ui-react';

export default class RevisionHeader extends Component {

  render() {
    return (
        <Menu>
          <Link to={'/'}>
            <Menu.Item header>Revision</Menu.Item>
          </Link>
          <Link to={'/data'}>
            <Menu.Item>
              <Icon name="save" />
            </Menu.Item>
          </Link>
        </Menu>
    );
  }
}
