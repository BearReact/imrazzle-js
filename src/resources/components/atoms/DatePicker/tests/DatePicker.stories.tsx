import React, {useState} from 'react';
import {Container, Row, Col} from '@styled-bs-grid';
import {useForm} from 'react-hook-form';
import DatePicker from '../DatePicker';
import readeMe from './DatePicker.stories.md';

export default {
    title: 'Atoms|DatePicker',
    parameters: {
        notes: readeMe,
    },
};

export const Basic = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleChange = (value: any) => {
        setSelectedDate(value);
    };

    return (
        <Container className="pt-3">
            <h2 className="story-title">Date Picker</h2>

            <Row>
                <Col col={24} style={{color: '#bdbdbd'}}>
                    selected date is: {selectedDate}
                </Col>
                <Col col="auto" className="pb-3 pt-3">
                    <DatePicker
                        value={selectedDate}
                        onChange={handleChange}
                        isSetTodayVisible
                    />
                </Col>
            </Row>
        </Container>
    );
};

export const UseHookForm = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const {register, handleSubmit} = useForm({
        mode: 'onChange',
    });

    const onSubmit = (formData: any) => {
        // eslint-disable-next-line no-console
        console.log('onSubmit', formData);
    };

    const handleChange = (value: any) => {
        setSelectedDate(value);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container className="pt-3">
                <h2 className="story-title">Use Hook-From</h2>

                <Row>
                    <Col col={24} className="d-flex" style={{color: '#bdbdbd'}}>
                        selected date is: {selectedDate}
                    </Col>
                    <Col col="auto" className="pb-3 pt-3">
                        <DatePicker
                            forwardRef={register}
                            name="datePicker"
                            value={selectedDate}
                            onChange={handleChange}
                            isSetTodayVisible
                        />
                    </Col>
                </Row>
                <Row>
                    <Col col="auto" className="d-flex justify-content-center" style={{color: '#bdbdbd'}}>
                        <button type="submit">Click Submit Form</button>
                    </Col>
                </Row>
            </Container>
        </form>
    );
};
