import React from 'react';
import BlockTitle from '../BlockTitle';

export default {
    title: 'Atoms|BlockTitle',
    parameters: {
        notes: 'some documentation here',
    },
};

export const ToStorybook = () => <BlockTitle>Title</BlockTitle>;

ToStorybook.story = {
    name: 'default',
};

