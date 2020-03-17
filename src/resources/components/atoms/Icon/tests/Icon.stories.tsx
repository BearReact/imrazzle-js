import React from 'react';
import styled from 'styled-components';
import {Col, Container, Row} from '@styled-bs-grid';
import get from 'lodash/get';

import IconList from '@static/common/plugins/iconfont/iconfont.json';
import Icon from '../Icon';
import readeMe from './Icon.stories.md';

export default {
    title: 'Atoms|Icon',
    parameters: {
        notes: readeMe,
    },
};

export const Basic = () => (
    <Container className="pt-3">
        <h2 className="story-title">Basic (Font Class)</h2>
        <Row>
            {IconList.glyphs.map(code => {
                const minCode = get(code, 'font_class', '');
                return (
                    <Col col={8} md={6} xl={3} key={minCode}>
                        <Icon code={minCode} size={40} color="#9ea2b0"/>
                        <Text>{minCode}</Text>
                    </Col>
                );
            })}
        </Row>
    </Container>
);

export const Svg = () => (
    <Container className="py-3">
        <h2 className="story-title">SVG (Symbol)</h2>
        <Row>
            {IconList.glyphs.map(code => {
                const minCode = get(code, 'font_class', '');
                return (
                    <Col col={8} md={6} xl={3} key={minCode}>
                        <Icon code={minCode} type="svg" size={40} color="#9ea2b0"/>
                        <Text>{minCode}</Text>
                    </Col>
                );
            })}
        </Row>
    </Container>
);

const Text = styled.div`
    font-size: 12px;
    color: #fff;
    text-align: center;
    margin-bottom: 15px;
`;
