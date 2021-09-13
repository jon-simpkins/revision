import React from 'react';
import {
  MemoryRouter as Router,
} from 'react-router-dom';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StoryDetails from './StoryDetails';
import {Story} from '../../protos_v2';

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
  story: null
}

export const Typical_Story = Template.bind({});
Typical_Story.args = {
  story: Story.create({
    id: 'abc123',
    name: 'My Story',
    description: 'This is a story about stuff'
  })
}
