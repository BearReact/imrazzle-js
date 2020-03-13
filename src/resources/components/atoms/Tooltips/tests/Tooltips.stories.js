import React from 'react';
import styled from 'styled-components';
import {Container, Row, Col} from '@library/styled-bs-grid';

import renderPropsTable from '@test/storybook/addonConfig/renderPropsTable';
import readeMe from './Tooltips.stories.md';
import Tooltips from '../Tooltips';

export default {
    title: 'Atoms|Tooltips',
    parameters: {
        notes: readeMe + renderPropsTable(Tooltips),
    },
};

class StateComponent extends React.PureComponent {
    static defaultProps = {
        position: 'topCenter',
        isTopAnimate: false,
    };

    state = {
        isVisibleTips: true,
        isAnimation: false,
    };

    render(){
        const {position, isTopAnimate} = this.props;
        const {isVisibleTips, isAnimation} = this.state;

        return (
            <TooltipsContainer
                onClick={() => this.setState({isVisibleTips: !isVisibleTips, isAnimation: true})}
            >
                <Tooltips
                    isVisibleTips={isVisibleTips}
                    isAnimation={isAnimation}
                    isTopAnimate={isTopAnimate}
                    position={position}
                >
                    Tooltips Test Style
                </Tooltips>
            </TooltipsContainer>

        );
    }
}

export const Basic = () => (
    <Container className="pt-3">
        <Title>Basic Tooltips Style</Title>

        <Row style={{marginBottom: 100}}>
            <Col col>
                <TooltipsContainer>
                    <Tooltips position="topLeft">
                        Tooltips Test Style
                    </Tooltips>
                </TooltipsContainer>
            </Col>
        </Row>

        <Row style={{marginBottom: 50}}>
            <Col col>
                <TooltipsContainer>
                    <Tooltips
                        position="topLeft"
                    >
                        Tooltips Test Style
                    </Tooltips>
                </TooltipsContainer>
            </Col>
            <Col col>
                <TooltipsContainer>
                    <Tooltips
                        position="topCenter"
                    >
                        Tooltips Test Style
                    </Tooltips>
                </TooltipsContainer>
            </Col>
            <Col col>
                <TooltipsContainer>
                    <Tooltips
                        position="topRight"
                    >
                        Tooltips Test Style
                    </Tooltips>
                </TooltipsContainer>
            </Col>
        </Row>

        <Row style={{marginBottom: 100}}>
            <Col col>
                <TooltipsContainer>
                    <Tooltips
                        position="bottomLeft"
                    >
                        Tooltips Test Style
                    </Tooltips>
                </TooltipsContainer>
            </Col>
            <Col col>
                <TooltipsContainer>
                    <Tooltips
                        position="bottomCenter"
                    >
                        Tooltips Test Style
                    </Tooltips>
                </TooltipsContainer>
            </Col>
            <Col col>
                <TooltipsContainer>
                    <Tooltips
                        position="bottomRight"
                    >
                        Tooltips Test Style
                    </Tooltips>
                </TooltipsContainer>
            </Col>
        </Row>
    </Container>
);

export const UseAnimate = () => (
    <Container className="pt-3">
        <Title>Animate Tooltips Style</Title>

        <Row style={{marginBottom: 50}}>
            <Col col>
                <StateComponent
                    position='topLeft'
                    isTopAnimate
                />
            </Col>

            <Col col>
                <StateComponent
                    position='topCenter'
                    isTopAnimate
                />
            </Col>

            <Col col>
                <StateComponent
                    position='topRight'
                    isTopAnimate
                />
            </Col>
        </Row>

        <Row>
            <Col col>
                <StateComponent position='bottomLeft'/>
            </Col>

            <Col col>
                <StateComponent position='bottomCenter'/>
            </Col>

            <Col col>
                <StateComponent position='bottomRight'/>
            </Col>
        </Row>
    </Container>
);

const Title = styled.h2`
    color: #1EA7FD;
    border-bottom: solid 1px #1EA7FD;
    margin-bottom: 80px;
`;

// for your page divName
const TooltipsContainer = styled.div`
    width: 100%;
    height: 50px;
    background-color: #bdbdbd;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 900;
`;
