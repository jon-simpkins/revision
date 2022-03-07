import React from 'react';
import {
  Link
} from 'react-router-dom';
import {Button, Checkbox, Dropdown, DropdownItemProps, Icon, Menu} from 'semantic-ui-react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {readHeaderOptions, updateHeaderOptions} from './headerOptionsSlice';
import {durationSecondsToString} from '../utils/durationUtils';
import {getSearchModal} from '../scrapDetails/SearchModal';
import {selectScrapMap} from '../scrapList/scrapListSlice';

export default function RevisionHeader() {
  const dispatch = useAppDispatch();
  const options = useAppSelector(readHeaderOptions);
  const scrapMap = useAppSelector(selectScrapMap);

  const dispatchPartialOptionsUpdate = (partialUpdate: object) => {
    dispatch(updateHeaderOptions(partialUpdate));
  }

  let characterFilters;
  if (options.characterFilters.length && !options.showReadLink) {
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
          dispatchPartialOptionsUpdate({
            currentCharacterFilter: data.value as string,
            currentCompletionFilter: '',
            currentTraitFilter: '',
          });
        }}
    />
  }

  let completionFilters;
  if (!options.showReadLink) {
    // Only show on the read page
    completionFilters = <Dropdown
        text={options.currentCompletionFilter || 'Filter by completion'}
        floating
        labeled
        scrolling
        item
        className='icon'
        value={options.currentCompletionFilter}
        options={[
          {
            key: 'none',
            value: '',
            text: 'No Completion Filter'
          },
          {
            key: 'pending',
            value: 'Pending Completion',
            text: 'Show Completion'
          }
        ]}
        onChange={(e, data) => {
          dispatchPartialOptionsUpdate({
            currentCharacterFilter: '',
            currentTraitFilter: '',
            currentCompletionFilter: data.value as string,
          });
        }}
    />
  }

  let traitFilters;
  if (options.traitFilters.length && !options.showReadLink) {
    const traitOptions = options.traitFilters.map((traitFilter) => {
      return {
        key: traitFilter.trait,
        text: `${traitFilter.trait} (${traitFilter.numberOfAppearances})`,
        value: traitFilter.trait,
      } as DropdownItemProps;
    });

    traitOptions.unshift({
      key: 'none',
      value: 'No Trait Filter',
      text: 'No Trait Filter'
    });

    traitFilters = <Dropdown
        text={options.currentTraitFilter || 'Filter by trait'}
        floating
        labeled
        scrolling
        item
        className='icon'
        value={options.currentTraitFilter}
        options={traitOptions}
        onChange={(e, data) => {
          dispatchPartialOptionsUpdate({
            currentCharacterFilter: '',
            currentTraitFilter: data.value as string,
            currentCompletionFilter: '',
          });
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

  let printEntry;
  if (options.showPrintLink) {
    printEntry = <Link to={'/print/' + options.currentScrapId}>
      <Menu.Item>
        <Icon name="print" />
      </Menu.Item>
    </Link>
  }

  let timerEntry;
  if (options.showPrintLink) {
    if (options.isCurrentlyInSession) {
      timerEntry = <Menu.Item>
        {durationSecondsToString((Date.now() - options.currentWritingSessionStartEpoch) / 1000)} spent writing
      </Menu.Item>
    } else {
      timerEntry = <Menu.Item><Button
          onClick={() => {
            dispatchPartialOptionsUpdate({
              isCurrentlyInSession: true,
              currentWritingSessionStartEpoch: Date.now(),
              lastCheckedWritingSessionEpoch: Date.now(),
            });

            // Update header state every second, to get the timer to visibly update
            setInterval(() => {
              dispatchPartialOptionsUpdate({
                lastCheckedWritingSessionEpoch: Date.now(),
              });
            }, 1000);
          }}
      >Start writing session</Button></Menu.Item>
    }
  }

  let titlePageEntry;
  if (!options.showPrintLink) {
    titlePageEntry = <Menu.Item>
      <Checkbox
          onChange={(e, data) => {
            dispatchPartialOptionsUpdate({
              includeTitlePage: data.checked
            });
          }}
          checked={options.includeTitlePage}
          label={'Include title page'}/>
    </Menu.Item>
  }

  const searchModal = getSearchModal(
      options.searchModalOpen,
      options.currentSearchQuery,
      options.currentSearchResults,
      scrapMap,
      (newQuery: string, newResults) => {
        dispatchPartialOptionsUpdate({
          currentSearchQuery: newQuery,
          currentSearchResults: newResults,
        });
      },
      () => {
        dispatchPartialOptionsUpdate({
          searchModalOpen: false,
        });
      });

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
        <Menu.Item onClick={() => {
          dispatchPartialOptionsUpdate({
            searchModalOpen: true,
          });
        }}>
          <Icon name="search" />
        </Menu.Item>
        {searchModal}
        {timerEntry}
        {titlePageEntry}
        <Menu.Menu position='right'>
          {completionFilters}
          {traitFilters}
          {characterFilters}
          {editEntry}
          {readEntry}
          {printEntry}
        </Menu.Menu>
      </Menu>
  );
}
