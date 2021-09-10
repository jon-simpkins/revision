import React from 'react';
import {
  MemoryRouter as Router,
} from 'react-router-dom';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StoryCard from './StoryCard';
import {Story} from '../../protos_v2';

export default {
  title: 'Story/Card',
  component: StoryCard,
} as ComponentMeta<typeof StoryCard>;

export const exampleStory = Story.create({
  id: 'abc123',
  name: 'My Story',
  description: 'A story about stuff.\nand\nanother thing too'
});

const Template: ComponentStory<typeof StoryCard> = (args) => <Router>
  <StoryCard {...args}/>
</Router>;

export const Default = Template.bind({});
Default.args = {
  story: exampleStory
}
