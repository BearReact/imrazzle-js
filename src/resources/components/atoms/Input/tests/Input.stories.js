import React from 'react';
import styled from 'styled-components';
import {Col, Container, Row} from 'styled-bs-grid';
import {useForm} from 'react-hook-form';
import get from 'lodash/get';
import renderPropsTable from '@test/storybook/addonConfig/renderPropsTable';
import readeMe from './Input.stories.md';

import Input from '../Input';

export default {
    title: 'Atoms|Input',
    parameters: {
        notes: readeMe + renderPropsTable(Input),
    },
};

export const Basic = () => (
    <Container className="pt-3">

        <h2 className="story-title">Basic Input</h2>

        <H2>Error</H2>
        <Row>
            <Col col className="pb-3 pt-3">
                <Input
                    placeholder="Email"
                    afterIconCode="check"
                    errorMessage="The email field is blank"
                />
            </Col>
        </Row>

        <H2>Normal</H2>
        <Row>
            <Col col className="pb-3 pt-3">
                <Input
                    type="text"
                    inputType="normal"
                    placeholder="Enter the message here…"
                    beforeIconCode="camera"
                    beforeIconOnClick={() => alert('beforeIcon clicked')}
                    afterIconCode="paper-plane"
                    afterIconOnClick={() => alert('afterIcon clicked')}
                />
            </Col>
        </Row>

        <H2>Material</H2>
        <Row>
            <Col col className="pb-3 pt-3">
                <Input
                    placeholder="Real Name"
                />
            </Col>

            <Col col className="pb-3 pt-3">
                <Input
                    placeholder="Email"
                    afterIconCode="paper-plane"
                    afterIconOnClick={() => alert('afterIcon clicked')}
                />
            </Col>
        </Row>

        <H2>ReadOnly</H2>
        <Row>
            <Col col className="pb-3 pt-3">
                <Input
                    placeholder="Real Name"
                    defaultValue="YangChunMian"
                    readonly
                />
            </Col>

            <Col col className="pb-3 pt-3">
                <Input
                    placeholder="Starting time to Settlement time"
                    defaultValue="2019-10-10 21:33 ~ 2019-10-10 21:33"
                    afterIconCode="lock"
                    readonly
                    remarkMessage="Once you create your real name, all of your cash withdrawal bank names will be constrained."
                />
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
    const {register, handleSubmit, errors} = useForm({
        mode: 'onChange',
    });

    const onSubmit = formData => {
        // eslint-disable-next-line no-console
        console.log('onSubmit', formData.realName);
    };

    return (
        <Container className="pt-3">

            <h2 className="story-title">Use Hook</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <button type="submit">Submit</button>
                    </Col>
                </Row>

                <Row>
                    <Col className="pb-3 pt-3">
                        <Input
                            forwardRef={register({
                                minLength: {value: 6, message: 'The value maxLength 6'},
                                maxLength: {value: 12, message: 'The value maxLength 12'},
                            })}
                            name="realName"
                            type="text"
                            placeholder="Real Name"
                            afterIconCode="check"
                            errorMessage={get(errors, 'realName.message')}
                        />
                    </Col>
                </Row>

            </form>
        </Container>
    );
};

UseHookForm.story = {
    parameters: {
        backgrounds: [
            {name: 'light', value: '#fff', default: true},
        ],
    },
};

const H2 = styled.h2`
    color: #000;
    padding-top: 20px;
`;
