import React from 'react';
import {Container, Row, Col} from '@library/styled-bs-grid';
import renderPropsTable from '@test/storybook/addonConfig/renderPropsTable';
import readeMe from './DateInput.stories.md';
import DateInput from '../DateInput';

export default {
    title: 'Atoms|DateInput',
    parameters: {
        notes: readeMe + renderPropsTable(DateInput),
    },
};

export const Basic = () => {
    return (
        <Container className="pt-3">
            <h2 className="story-title">Button</h2>

            <Row>
                <Col col={24} lg={6} className="mb-4">
                    <DateInput label="Payment Date" isSetTodayVisible/>
                </Col>
            </Row>
        </Container>
    );
};

Basic.story = {
    parameters: {
        backgrounds: [
            {name: 'light', value: '#f0f0f0', default: true},
        ],
    },
};
