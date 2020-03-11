import React from 'react';
import {Container, Row, Col} from 'styled-bs-grid';
import renderPropsTable from '@test/storybook/addonConfig/renderPropsTable';
import readeMe from '@components/atoms/DatePickerInput/tests/DatePickerInput.stories.md';
import DatePickerInput from '../DatePickerInput';

export default {
    title: 'Atoms|DatePickerInput',
    parameters: {
        notes: readeMe + renderPropsTable(DatePickerInput),
    },
};

export const Basic = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col style={{margin: '10px auto'}}>
                        <DatePickerInput label="Payment Date" isSetTodayVisible/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

Basic.story = {
    parameters: {
        backgrounds: [
            {name: 'light', value: '#f0f0f0', default: true},
        ],
    },
};
