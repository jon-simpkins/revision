import React from 'react';
import {
  MemoryRouter as Router,
} from 'react-router-dom';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StoryCard from './StoryCard';
import {exampleStory} from './exampleStoryData';

export default {
  title: 'Story/Card',
  component: StoryCard,
} as ComponentMeta<typeof StoryCard>;

const Template: ComponentStory<typeof StoryCard> = (args) => <Router>
  <StoryCard {...args}/>
</Router>;

export const Default = Template.bind({});
Default.args = {
  story: exampleStory
}
