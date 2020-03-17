import React, {useState} from 'react';
import {Col, Container, Row} from '@styled-bs-grid';
import {useForm} from 'react-hook-form';
import readeMe from './TimePicker.stories.md';
import TimePicker from '../TimePicker';

export default {
    title: 'Atoms|TimePicker',
    parameters: {
        notes: readeMe,
    },
};

export const Basic = () => {
    const [selectedTime, setSelectedTime] = useState(null);

    const handleChange = (value: any) => {
        setSelectedTime(value);
    };

    return (
        <Container>
            <h2 className="story-title">Time Picker</h2>

            <Row>
                <Col col={24} className="d-flex justify-content-center" style={{color: '#bdbdbd'}}>
                    selected time is: {selectedTime}
                </Col>
                <Col col={24} className="pb-3 pt-3">
                    <TimePicker onChange={handleChange}/>
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

export const UseHookForm = () => {
    const [selectedTime, setSelectedTime] = useState(null);

    const {register, handleSubmit} = useForm({
        mode: 'onChange',
    });

    const onSubmit = (formData: any) => {
        // 將取回的值寫入state
        setSelectedTime(formData.timePicker);
    };

    return (
        <Container>
            <h2 className="story-title">Time Picker</h2>

            <Row>
                <Col col={24} className="d-flex justify-content-center" style={{color: '#bdbdbd'}}>
                    selected time is: {selectedTime}
                </Col>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Col col={24} className="pb-3 pt-3">
                        <TimePicker
                            forwardRef={register}
                            name="timePicker"
                        />
                    </Col>
                </form>
            </Row>
        </Container>
    );
};

UseHookForm.story = {
    parameters: {
        backgrounds: [
            {name: 'light', value: '#f0f0f0', default: true},
        ],
    },
};
