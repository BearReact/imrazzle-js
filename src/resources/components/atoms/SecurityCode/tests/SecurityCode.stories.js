import React, {useState} from 'react';
import styled from 'styled-components';
import {Col, Container, Row} from '@styled-bs-grid';
import {useForm} from 'react-hook-form';
import {isEmpty} from '@utils/equal';

import readeMe from './SecurityCode.stories.md';
import SecurityCode from '../SecurityCode';

export default {
    title: 'Atoms|SecurityCode',
    parameters: {
        notes: readeMe,
    },
};

export const Basic = () => {
    const [count, setCount] = useState('');

    return (
        <Container className="pt-3">
            <h2 className="story-title">Basic SecurityCode</h2>

            <Row>
                <Col col className="py-3">
                    <SecurityCode
                        onChange={setCount}
                    />
                    <Content className="pt-3">Preview Code: {count}</Content>
                </Col>
            </Row>
        </Container>
    );
};

export const UseHookForm = () => {
    const {register, handleSubmit, errors} = useForm({
        mode: 'onChange',
    });

    const onSubmit = formData => {
        // 此處回傳的為4個input各自的值
        // eslint-disable-next-line no-console
        console.log('onSubmit', formData.securityCode);
    };

    // 此處為監控錯誤訊息
    if(!isEmpty(errors)){
        // eslint-disable-next-line no-console
        console.log('errors', errors);
    }

    const codeLength = 4;

    return (
        <Container className="pt-3">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="story-title">Use Hook-Form</h2>
                <Row>
                    <Col className="py-3">
                        <SecurityCode
                            forwardRef={register({
                                required: 'required error',
                                minLength : {
                                    value: 4,
                                    message: 'length is not 4',
                                },
                                maxLength : {
                                    value: 4,
                                    message: 'length is not 4',
                                },
                                pattern: {
                                    value: /[A-Za-z0-9]/,
                                    message: 'pattern error',
                                },
                            })}
                            name="securityCode"
                            length={codeLength}
                        />
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

const Content = styled.div`
    color: #fff;
`;
