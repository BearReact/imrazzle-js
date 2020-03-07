import React from 'react';
import styled from 'styled-components';
import {Col, Container, Row} from 'styled-bootstrap-grid';

import BlockTitle from '@components/atoms/BlockTitle';
import Icon from '@components/atoms/Icon';
import PlayButton from '@components/atoms/Button/PlayButton';
import Button from '../Button';

export default {
    title: 'Atoms|Button',
    parameters: {
    },
};

const DefaultStory = () => {
    return (
        <>
            <Container fluid className="p-5" style={{backgroundColor: 'lightgreen'}}>
                <Row className="row">

                    <Col col={24} className="p-0">
                        <CustomBlockTitle>Default Button style</CustomBlockTitle>
                    </Col>

                    <Col col={24} lg={6} className="mb-4">
                        <Button theme="hoverBorder" size="default" shape="raised" style={{minHeight: 44}}>
                            iOS Guide / hoverBorder
                        </Button>
                    </Col>

                    <Col col={24} lg={6} className="mb-4">
                        <Button theme="hoverBgColor" size="default" shape="default" style={{minHeight: 44}}>
                            HOT GAMES / hoverBgColor
                        </Button>
                    </Col>

                    <Col col={24} lg={6} className="mb-4">
                        <Button theme="white" size="default" shape="raised" style={{minHeight: 44}}>
                            简体中文 / white
                        </Button>
                    </Col>

                    <Col col={24} lg={6} className="mb-4">
                        <Button theme="darkBlue" size="large" shape="default">
                            KBLUE7RG7U / darkBlue
                            <CustomIcon code="copy"/>
                        </Button>
                    </Col>

                    <Col col={24} lg={6} className="mb-4">
                        <Button theme="darkBlueBorder" size="small" shape="circle">
                            CONTACT US / darkBlueBorder
                        </Button>
                    </Col>

                    <Col col={24} lg={6} className="mb-4">
                        <Button theme="gray" size="normal" shape="raised">
                            Create Account / gray
                        </Button>
                    </Col>

                    <Col col={24} lg={6} className="mb-4">
                        <Button theme="primary" size="normal" shape="raised">
                            Create Account / primary
                        </Button>
                    </Col>

                    <Col col={24} lg={6} className="mb-4">
                        <Button theme="pureBorder" size="default" shape="raised" style={{minHeight: 44}}>
                            iOS Guide / pureBorder
                        </Button>
                    </Col>

                    <Col col={24} lg={6} className="mb-4">
                        <Button theme="primaryBorder" size="default" shape="raised" style={{minHeight: 44}}>
                            primaryBorder / primaryBorder
                        </Button>
                    </Col>

                    <Col col={24} lg={6} className="mb-4">
                        <Button disabled theme="pureBorder" size="default" shape="raised" style={{minHeight: 44}}>
                            Disabled / disabled
                        </Button>
                    </Col>

                    <Col col={24} lg={6} className="mb-4">
                        <Button theme="danger" size="default" shape="raised" style={{minHeight: 44}}>
                            Danger / danger
                        </Button>
                    </Col>

                    <Col col={24} lg={6} className="mb-4">
                        <Button theme="danger" size="large" shape="default">
                            Test Button Style / danger
                            <CustomIcon code="copy"/>
                        </Button>
                    </Col>

                    <Col col={24} lg={6} className="mb-4">
                        <Button block theme="danger" size="large" shape="default">
                            Test Button Style / block
                            <CustomIcon code="copy"/>
                        </Button>
                    </Col>

                </Row>
            </Container>
        </>
    );
};

DefaultStory.story = {
    name: 'default',
};

const PlayButtonStory = () => {
    return (
        <>
            <Container fluid className="p-5" style={{backgroundColor: 'white'}}>
                <Row className="row">

                    <Col col={24} className="p-0">
                        <CustomBlockTitle>Play Button style</CustomBlockTitle>
                    </Col>

                    <Col col={24} lg={6} className="mb-4">
                        <PlayButton theme="default"/>
                    </Col>

                    <Col col={24} lg={6} className="mb-4">
                        <PlayButton theme="default" style={{width: 100, height: 100}}/>
                    </Col>

                    <Col col={24} lg={6} className="mb-4">
                        <PlayButton theme="square">
                            PLAY
                        </PlayButton>
                    </Col>

                    <Col col={24} lg={6} className="mb-4">
                        <PlayButton theme="square" style={{width: 260, height: 40}}>
                            PLAY
                        </PlayButton>
                    </Col>

                </Row>
            </Container>
        </>
    );
};

PlayButtonStory.story = {
    name: 'PlayButton',
};

export {DefaultStory, PlayButtonStory};

const CustomBlockTitle = styled(BlockTitle)`
    border: none;
    border-bottom: solid 1px #8d8d8d;
    font-size: 24px;
    color: #8d8d8d;
    margin-bottom: 20px;
`;

const CustomIcon = styled(Icon)`
    padding: 0 10px;
`;
