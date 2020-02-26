import React from 'react';
import styled from 'styled-components';
import {Col, Container, Row} from "styled-bootstrap-grid";
import get from 'lodash/get';

import Icon from '../Icon';
import IconList from '@static/common/plugins/iconfont/iconfont.json';

export default {
    title: 'Atoms|Icon',
    parameters: {
        notes: `
# IconFont+ 阿里巴巴矢量图标库
- [圖標文件](http://localhost:6006/static/common/plugins/iconfont/demo_index.html)
- [項目位址](https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=1629149)

> 一般情況請使用 default 即可, 若是需要多色的特殊圖標再使用 svg

            `
    }
};

const DefaultStory = () => (
    <>
        <Container>
            <H2>Default (Font Class)</H2>
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
    name: 'default',
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
    name: 'svg',
};


export {DefaultStory, SVGStory}

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
