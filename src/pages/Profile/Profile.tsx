import React from 'react';
import styled from 'styled-components';
import {Container, Col, Row} from '@styled-bs-grid';
import dayjs from 'dayjs';
import get from 'lodash/get';
import type {payloadType} from '@store/Auth/type';
import type {currentDataType, isFetchingType} from './store/type';

type Props = {
    intl: any,
    fetchCurrent?: Function,
    currentData?: currentDataType,
    isFetching?: isFetchingType,
    payload?: payloadType,
};

const Profile = (props: Props) => {
    const {
        intl: {formatMessage: i18n}, fetchCurrent, currentData, isFetching, payload,
    }: any = props;

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
            <Container>

                <Row className="align-items-center">
                    <Col lg>
                        <div className="text-center">
                            <PageSubTitle>{i18n({id: 'page.profile.subTitle'}, {email: get(payload, 'email', '')})}</PageSubTitle>
                            <PageTitle dangerouslySetInnerHTML={{__html: i18n({id: 'page.profile.title'})}}/>
                        </div>
                    </Col>
                </Row>

                {
                    columnLust.map(row => (
                        <Row key={row.key} className="justify-content-center">
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
    );
};

Profile.defaultProps = {
    isFetching: false,
    payload: {},
    currentData: {},
    fetchCurrent: () => {},
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
