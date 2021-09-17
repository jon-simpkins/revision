import React from 'react';
import {
  MemoryRouter as Router,
} from 'react-router-dom';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ScrapDetails from './ScrapDetails';
import {Scrap, Story} from '../../protos_v2';

export default {
  title: 'Scrap/Details',
  component: ScrapDetails,
  argTypes: {}
} as ComponentMeta<typeof ScrapDetails>;

const Template: ComponentStory<typeof ScrapDetails> = (args) => <Router>
  <ScrapDetails {...args}/>
</Router>;

export const Empty_Scrap = Template.bind({});
Empty_Scrap.args = {
  scrapId: 'def456',
  scrapMap: {},
  storyMap: {},
}

const parentStory = Story.create({
  id: 'abc123',
  name: 'My Story'
});

const mainScrap = Scrap.create({
  id: 'def456',
  synopsis: 'My Scrap',
  prose: 'This is\n\nthe prose bit',
  stories: ['abc123']
});

export const Basic_Scrap = Template.bind({});
Basic_Scrap.args = {
  scrapId: 'def456',
  scrapMap: {
    'def456': mainScrap
  },
  storyMap: {
    'abc123': parentStory
  },
}
