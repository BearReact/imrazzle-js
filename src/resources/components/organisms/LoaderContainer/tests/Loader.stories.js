import React from 'react';
import LoaderContainer from '../LoaderContainer';

export default {
    title: 'Organisms|LoaderContainer',
    parameters: {
        notes: 'This is Loading Container',
    },
};

export const ToStorybook = () => (
    <LoaderContainer isLoading>
        <div style={{height: '100vh', width: '100vw', backgroundColor: '#bdbdbd'}}>test loading</div>
    </LoaderContainer>
);

ToStorybook.story = {
    name: 'default',
};
