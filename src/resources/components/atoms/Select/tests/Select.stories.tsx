import TimeInput from '@components/atoms/TimeInput';
import React from 'react';
import {Col, Container, Row} from '@styled-bs-grid';
import {useForm} from 'react-hook-form';

import readeMe from './Select.stories.md';
import Select from '../Select';

export default {
    title: 'Atoms|Select',
    parameters: {
        notes: readeMe,
    },
};

const FakeOption = [
    {value: '', text: '請選擇'},
    {value: 1, text: '台灣'},
    {value: 2, text: '中國'},
    {value: 3, text: '美國'},
];

export const Basic = () => (
    <Container className="pt-3">
        <h2 className="story-title">Select</h2>
        <Row>
            <Col>
                <Select title="Country" option={FakeOption}/>
            </Col>
        </Row>
    </Container>
);

Basic.story = {
    parameters: {
        backgrounds: [
            {name: 'light', value: '#fff', default: true},
        ],
    },
};

export const UseHookForm = () => {
    const {register, handleSubmit} = useForm();

    const onSubmit = (data: any) => {
        // eslint-disable-next-line no-console
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container className="pt-3">
                <h2 className="story-title">Use Hook Form</h2>

                <Row>
                    <Col col={24} className="pb-3">
                        <Select
                            forwardRef={register({required: true})}
                            name="select"
                            title="Country"
                            option={FakeOption}
                        />
                    </Col>
                </Row>
                <button type="submit">Click Submit Form</button>
            </Container>
        </form>
    );
};

UseHookForm.story = {
    parameters: {
        backgrounds: [
            {name: 'light', value: '#fff', default: true},
        ],
    },
};

