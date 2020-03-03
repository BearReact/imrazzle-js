// @flow

import React from 'react';
import styled from 'styled-components';
import {media, Col, Container, Row} from 'styled-bootstrap-grid';
import dayjs from 'dayjs';
import get from 'lodash/get';
import LoaderContainer from '@components/organisms/LoaderContainer';

const Profile = (props: Props) => {
    const {
        intl: {formatMessage: i18n}, fetchCurrent, currentData, isFetching, payload,
    } = props;

    React.useEffect(() => {
        fetchCurrent();
    }, []);

    const columnLust = currentData ? [
        {key: 'email', column: i18n({id: 'page.profile.label.email'}), value: currentData.email},
        {key: 'name', column: i18n({id: 'page.profile.label.name'}), value: currentData.name},
        {key: 'country', column: i18n({id: 'page.profile.label.country'}), value: currentData.country},
        {key: 'signUpDate', column: i18n({id: 'page.profile.label.signUpDate'}), value: dayjs(payload.signUpDate).format('YYYY-MM-DD')},
        {key: 'expiredTime', column: i18n({id: 'page.profile.label.expiredTime'}), value: dayjs(payload.exp).format('YYYY-MM-DD')},
    ] : [];

    return (
        <LoaderContainer isLoading={isFetching}>
            <Container>

                <Row alignItems="center">
                    <Col lg>
                        <div className="text-center">
                            <PageSubTitle>{i18n({id: 'page.profile.subTitle'}, {email: get(payload, 'email', '')})}</PageSubTitle>
                            <PageTitle dangerouslySetInnerHTML={{__html: i18n({id: 'page.profile.title'})}}/>
                        </div>
                    </Col>
                </Row>

                {
                    columnLust.map(row => (
                        <Row key={row.key} justifyContent="center">
                            <Col col={6}>
                                <div>{row.column}</div>
                            </Col>
                            <Col col={6}>
                                <div>{row.value}</div>
                            </Col>
                        </Row>
                    ))
                }

            </Container>
        </LoaderContainer>
    );
};

type Props = {
    onSignIn: Function,
    onSignOut: Function,
    isSubmitting?: boolean,
    token?: string,
    isAuth?: boolean,
};

Profile.defaultProps = {
    isSubmitting: false,
    token: null,
    isAuth: false,
};

export default Profile;

const PageSubTitle = styled.h6`
    font-size: 18px;
    font-weight: 400;
    color: #f14836;
    text-transform: uppercase;
`;
const PageTitle = styled.h4`
    font-size: 32px;
    
    span{
        font-weight: 400;
        display: contents;  
    }
`;
