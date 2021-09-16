import React from 'react';
import {
  MemoryRouter as Router,
} from 'react-router-dom';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StoryDetails from './StoryDetails';
import {Duration, Scrap, Story} from '../../protos_v2';

export default {
  title: 'Story/Details',
  component: StoryDetails,
  argTypes: {
    onStoryChange: {
      action: 'story-updated'
    }
  }
} as ComponentMeta<typeof StoryDetails>;

const Template: ComponentStory<typeof StoryDetails> = (args) => <Router>
  <StoryDetails {...args}/>
</Router>;

export const Empty_Story = Template.bind({});
Empty_Story.args = {
  story: null,
  scraps: []
}

export const Typical_Story = Template.bind({});
Typical_Story.args = {
  story: Story.create({
    id: 'abc123',
    name: 'My Story',
    description: 'This is a story about stuff',
    duration: Duration.create({
      seconds: 3755
    })
  }),
  scraps: Array.from({length: 30}, (skip, idx) => {
    let stories = [];
    if (idx % 3 == 0) {
      stories.push('abc123');
    }
    if (idx % 2 == 0) {
      stories.push('def456');
    }

    return Scrap.create({
      id: 'id-' + idx,
      synopsis: 'Scrap ' + idx + ': this is a really long thing that will wrap weird',
      stories: stories,
    });
  })
}
