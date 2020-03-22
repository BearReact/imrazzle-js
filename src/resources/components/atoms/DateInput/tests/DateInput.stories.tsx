import React from 'react';
import {Container, Row, Col} from '@styled-bs-grid';
import readeMe from './DateInput.stories.md';
import DateInput from '../DateInput';

export default {
    title: 'Atoms|DateInput',
    parameters: {
        notes: readeMe,
    },
};

export const Basic = () => (
    <Container className="pt-3">
        <h2 className="story-title">Date Input</h2>

        <Row>
            <Col col={24} lg={6} className="mb-4">
                <DateInput label="Payment Date" isVisibleSetToday/>
            </Col>
        </Row>
    </Container>
);

Basic.story = {
    parameters: {
        backgrounds: [
            {name: 'light', value: '#f0f0f0', default: true},
        ],
    },
};
