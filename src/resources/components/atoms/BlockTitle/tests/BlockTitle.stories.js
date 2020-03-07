import React from 'react';
import BlockTitle from '../BlockTitle';

export default {
    title: 'Atoms|BlockTitle',
};

export const Basic = () => <BlockTitle>Title</BlockTitle>;

Basic.story = {
    parameters: {
        backgrounds: [
            {name: 'light', value: '#fff', default: true},
        ],
    },
};

