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
        <Container className="pt-3">
            <h2 className="story-title">Time Picker</h2>

            <Row>
                <Col col={24} style={{color: '#bdbdbd'}}>
                    selected date is: {selectedTime}
                </Col>
                <Col col={24} className="pb-3 pt-3">
                    <TimePicker onChange={handleChange}/>
                </Col>
            </Row>

        </Container>
    );
};

export const UseHookForm = () => {
    const [selectedTime, setSelectedTime] = useState(null);

    const {register, handleSubmit} = useForm({
        mode: 'onChange',
    });

    const onSubmit = (formData: any) => {
        // 將取回的值寫入state
        // eslint-disable-next-line no-console
        console.log('onSubmit', formData.createTime);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container className="pt-3">
                <h2 className="story-title">Use Hook-From</h2>

                <Row>
                    <Col col={24} style={{color: '#bdbdbd'}}>
                        selected date is: {selectedTime}
                    </Col>

                    <Col col={24} className="pb-3 pt-3">
                        <TimePicker
                            forwardRef={register}
                            name="createTime"
                            onClickOk={setSelectedTime}
                        />
                    </Col>

                    <Col col="auto" className="d-flex justify-content-center" style={{color: '#bdbdbd'}}>
                        <button type="submit">Click Submit Form</button>
                    </Col>
                </Row>

            </Container>
        </form>

    );
};

