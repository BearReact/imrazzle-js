// @flow
import React, {useState} from 'react';
import styled from 'styled-components';
import {Col, Container, Row} from 'styled-bootstrap-grid';
import {useForm} from 'react-hook-form';
import get from 'lodash/get';
import renderPropsTable from '@test/storybook/addonConfig/renderPropsTable';

import readeMe from './SecurityCode.stories.md';
import SecurityCode from '../SecurityCode';

export default {
    title: 'Atoms|SecurityCode',
    parameters: {
        notes: readeMe + renderPropsTable(SecurityCode),
    },
};

export const BasicStory = () => {
    const [count, setCount] = useState('');

    // const tet = extractProps(SecurityCode);

    return (
        <Container className="pt-3">
            <h2 className="story-title">Basic SecurityCode</h2>

            <Row>
                <Col col className="py-3">
                    <SecurityCode
                        length={4}
                        onChange={val => setCount(val)}
                    />
                    <Content className="pt-3">Preview Code: {count}</Content>
                </Col>
            </Row>
        </Container>
    );
};

BasicStory.story = {
    name: 'Basic',
};

export const UseHookForm = () => {
    const {register, handleSubmit, errors} = useForm({
        mode: 'onChange',
    });

    const onSubmit = formData => {
        // eslint-disable-next-line no-console
        console.log('onSubmit', formData);
    };

    return (
        <Container className="pt-3">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="story-title">Use Hook-Form</h2>
                <Row>
                    <Col className="py-3">
                        <SecurityCode
                            ref={register({
                                minLength: {value: 4, message: 'The value maxLength 4'},
                                maxLength: {value: 4, message: 'The value maxLength 4'},
                            })}
                            name="securityCode"
                            length={4}
                        />
                        {get(errors, 'test1.message')}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <button type="submit">Submit</button>
                    </Col>
                </Row>
            </form>
        </Container>
    );
};

UseHookForm.story = {
    name: 'Use Hook-Form',
};

const Content = styled.div`
    color: #fff;
`;
