
import * as React from 'react';
import styled from 'styled-components';
import A from '@components/atoms/A';
import {isEmpty} from '@utils/equal';
import {
    media, Col, Container, GridThemeProvider, Row,
} from '@styled-bs-grid';

type Props = {
    intl: any;
    isFetching?: boolean;
    fetchPaginate: Function;
    paginateData?: Array<{
        id: number;
        title: string;
        author: string;
        thumb: string;
        avatar: string;
    }>;
};

const List = (props: Props) => {

    const {
        intl: {formatMessage: i18n}, isFetching, paginateData, fetchPaginate,
    }: any = props;

    React.useEffect(() => {
        fetchPaginate();
    }, []);

    return (
        <Container>

            <Row className="align-items-center">
                <Col lg>
                    <div className="text-center">
                        <PageSubTitle>{i18n({id: 'page.news.subTitle'})}</PageSubTitle>
                        <PageTitle dangerouslySetInnerHTML={{__html: i18n({id: 'page.news.title'})}}/>
                    </div>
                </Col>
            </Row>

            <Row className="align-items-center">
                {paginateData && paginateData.map((row: any) => (
                    <Col
                        lg={8}
                        md={12}
                        sm={16}
                        key={row.id}
                    >
                        <A href={`/news/${row.id}`}>
                            <Thumb src={row.thumb} alt="news" className="mb-4"/>
                        </A>
                        <div>
                            <Title className="mb-3">
                                <A href={`/news/${row.id}`}>
                                    {row.title}
                                </A>
                            </Title>
                            <div className="blog-author d-flex align-items-center">
                                <div className="pr-4">
                                    <Avatar src={row.avatar} alt="author"/>
                                </div>
                                <div>
                                    <AuthorPosted>{i18n({id: 'page.news.postedBy'})}</AuthorPosted>
                                    <AuthorText>{row.author}</AuthorText>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

        </Container>
    );
};

List.defaultProps = {
    isFetching: false,
    paginateData: [],
};

export default List;

const Thumb = styled.img`
    width: 95%;
`;

const Avatar = styled.img`
    width: 65px;
    border-radius: 50%;
`;

const Title = styled.h4`
    font-size: 20px;
    font-weight: 600;
    color: #222;
    
    ${media.lg`
        font-size: 24px;
    `}
`;

const AuthorPosted = styled.div`
    font-size: 14px;
    color: #f14836;
    font-weight: 400;
    
`;

const AuthorText = styled.div`
    font-size: 16px;
    font-weight: 600;
    margin-top: 5px;
    color: #798795;
`;

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
