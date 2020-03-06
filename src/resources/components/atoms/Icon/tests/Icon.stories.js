import React from 'react';
import styled from 'styled-components';
import {Col, Container, Row} from 'styled-bootstrap-grid';
import get from 'lodash/get';

import IconList from '@static/common/plugins/iconfont/iconfont.json';
import renderPropsTable from '@test/storybook/addonConfig/renderPropsTable';
import Icon from '../Icon';
import readeMe from './Icon.stories.md';

export default {
    title: 'Atoms|Icon',
    parameters: {
        notes: readeMe + renderPropsTable(Icon),
    },
};

const DefaultStory = () => (
    <>
        <Container>
            <H2>Basic (Font Class)</H2>
            <Row>
                {IconList.glyphs.map(code => {
                    let minCode = get(code, 'font_class', '');
                    return (
                        <Col col={8} md={6} xl={3} key={minCode}>
                            <Icon code={minCode} size={40} color="#9ea2b0"/>
                            <Text>{minCode}</Text>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    </>
);

DefaultStory.story = {
    name: 'FontClass',
};

const SVGStory = () => (
    <>
        <Container>
            <H2>SVG (Symbol)</H2>
            <Row>
                {IconList.glyphs.map(code => {
                    let minCode = get(code, 'font_class', '');
                    return (
                        <Col col={8} md={6} xl={3} key={minCode}>
                            <Icon code={minCode} type="svg" size={40} color="#9ea2b0"/>
                            <Text>{minCode}</Text>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    </>
);

SVGStory.story = {
    name: 'Svg',
};

export {DefaultStory, SVGStory};

const H2 = styled.h2`
    color: #fff;
    padding-top: 20px;
`;

const Text = styled.div`
    font-size: 12px;
    color: #fff;
    text-align: center;
    margin-bottom: 15px;
`;
