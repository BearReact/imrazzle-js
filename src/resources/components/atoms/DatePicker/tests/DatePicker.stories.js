import React, {useState} from 'react';
import {Container, Row, Col} from '@library/styled-bs-grid';
import {useForm} from 'react-hook-form';
import renderPropsTable from '@test/storybook/addonConfig/renderPropsTable';
import DatePicker from '../DatePicker';
import readeMe from './DatePicker.stories.md';

export default {
    title: 'Atoms|DatePicker',
    parameters: {
        notes: readeMe + renderPropsTable(DatePicker),
    },
};

export const Basic = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleChange = value => {
        setSelectedDate(value);
    };

    return (
        <Container>
            <h2 className="story-title">Date Picker</h2>

            <Row>
                <Col col={24} className="d-flex justify-content-center" style={{color: '#bdbdbd'}}>
                    selected date is: {selectedDate}
                </Col>
                <Col col={24} className="pb-3 pt-3">
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

    const onSubmit = formData => {
        // eslint-disable-next-line no-console
        console.log('onSubmit', formData);
    };

    const handleChange = value => {
        setSelectedDate(value);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <h2 className="story-title">Use Hook-From</h2>

                <Row>
                    <Col col={24} className="d-flex justify-content-center" style={{color: '#bdbdbd'}}>
                            selected date is: {selectedDate}
                    </Col>
                    <Col col={24} className="pb-3 pt-3">
                        <DatePicker
                            forwardRef={register}
                            name="datePicker"
                            value={selectedDate}
                            onChange={handleChange}
                            isSetTodayVisible
                        />
                    </Col>
                    <Col col={24} className="d-flex justify-content-center" style={{color: '#bdbdbd'}}>
                        <button type="submit">Click Submit Form</button>
                    </Col>
                </Row>
            </Container>
        </form>
    );
};
