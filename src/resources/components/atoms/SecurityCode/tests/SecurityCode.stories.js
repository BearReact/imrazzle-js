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
        <>
            <SecurityCode
                length={4}
                onChange={val => setCount(val)}
            />
            <Content className="pt-3">Preview Code: {count}</Content>
        </>
    );
};

BasicStory.story = {
    name: 'basic',
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container fluid>
                <Row>
                    <Col className="py-3">
                        <SecurityCode
                            ref={register({
                                minLength: {value: 4, message: 'The value maxLength 4'},
                                maxLength: {value: 4, message: 'The value maxLength 4'},
                            })}
                            name="securityCode"
                            length={4}
                            // onChange={val => setCount(val)}
                        />
                        {get(errors, 'test1.message')}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <button type="submit">Submit</button>
                    </Col>
                </Row>
            </Container>
        </form>
    );
};

UseHookForm.story = {
    name: 'use Hook-Form',
};

const Content = styled.div`
    color: #fff;
`;
