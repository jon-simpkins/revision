import React from 'react';
import {
  Link
} from 'react-router-dom';
import {Dropdown, DropdownItemProps, Icon, Menu} from 'semantic-ui-react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {HeaderOptions, readHeaderOptions, updateHeaderOptions} from './headerOptionsSlice';

export default function RevisionHeader() {
  const dispatch = useAppDispatch();
  const options = useAppSelector(readHeaderOptions);

  let characterFilters;
  if (options.characterFilters.length) {
    const characterOptions = options.characterFilters.map((characterFilter) => {
      return {
        key: characterFilter.character,
        text: `${characterFilter.character} (${Math.round(characterFilter.percentDurationSec * 1000) / 10}%)`,
        value: characterFilter.character,
      } as DropdownItemProps;
    });

    characterOptions.unshift({
      key: 'none',
      value: 'No Character Filter',
      text: 'No Character Filter'
    });

    characterFilters = <Dropdown
        text={options.currentCharacterFilter || 'Filter by character'}
        floating
        labeled
        scrolling
        item
        className='icon'
        value={options.currentCharacterFilter}
        options={characterOptions}
        onChange={(e, data) => {
          dispatch(updateHeaderOptions({
            ...options,
            currentCharacterFilter: data.value as string,
          } as HeaderOptions));
        }}
    />
  }



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
          {characterFilters}
          {editEntry}
          {readEntry}
        </Menu.Menu>
      </Menu>
  );
}
