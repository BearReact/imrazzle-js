import React from 'react';
import {Container, Row, Col} from 'styled-bs-grid';
import BlockTitle from '../BlockTitle';

export default {
    title: 'Atoms|BlockTitle',
};

export const Basic = () => (
    <Container className="pt-3">
        <h2 className="story-title">Block Title</h2>
        <Row>
            <Col>
                <BlockTitle>Title</BlockTitle>
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

