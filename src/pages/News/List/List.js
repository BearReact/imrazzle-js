import * as React from 'react';
import styled from 'styled-components';
import A from '@components/atoms/A';
import { media, Col, Container, Row } from '@styled-bs-grid';
const List = (props) => {
    const { intl: { formatMessage: i18n }, isFetching, paginateData, fetchPaginate, } = props;
    React.useEffect(() => {
        fetchPaginate();
    }, []);
    return (React.createElement(Container, null,
        React.createElement(Row, { className: "align-items-center" },
            React.createElement(Col, { lg: true },
                React.createElement("div", { className: "text-center" },
                    React.createElement(PageSubTitle, null, i18n({ id: 'page.news.subTitle' })),
                    React.createElement(PageTitle, { dangerouslySetInnerHTML: { __html: i18n({ id: 'page.news.title' }) } })))),
        React.createElement(Row, { className: "align-items-center" }, paginateData && paginateData.map((row) => (React.createElement(Col, { lg: 8, md: 12, sm: 16, key: row.id },
            React.createElement(A, { href: `/news/${row.id}` },
                React.createElement(Thumb, { src: row.thumb, alt: "news", className: "mb-4" })),
            React.createElement("div", null,
                React.createElement(Title, { className: "mb-3" },
                    React.createElement(A, { href: `/news/${row.id}` }, row.title)),
                React.createElement("div", { className: "blog-author d-flex align-items-center" },
                    React.createElement("div", { className: "pr-4" },
                        React.createElement(Avatar, { src: row.avatar, alt: "author" })),
                    React.createElement("div", null,
                        React.createElement(AuthorPosted, null, i18n({ id: 'page.news.postedBy' })),
                        React.createElement(AuthorText, null, row.author))))))))));
};
List.defaultProps = {
    isFetching: false,
    paginateData: [],
};
export default List;
const Thumb = styled.img `
    width: 95%;
`;
const Avatar = styled.img `
    width: 65px;
    border-radius: 50%;
`;
const Title = styled.h4 `
    font-size: 20px;
    font-weight: 600;
    color: #222;
    
    ${media.lg `
        font-size: 24px;
    `}
`;
const AuthorPosted = styled.div `
    font-size: 14px;
    color: #f14836;
    font-weight: 400;
    
`;
const AuthorText = styled.div `
    font-size: 16px;
    font-weight: 600;
    margin-top: 5px;
    color: #798795;
`;
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
//# sourceMappingURL=List.js.map