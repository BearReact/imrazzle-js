import React from 'react';
import styled from 'styled-components';
import {Container, Row, Col} from 'styled-bootstrap-grid/dist/index';

import BlockTitle from '@components/atoms/BlockTitle';
import renderPropsTable from '@test/storybook/addonConfig/renderPropsTable';
import readeMe from './Tooltips.stories.md';
import Tooltips from '../Tooltips';

export default {
    title: 'Atoms|Tooltips',
    parameters: {
        notes: readeMe + renderPropsTable(Tooltips),
    },
};

class StateComponent extends React.Component {
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

export const TooltipsStory = () => (
    <Container>
        <CustomBlockTitle>Basic Tooltips Style</CustomBlockTitle>

        <Row style={{flexWrap: 'noWrap'}}>
            <Col>
                <TooltipsContainer>
                    <Tooltips
                        position="topLeft"
                    >
                        Tooltips Test Style
                    </Tooltips>
                </TooltipsContainer>
            </Col>
        </Row>

        <hr style={{marginTop: 50, marginBottom: 50}}/>

        <Row style={{flexWrap: 'noWrap'}}>
            <Col>
                <TooltipsContainer>
                    <Tooltips
                        position="topLeft"
                    >
                        Tooltips Test Style
                    </Tooltips>
                </TooltipsContainer>
            </Col>
            <Col>
                <TooltipsContainer>
                    <Tooltips
                        position="topCenter"
                    >
                        Tooltips Test Style
                    </Tooltips>
                </TooltipsContainer>
            </Col>
            <Col>
                <TooltipsContainer>
                    <Tooltips
                        position="topRight"
                    >
                        Tooltips Test Style
                    </Tooltips>
                </TooltipsContainer>
            </Col>
        </Row>

        <hr style={{marginTop: 50, marginBottom: 50}}/>

        <Row style={{flexWrap: 'noWrap'}}>
            <Col>
                <TooltipsContainer>
                    <Tooltips
                        position="bottomLeft"
                    >
                        Tooltips Test Style
                    </Tooltips>
                </TooltipsContainer>
            </Col>
            <Col>
                <TooltipsContainer>
                    <Tooltips
                        position="bottomCenter"
                    >
                        Tooltips Test Style
                    </Tooltips>
                </TooltipsContainer>
            </Col>
            <Col>
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

TooltipsStory.story = {
    name: 'Basic',
};

export const TooltipsAnimateStory = () => (
    <Container>
        <CustomBlockTitle>Animate Tooltips Style</CustomBlockTitle>

        <Row style={{flexWrap: 'noWrap'}}>
            <Col>
                <StateComponent
                    position='topLeft'
                    isTopAnimate
                />
            </Col>

            <Col>
                <StateComponent
                    position='topCenter'
                    isTopAnimate
                />
            </Col>

            <Col>
                <StateComponent
                    position='topRight'
                    isTopAnimate
                />
            </Col>
        </Row>

        <hr style={{marginTop: 50, marginBottom: 50}}/>

        <Row style={{flexWrap: 'noWrap'}}>
            <Col>
                <StateComponent position='bottomLeft'/>
            </Col>

            <Col>
                <StateComponent position='bottomCenter'/>
            </Col>

            <Col>
                <StateComponent position='bottomRight'/>
            </Col>
        </Row>
    </Container>
);

TooltipsAnimateStory.story = {
    name: 'Use Animate',
};

const CustomBlockTitle = styled(BlockTitle)`
    border: none;
    border-bottom: solid 1px cornflowerblue;
    font-size: 24px;
    color: cornflowerblue;
    padding-top: 50px;
    margin-bottom: 100px;
`;

// for your page divName
const TooltipsContainer = styled.div`
    width: 100%;
    height: 50px;
    background-color: cornflowerblue;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 900;
    border: solid 2px blue;
`;
