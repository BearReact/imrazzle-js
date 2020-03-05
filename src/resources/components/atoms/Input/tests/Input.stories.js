import React from 'react';
import styled from 'styled-components';
import {Col, Container, Row} from 'styled-bootstrap-grid';
import {useForm} from 'react-hook-form';
import get from 'lodash/get';
import readeMe from './Input.stories.md';

import Input from '../Input';

export default {
    title: 'Atoms|Input',
    parameters: {
        notes: readeMe,
    },
};

const DefaultStory = () => (
    <>
        <Container style={{backgroundColor: '#fff', paddingBottom: '50px'}}>
            <H2>error</H2>
            <Row>
                <Col className="pb-3 pt-3">
                    <Input
                        placeholder="Email"
                        afterIconCode="check"
                        errorMessage="The email field is blank"
                    />
                </Col>
            </Row>

            <H2>normal</H2>
            <Row>
                <Col className="pb-3 pt-3">
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

            <H2>material</H2>
            <Row>
                <Col className="pb-3 pt-3">
                    <Input
                        placeholder="Real Name"
                    />
                </Col>

                <Col className="pb-3 pt-3">
                    <Input
                        placeholder="Email"
                        afterIconCode="paper-plane"
                        afterIconOnClick={() => alert('afterIcon clicked')}
                    />
                </Col>
            </Row>

            <H2>readOnly</H2>
            <Row>
                <Col className="pb-3 pt-3">
                    <Input
                        placeholder="Real Name"
                        defaultValue="YangChunMian"
                        readonly
                    />
                </Col>

                <Col className="pb-3 pt-3">
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
    </>
);

DefaultStory.story = {
    name: 'default',
};

const HookFormStory = () => {
    const {register, handleSubmit, errors} = useForm({
        mode: 'onChange',
    });

    const onSubmit = data => {
        // eslint-disable-next-line no-console
        console.log('data', data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container style={{backgroundColor: '#fff', paddingBottom: '50px'}}>
                    <Row>
                        <Col>
                            <input type="submit"/>
                        </Col>
                    </Row>

                    <H2>error (模擬需6-12個字元)</H2>
                    <Row>
                        <Col className="pb-3 pt-3">
                            <Input
                                ref={register({
                                    minLength: {value: 6, message: 'The value maxLength 6'},
                                    maxLength: {value: 12, message: 'The value maxLength 12'},
                                })}
                                name="test1"
                                type="text"
                                placeholder="name"
                                afterIconCode="check"
                                errorMessage={get(errors, 'test1.message')}
                            />
                        </Col>
                    </Row>

                    <H2>normal</H2>
                    <Row>
                        <Col className="pb-3 pt-3">
                            <Input
                                ref={register}
                                name="testName1"
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

                    <H2>material</H2>
                    <Row>
                        <Col className="pb-3 pt-3">
                            <Input
                                // ref={register}
                                name="testName2"
                                placeholder="Real Name"
                            />
                        </Col>

                        <Col className="pb-3 pt-3">
                            <Input
                                ref={register}
                                name="testName3"
                                placeholder="Email"
                                afterIconCode="paper-plane"
                                afterIconOnClick={() => alert('afterIcon clicked')}
                            />
                        </Col>
                    </Row>

                    <H2>readOnly</H2>
                    <Row>
                        <Col className="pb-3 pt-3">
                            <Input
                                ref={register}
                                name="testName4"
                                placeholder="Real Name"
                                defaultValue="YangChunMian"
                                readonly
                            />
                        </Col>

                        <Col className="pb-3 pt-3">
                            <Input
                                ref={register}
                                name="testName5"
                                placeholder="Starting time to Settlement time"
                                defaultValue="2019-10-10 21:33 ~ 2019-10-10 21:33"
                                afterIconCode="lock"
                                readonly
                                remarkMessage="Once you create your real name, all of your cash withdrawal bank names will be constrained."
                            />
                        </Col>
                    </Row>
                </Container>
            </form>
        </>
    );
};

HookFormStory.story = {
    name: 'use Hook-Form',
};

export {DefaultStory, HookFormStory};

const H2 = styled.h2`
    color: #000;
    padding-top: 20px;
`;
