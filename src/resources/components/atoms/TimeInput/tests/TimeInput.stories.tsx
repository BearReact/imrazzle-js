import React from 'react';
import {Container, Row, Col} from '@styled-bs-grid';
import {useForm} from 'react-hook-form';
import readeMe from './TimeInput.stories.md';
import TimeInput from '../TimeInput';

export default {
    title: 'Atoms|TimeInput',
    parameters: {
        notes: readeMe,
    },
};

export const Basic = () => (
    <Container className="pt-3">
        <h2 className="story-title">Time Input</h2>

        <Row>
            <Col col={24} className="pb-3 pt-3">
                <TimeInput label="Payment Time"/>
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

export const UseHookForm = () => {
    const {register, handleSubmit} = useForm({
        mode: 'onChange',
    });

    const onSubmit = (formData: any) => {
        // 取回的input值
        // eslint-disable-next-line no-console
        console.log('formData.timePicker', formData.timePicker);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container className="pt-3">
                <h2 className="story-title">Use Hook Form</h2>

                <Row>
                    <Col col={24} className="pb-3 pt-3">
                        <TimeInput
                            forwardRef={register}
                            name="timePicker"
                            label="Payment Time"
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
            {name: 'light', value: '#f0f0f0', default: true},
        ],
    },
};
