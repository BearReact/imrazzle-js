import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';

export default {
    title: 'Others|Welcome',
    parameters: {
        notes: 'This is sample doc',
    },
};

export const ToStorybook = () => <Welcome showApp={linkTo('Button')} />;

ToStorybook.story = {
    name: 'to Storybook',
};
