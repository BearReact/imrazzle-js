import React from 'react';
import {storiesOf} from '@storybook/react';
import LoaderContainer from '../LoaderContainer';

storiesOf('Atoms|Loader', module).add('default', () => (
    <LoaderContainer isLoading>
        <div style={{height: '100vh', width: '100vw', backgroundColor: '#bdbdbd'}}>test loading</div>
    </LoaderContainer>
));
