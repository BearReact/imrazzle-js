import React from 'react';
import styled from 'styled-components';
import { Container, Col, Row } from '@styled-bs-grid';
import dayjs from 'dayjs';
import get from 'lodash/get';
const Profile = (props) => {
    const { intl: { formatMessage: i18n }, fetchCurrent, currentData, isFetching, payload, } = props;
    React.useEffect(() => {
        fetchCurrent();
    }, []);
    const columnLust = currentData ? [
        { key: 'email', column: i18n({ id: 'page.profile.label.email' }), value: currentData.email },
        { key: 'name', column: i18n({ id: 'page.profile.label.name' }), value: currentData.name },
        { key: 'country', column: i18n({ id: 'page.profile.label.country' }), value: currentData.country },
        { key: 'signUpDate', column: i18n({ id: 'page.profile.label.signUpDate' }), value: dayjs(payload.signUpDate).format('YYYY-MM-DD') },
        { key: 'expiredTime', column: i18n({ id: 'page.profile.label.expiredTime' }), value: dayjs(payload.exp).format('YYYY-MM-DD') },
    ] : [];
    return (React.createElement(Container, null,
        React.createElement(Row, { className: "align-items-center" },
            React.createElement(Col, { lg: true },
                React.createElement("div", { className: "text-center" },
                    React.createElement(PageSubTitle, null, i18n({ id: 'page.profile.subTitle' }, { email: get(payload, 'email', '') })),
                    React.createElement(PageTitle, { dangerouslySetInnerHTML: { __html: i18n({ id: 'page.profile.title' }) } })))),
        columnLust.map(row => (React.createElement(Row, { key: row.key, className: "justify-content-center" },
            React.createElement(Col, { col: 6 },
                React.createElement("div", null, row.column)),
            React.createElement(Col, { col: 6 },
                React.createElement("div", null, row.value)))))));
};
Profile.defaultProps = {
    isFetching: false,
    payload: {},
    currentData: {},
    fetchCurrent: () => { },
};
export default Profile;
const PageSubTitle = styled.h6 `
    font-size: 18px;
    font-weight: 400;
    color: #f14836;
    text-transform: uppercase;
`;
const PageTitle = styled.h4 `
    font-size: 32px;
    
    span{
        font-weight: 400;
        display: contents;  
    }
`;
//# sourceMappingURL=Profile.js.map