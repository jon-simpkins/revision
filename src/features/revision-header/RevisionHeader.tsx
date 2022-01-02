import React from 'react';
import {
  Link
} from 'react-router-dom';
import {Icon, Menu} from 'semantic-ui-react';
import {useAppSelector} from '../../app/hooks';
import {readHeaderOptions} from './headerOptionsSlice';

export default function RevisionHeader() {

  const options = useAppSelector(readHeaderOptions);

  console.log(options);

  let editEntry;
  if (options.showEditLink) {
    editEntry = <Link to={'/scrap/' + options.currentScrapId}>
      <Menu.Item>
        <Icon name="edit" />
      </Menu.Item>
    </Link>
  }

  let readEntry;
  if (options.showReadLink) {
    readEntry = <Link to={'/read/' + options.currentScrapId}>
      <Menu.Item>
        <Icon name="film" />
      </Menu.Item>
    </Link>
  }

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
        <Menu.Menu position='right'>
          {editEntry}
          {readEntry}
        </Menu.Menu>
      </Menu>
  );
}
