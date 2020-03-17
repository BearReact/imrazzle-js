import React from 'react';
import styled from 'styled-components';
import {Container, Row, Col} from '@styled-bs-grid';

import Icon from '@components/atoms/Icon';
import Button from '../Button';
import PlayButton from '../PlayButton';
import HeartButton from '../HeartButton';
import readeMe from './Button.stories.md';

export default {
    title: 'Atoms|Button',
    parameters: {
        notes: readeMe,
    },
};

export const Basic = () => (
    <Container className="pt-3">
        <h2 className="story-title">Button</h2>

        <Row>
            <Col col={24} lg={6} className="mb-4">
                <Button theme="hoverBorder" size="default" shape="raised" style={{minHeight: '44px'}}>
                    iOS Guide / hoverBorder
                </Button>
            </Col>

            <Col col={24} lg={6} className="mb-4">
                <Button theme="hoverBgColor" size="default" shape="default" style={{minHeight: '44px'}}>
                    HOT GAMES / hoverBgColor
                </Button>
            </Col>

            <Col col={24} lg={6} className="mb-4">
                <Button theme="white" size="default" shape="raised" style={{minHeight: '44px'}}>
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
                <Button theme="pureBorder" size="default" shape="raised" style={{minHeight: '44px'}}>
                    iOS Guide / pureBorder
                </Button>
            </Col>

            <Col col={24} lg={6} className="mb-4">
                <Button theme="primaryBorder" size="default" shape="raised" style={{minHeight: '44px'}}>
                    primaryBorder / primaryBorder
                </Button>
            </Col>

            <Col col={24} lg={6} className="mb-4">
                <Button disabled theme="pureBorder" size="default" shape="raised" style={{minHeight: '44px'}}>
                    Disabled / disabled
                </Button>
            </Col>

            <Col col={24} lg={6} className="mb-4">
                <Button theme="danger" size="default" shape="raised" style={{minHeight: '44px'}}>
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
);

export const Play = () => (
    <>
        <Container className="pt-3">
            <h2 className="story-title">Play Button</h2>

            <Row>

                <Col col={24} lg={6} className="mb-4">
                    <PlayButton theme="default"/>
                </Col>

                <Col col={24} lg={6} className="mb-4">
                    <PlayButton theme="default" style={{width: '100px', height: '100px'}}/>
                </Col>

                <Col col={24} lg={6} className="mb-4">
                    <PlayButton theme="square">
                        PLAY
                    </PlayButton>
                </Col>

                <Col col={24} lg={6} className="mb-4">
                    <PlayButton theme="square" style={{width: '260px', height: '40px'}}>
                        PLAY
                    </PlayButton>
                </Col>

            </Row>
        </Container>
    </>
);

export const Heart = () => (
    <>
        <Container className="pt-3">
            <h2 className="story-title">Heart Button</h2>

            <Row>
                <Col col={24} lg={6} className="mb-4">
                    <HeartButton size={100}/>
                </Col>
            </Row>
        </Container>
    </>
);

const CustomIcon = styled(Icon)`
    padding: 0 10px;
`;
