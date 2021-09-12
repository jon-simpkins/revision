import React from 'react';
import {
  MemoryRouter as Router,
} from 'react-router-dom';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import RevisionHeader from './RevisionHeader';

export default {
  title: 'Common/Header',
  component: RevisionHeader,
} as ComponentMeta<typeof RevisionHeader>;

const Template: ComponentStory<typeof RevisionHeader> = (args) => <RevisionHeader/>;

export const Default = Template.bind({});
